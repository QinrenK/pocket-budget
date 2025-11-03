'use client';

// ============================================================================
// File Upload OCR Component - Alternative to Camera
// For desktop users or when camera access is denied
// ============================================================================

import { useState, useRef } from 'react';
import { haptic, hapticSuccess, hapticError } from '@/lib/haptics';
import {
  recognizeReceipt,
  isValidImage,
  type OCRProgress,
  type ReceiptData,
} from '@/lib/ocr';

interface FileUploadOCRProps {
  onComplete: (text: string, receiptData?: ReceiptData) => void;
  buttonText?: string;
  buttonClassName?: string;
}

export default function FileUploadOCR({
  onComplete,
  buttonText = 'Upload Receipt',
  buttonClassName = 'btn-secondary',
}: FileUploadOCRProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    haptic('light');

    // Validate file
    if (!isValidImage(file)) {
      hapticError();
      alert('Please select a valid image file (max 5MB)');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Process OCR
    setIsProcessing(true);

    try {
      const result = await recognizeReceipt(file, {
        language: 'auto',
        onProgress: (p) => {
          setProgress(p);
        },
      });

      if (!result.ocrResult.success) {
        throw new Error(result.ocrResult.error || 'OCR failed');
      }

      hapticSuccess();

      // Format text
      let formattedText = result.ocrResult.text;
      if (result.vendor && result.amount) {
        formattedText = `${result.vendor} ${result.amount}`;
      }

      onComplete(formattedText, result);
    } catch (err: any) {
      console.error('OCR error:', err);
      hapticError();
      alert(`Failed to read text: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setProgress(null);
      setPreview(null);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isProcessing}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={buttonClassName}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          <>📎 {buttonText}</>
        )}
      </button>

      {/* Processing Modal */}
      {isProcessing && progress && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            {preview && (
              <img
                src={preview}
                alt="Processing..."
                className="w-full h-40 object-contain mb-4 rounded-lg"
              />
            )}
            <div className="text-center">
              <div className="text-4xl mb-3">
                {progress.status === 'loading' && '⏳'}
                {progress.status === 'recognizing' && '👁️'}
                {progress.status === 'complete' && '✅'}
                {progress.status === 'error' && '❌'}
              </div>
              <p className="text-ws-gray-900 font-medium mb-2">
                {progress.message}
              </p>
              <div className="w-full bg-ws-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-ws-coral h-full transition-all duration-300"
                  style={{ width: `${progress.progress * 100}%` }}
                />
              </div>
              <p className="text-ws-gray-600 text-sm mt-2">
                {Math.round(progress.progress * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

