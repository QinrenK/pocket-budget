// ============================================================================
// OCR Engine - Receipt & Handwriting Recognition
// Optimized for mobile devices and bilingual (EN/中文) text
// ============================================================================

import Tesseract, { createWorker } from 'tesseract.js';

// ============================================================================
// Types
// ============================================================================

export interface OCRResult {
  success: boolean;
  text: string;
  confidence: number;
  language: 'eng' | 'chi_sim' | 'mixed';
  processingTime: number;
  error?: string;
}

export interface ReceiptData {
  vendor?: string;
  amount?: number;
  currency?: string;
  date?: string;
  items?: string[];
  rawText: string;
  confidence: number;
}

export interface OCRProgress {
  status: 'initializing' | 'loading' | 'recognizing' | 'complete' | 'error';
  progress: number; // 0-1
  message: string;
}

// ============================================================================
// OCR Configuration
// ============================================================================

const OCR_CONFIG = {
  // Language detection order (try English first, then Chinese)
  languages: {
    primary: 'eng',
    secondary: 'chi_sim',
    combined: 'eng+chi_sim',
  },
  
  // Tesseract worker settings
  worker: {
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v4.0.2',
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
  },
  
  // Image preprocessing
  preprocessing: {
    // Auto-detect if image needs enhancement
    autoEnhance: true,
    // Minimum image width for good OCR results
    minWidth: 800,
    // Maximum file size (5MB)
    maxFileSize: 5 * 1024 * 1024,
  },
  
  // Confidence thresholds
  confidence: {
    high: 0.85,
    medium: 0.70,
    low: 0.50,
  },
};

// ============================================================================
// OCR Worker Management (Singleton Pattern)
// ============================================================================

let workerInstance: Tesseract.Worker | null = null;
let workerPromise: Promise<Tesseract.Worker> | null = null;

/**
 * Get or create Tesseract worker (reusable)
 */
async function getWorker(
  language: string = OCR_CONFIG.languages.combined,
  onProgress?: (progress: OCRProgress) => void
): Promise<Tesseract.Worker> {
  // Return existing worker if already initialized
  if (workerInstance) {
    return workerInstance;
  }
  
  // Return pending worker initialization if in progress
  if (workerPromise) {
    return workerPromise;
  }
  
  // Create new worker
  workerPromise = (async () => {
    try {
      onProgress?.({
        status: 'initializing',
        progress: 0,
        message: 'Initializing OCR engine...',
      });
      
      const worker = await createWorker(language, 1, {
        logger: (m: { status: string; progress?: number }) => {
          // Convert Tesseract logs to our progress format
          if (m.status === 'loading tesseract core') {
            onProgress?.({
              status: 'loading',
              progress: 0.2,
              message: 'Loading OCR engine...',
            });
          } else if (m.status === 'initializing tesseract') {
            onProgress?.({
              status: 'loading',
              progress: 0.4,
              message: 'Initializing...',
            });
          } else if (m.status === 'loading language traineddata') {
            onProgress?.({
              status: 'loading',
              progress: 0.6,
              message: `Loading language data (${language})...`,
            });
          } else if (m.status === 'initializing api') {
            onProgress?.({
              status: 'loading',
              progress: 0.8,
              message: 'Setting up recognition...',
            });
          } else if (m.status === 'recognizing text') {
            onProgress?.({
              status: 'recognizing',
              progress: m.progress || 0.9,
              message: 'Reading text...',
            });
          }
        },
      });
      
      
      // Configure Tesseract parameters for better receipt recognition
      await worker.setParameters({
        tessedit_pageseg_mode: Tesseract.PSM.AUTO, // Auto page segmentation
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$£€¥.,/- ', // Common receipt characters
        preserve_interword_spaces: '1',
      });
      
      workerInstance = worker;
      
      onProgress?.({
        status: 'complete',
        progress: 1,
        message: 'OCR ready!',
      });
      
      return worker;
    } catch (error) {
      workerPromise = null;
      throw error;
    }
  })();
  
  return workerPromise;
}

/**
 * Terminate worker to free memory
 */
export async function terminateWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.terminate();
    workerInstance = null;
    workerPromise = null;
  }
}

// ============================================================================
// Image Preprocessing
// ============================================================================

/**
 * Preprocess image for better OCR results
 */
async function preprocessImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Scale image if needed (larger images = better OCR)
        let width = img.width;
        let height = img.height;
        
        if (width < OCR_CONFIG.preprocessing.minWidth) {
          const scale = OCR_CONFIG.preprocessing.minWidth / width;
          width *= scale;
          height *= scale;
        }
        
        // Don't make images too large (performance)
        const maxDimension = 2400;
        if (width > maxDimension || height > maxDimension) {
          const scale = maxDimension / Math.max(width, height);
          width *= scale;
          height *= scale;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        if (OCR_CONFIG.preprocessing.autoEnhance) {
          // Enhance contrast for better OCR
          const imageData = ctx.getImageData(0, 0, width, height);
          const data = imageData.data;
          
          // Simple contrast enhancement
          const factor = 1.2;
          const intercept = 128 * (1 - factor);
          
          for (let i = 0; i < data.length; i += 4) {
            data[i] = factor * data[i] + intercept; // R
            data[i + 1] = factor * data[i + 1] + intercept; // G
            data[i + 2] = factor * data[i + 2] + intercept; // B
          }
          
          ctx.putImageData(imageData, 0, 0);
        }
        
        // Convert to data URL
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

// ============================================================================
// Language Detection
// ============================================================================

/**
 * Detect if text contains Chinese characters
 */
function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}

/**
 * Detect primary language in text
 */
function detectLanguage(text: string): 'eng' | 'chi_sim' | 'mixed' {
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = text.replace(/\s/g, '').length;
  
  if (totalChars === 0) return 'eng';
  
  const chineseRatio = chineseChars / totalChars;
  
  if (chineseRatio > 0.3) return chineseRatio > 0.7 ? 'chi_sim' : 'mixed';
  return 'eng';
}

// ============================================================================
// Core OCR Functions
// ============================================================================

/**
 * Perform OCR on image file
 */
export async function recognizeText(
  file: File,
  options: {
    language?: 'auto' | 'eng' | 'chi_sim' | 'eng+chi_sim';
    onProgress?: (progress: OCRProgress) => void;
  } = {}
): Promise<OCRResult> {
  const startTime = Date.now();
  
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    
    if (file.size > OCR_CONFIG.preprocessing.maxFileSize) {
      throw new Error('File size exceeds 5MB limit');
    }
    
    options.onProgress?.({
      status: 'loading',
      progress: 0.1,
      message: 'Preprocessing image...',
    });
    
    // Preprocess image
    const processedImage = await preprocessImage(file);
    
    // Determine language
    const language = options.language === 'auto' || !options.language
      ? OCR_CONFIG.languages.combined
      : options.language;
    
    // Get or create worker
    const worker = await getWorker(language, options.onProgress);
    
    options.onProgress?.({
      status: 'recognizing',
      progress: 0.9,
      message: 'Reading text from image...',
    });
    
    // Perform OCR
    const result = await worker.recognize(processedImage);
    
    const processingTime = Date.now() - startTime;
    const detectedLanguage = detectLanguage(result.data.text);
    
    options.onProgress?.({
      status: 'complete',
      progress: 1,
      message: 'Text recognized successfully!',
    });
    
    return {
      success: true,
      text: result.data.text.trim(),
      confidence: result.data.confidence / 100, // Convert 0-100 to 0-1
      language: detectedLanguage,
      processingTime,
    };
  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    
    options.onProgress?.({
      status: 'error',
      progress: 0,
      message: error.message || 'OCR failed',
    });
    
    return {
      success: false,
      text: '',
      confidence: 0,
      language: 'eng',
      processingTime,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Perform OCR on camera capture (optimized for mobile)
 */
export async function recognizeFromCamera(
  imageDataUrl: string,
  options: {
    language?: 'auto' | 'eng' | 'chi_sim' | 'eng+chi_sim';
    onProgress?: (progress: OCRProgress) => void;
  } = {}
): Promise<OCRResult> {
  const startTime = Date.now();
  
  try {
    options.onProgress?.({
      status: 'loading',
      progress: 0.1,
      message: 'Processing camera image...',
    });
    
    // Determine language
    const language = options.language === 'auto' || !options.language
      ? OCR_CONFIG.languages.combined
      : options.language;
    
    // Get or create worker
    const worker = await getWorker(language, options.onProgress);
    
    options.onProgress?.({
      status: 'recognizing',
      progress: 0.9,
      message: 'Reading text...',
    });
    
    // Perform OCR directly on data URL
    const result = await worker.recognize(imageDataUrl);
    
    const processingTime = Date.now() - startTime;
    const detectedLanguage = detectLanguage(result.data.text);
    
    options.onProgress?.({
      status: 'complete',
      progress: 1,
      message: 'Text recognized!',
    });
    
    return {
      success: true,
      text: result.data.text.trim(),
      confidence: result.data.confidence / 100,
      language: detectedLanguage,
      processingTime,
    };
  } catch (error: any) {
    const processingTime = Date.now() - startTime;
    
    options.onProgress?.({
      status: 'error',
      progress: 0,
      message: error.message || 'OCR failed',
    });
    
    return {
      success: false,
      text: '',
      confidence: 0,
      language: 'eng',
      processingTime,
      error: error.message || 'Unknown error',
    };
  }
}

// ============================================================================
// Receipt Parsing
// ============================================================================

/**
 * Extract structured data from receipt text
 */
export function parseReceipt(text: string): ReceiptData {
  const lines = text.split('\n').filter(line => line.trim());
  
  let vendor: string | undefined;
  let amount: number | undefined;
  const currency = 'CAD';
  let date: string | undefined;
  const items: string[] = [];
  
  // IMPROVED: More precise amount pattern that avoids matching phone numbers, dates, etc.
  // Only match amounts with $ sign or decimal point, reasonable range
  const amountPattern = /\$\s*(\d{1,6}(?:[.,]\d{2})?)|\b(\d{1,4}\.\d{2})\b/g;
  
  // Pattern for dates
  const datePattern = /(\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/;
  
  // Known Toronto vendors (from our categories)
  const knownVendors = [
    't&t', 'h mart', 'loblaws', 'metro', 'sobeys', 'no frills', 'food basics',
    'anju', 'kinton', 'chatime', 'coco', 'starbucks', 'tim hortons',
    'shoppers', 'rexall', 'walmart', 'costco', 'dollarama',
    'freshway', 'whole foods', 'wholefoods',  // Added from your receipts
  ];
  
  // Extract vendor (usually first line)
  if (lines.length > 0) {
    const firstLine = lines[0].toLowerCase();
    for (const v of knownVendors) {
      if (firstLine.includes(v)) {
        vendor = v;
        break;
      }
    }
    if (!vendor) {
      vendor = lines[0].slice(0, 50); // First 50 chars of first line
    }
  }
  
  // CRITICAL FIX: Smart total extraction
  // Look for "TOTAL", "BALANCE", "AMOUNT" keywords first
  let totalFound = false;
  const totalKeywords = ['total', 'balance', 'amount', 'balance to pay', 'grand total', 'final total'];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    
    // Check if this line contains a total keyword
    for (const keyword of totalKeywords) {
      if (line.includes(keyword) && !line.includes('sub') && !line.includes('before')) {
        // Extract amount from this line or next line
        const combinedLine = line + ' ' + (lines[i + 1] || '');
        const matches = combinedLine.match(amountPattern);
        
        if (matches) {
          for (const match of matches) {
            const cleanMatch = match.replace(/[$,\s]/g, '');
            const num = parseFloat(cleanMatch);
            
            // Reasonable receipt amount: $0.01 to $9,999.99
            if (!isNaN(num) && num > 0 && num < 10000) {
              amount = num;
              totalFound = true;
              break;
            }
          }
        }
        if (totalFound) break;
      }
    }
    if (totalFound) break;
  }
  
  // Fallback: If no total keyword found, collect all amounts and take the last reasonable one
  if (!totalFound) {
    const amounts: number[] = [];
    for (const line of lines) {
      // Skip lines with phone numbers, dates, transaction IDs
      if (line.match(/\d{3}[-\s]?\d{3}[-\s]?\d{4}/) || // Phone: 905-305-7776
          line.match(/\d{10,}/) || // Long numbers: transaction IDs
          line.toLowerCase().includes('lane') ||
          line.toLowerCase().includes('trans') ||
          line.toLowerCase().includes('terminal')) {
        continue;
      }
      
      const matches = line.match(amountPattern);
      if (matches) {
        for (const match of matches) {
          const cleanMatch = match.replace(/[$,\s]/g, '');
          const num = parseFloat(cleanMatch);
          
          // Only accept reasonable amounts
          if (!isNaN(num) && num > 0 && num < 10000) {
            amounts.push(num);
          }
        }
      }
    }
    
    // Total is usually the last amount (after all items)
    if (amounts.length > 0) {
      amount = amounts[amounts.length - 1];
    }
  }
  
  // Extract date
  for (const line of lines) {
    const dateMatch = line.match(datePattern);
    if (dateMatch) {
      date = dateMatch[0];
      break;
    }
  }
  
  // Extract items (lines with amounts that aren't the total)
  for (const line of lines) {
    if (line.match(amountPattern)) {
      const lineAmount = parseFloat(
        (line.match(amountPattern)?.[0] || '')
          .replace(/[$,]/g, '')
          .replace(',', '.')
      );
      if (lineAmount && lineAmount < (amount || 0)) {
        items.push(line.trim());
      }
    }
  }
  
  // Calculate confidence based on what we found
  let confidence = 0;
  if (vendor) confidence += 0.3;
  if (amount) confidence += 0.4;
  if (date) confidence += 0.2;
  if (items.length > 0) confidence += 0.1;
  
  return {
    vendor,
    amount,
    currency,
    date,
    items: items.length > 0 ? items : undefined,
    rawText: text,
    confidence,
  };
}

/**
 * Smart receipt recognition - combines OCR + parsing
 */
export async function recognizeReceipt(
  fileOrDataUrl: File | string,
  options: {
    language?: 'auto' | 'eng' | 'chi_sim' | 'eng+chi_sim';
    onProgress?: (progress: OCRProgress) => void;
  } = {}
): Promise<ReceiptData & { ocrResult: OCRResult }> {
  // Perform OCR
  const ocrResult = typeof fileOrDataUrl === 'string'
    ? await recognizeFromCamera(fileOrDataUrl, options)
    : await recognizeText(fileOrDataUrl, options);
  
  // Parse receipt structure
  const receiptData = parseReceipt(ocrResult.text);
  
  return {
    ...receiptData,
    ocrResult,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if browser supports camera
 */
export function isCameraSupported(): boolean {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/**
 * Check if file is valid image
 */
export function isValidImage(file: File): boolean {
  return file.type.startsWith('image/') && 
         file.size <= OCR_CONFIG.preprocessing.maxFileSize;
}

/**
 * Get confidence level description
 */
export function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= OCR_CONFIG.confidence.high) return 'high';
  if (confidence >= OCR_CONFIG.confidence.medium) return 'medium';
  return 'low';
}

/**
 * Format OCR result for display
 */
export function formatOCRResult(result: OCRResult): string {
  const level = getConfidenceLevel(result.confidence);
  const emoji = level === 'high' ? '✅' : level === 'medium' ? '⚠️' : '❌';
  
  return `${emoji} Confidence: ${(result.confidence * 100).toFixed(1)}% | ${result.language} | ${result.processingTime}ms`;
}

