'use client';

// ============================================================================
// Camera Capture Component - Mobile-Optimized Receipt Scanner
// ============================================================================

import { useState, useRef, useEffect } from 'react';
import { haptic, hapticSuccess, hapticError } from '@/lib/haptics';
import {
  recognizeReceipt,
  isCameraSupported,
  terminateWorker,
  type OCRProgress,
  type ReceiptData,
} from '@/lib/ocr';

interface CameraCaptureProps {
  onCapture: (text: string, receiptData?: ReceiptData) => void;
  onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ============================================================================
  // Camera Management
  // ============================================================================

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    if (!isCameraSupported()) {
      setError('Camera not supported on this device');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,  // CRITICAL: Disable audio/microphone access
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Failed to access camera. Please allow camera permissions.');
      hapticError();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    haptic('medium');
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // ============================================================================
  // Photo Capture
  // ============================================================================

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    haptic('medium');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/png');
    setCapturedImage(imageDataUrl);

    // Stop camera to save battery
    stopCamera();
  };

  // ============================================================================
  // OCR Processing
  // ============================================================================

  const processImage = async () => {
    if (!capturedImage) return;

    haptic('light');
    setIsProcessing(true);
    setError(null);

    try {
      const result = await recognizeReceipt(capturedImage, {
        language: 'auto',
        onProgress: (p) => {
          setProgress(p);
        },
      });

      if (!result.ocrResult.success) {
        throw new Error(result.ocrResult.error || 'OCR failed');
      }

      if (result.ocrResult.confidence < 0.5) {
        setError('Low confidence. Try retaking with better lighting.');
        hapticError();
        return;
      }

      hapticSuccess();

      // Format text for expense entry
      let formattedText = result.ocrResult.text;
      
      // If we detected a vendor and amount, format nicely
      if (result.vendor && result.amount) {
        formattedText = `${result.vendor} ${result.amount}`;
      }

      onCapture(formattedText, result);
    } catch (err: any) {
      console.error('OCR error:', err);
      setError(err.message || 'Failed to read text from image');
      hapticError();
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const retake = () => {
    haptic('medium');
    setCapturedImage(null);
    setError(null);
    setProgress(null);
    startCamera();
  };

  const handleClose = async () => {
    haptic('light');
    stopCamera();
    await terminateWorker(); // Free OCR resources
    onClose();
  };

  // ============================================================================
  // File Upload (Alternative)
  // ============================================================================

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    haptic('light');

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setCapturedImage(imageDataUrl);
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="fixed inset-0 z-50 bg-ws-gray-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-white hover:text-ws-coral transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-medium">Cancel</span>
          </button>
          
          {!capturedImage && stream && (
            <button
              onClick={switchCamera}
              className="flex items-center gap-2 text-white hover:text-ws-coral transition-colors"
            >
              <span className="text-xl">🔄</span>
              <span className="font-medium">Flip</span>
            </button>
          )}
        </div>
        
        <div className="mt-3 text-center">
          <h2 className="text-lg font-semibold text-white">
            {capturedImage ? 'Review & Process' : 'Scan Receipt'}
          </h2>
          <p className="text-sm text-white/70 mt-1">
            {capturedImage 
              ? 'Tap "Read Text" to extract information'
              : 'Position receipt in frame and tap capture'
            }
          </p>
        </div>
      </div>

      {/* Camera/Image View */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        {!capturedImage ? (
          <>
            {/* Camera Feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Viewfinder Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-ws-coral rounded-lg w-[90%] h-[70%] shadow-2xl">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-ws-coral rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-ws-coral rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-ws-coral rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-ws-coral rounded-br-lg" />
              </div>
              <p className="absolute bottom-[15%] text-white text-sm bg-black/60 px-4 py-2 rounded-full">
                Align receipt within frame
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Captured Image */}
            <img
              src={capturedImage}
              alt="Captured receipt"
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Processing Overlay */}
            {isProcessing && progress && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="bg-ws-gray-800 rounded-xl p-6 max-w-sm mx-4 text-center">
                  <div className="text-4xl mb-4">
                    {progress.status === 'loading' && '⏳'}
                    {progress.status === 'recognizing' && '👁️'}
                    {progress.status === 'complete' && '✅'}
                    {progress.status === 'error' && '❌'}
                  </div>
                  <p className="text-white font-medium mb-2">{progress.message}</p>
                  <div className="w-full bg-ws-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-ws-coral h-full transition-all duration-300"
                      style={{ width: `${progress.progress * 100}%` }}
                    />
                  </div>
                  <p className="text-ws-gray-400 text-sm mt-2">
                    {Math.round(progress.progress * 100)}%
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-20 left-4 right-4 bg-red-500/90 text-white p-4 rounded-lg shadow-lg">
            <p className="font-medium">❌ {error}</p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pb-8">
        {!capturedImage ? (
          <div className="flex items-center justify-center gap-6">
            {/* File Upload Alternative */}
            <label className="flex flex-col items-center gap-2 cursor-pointer hover:text-ws-coral transition-colors text-white">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <span className="text-xs">Gallery</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Capture Button */}
            <button
              onClick={capturePhoto}
              disabled={!stream}
              className="w-20 h-20 rounded-full bg-ws-coral border-4 border-white shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            />

            {/* Placeholder for balance */}
            <div className="w-14" />
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={retake}
              disabled={isProcessing}
              className="flex-1 bg-ws-gray-700 text-white py-4 rounded-xl font-semibold hover:bg-ws-gray-600 transition-colors disabled:opacity-50"
            >
              Retake
            </button>
            <button
              onClick={processImage}
              disabled={isProcessing}
              className="flex-1 bg-ws-coral text-white py-4 rounded-xl font-semibold hover:bg-ws-coral-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <span>👁️</span>
                  Read Text
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

