import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface VideoUploadProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
}

export default function VideoUpload({ onUpload, isUploading }: VideoUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      const validTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid video file (MP4, MOV, or AVI)');
        return;
      }

      // Validate file size (1GB max)
      const maxSize = 1024 * 1024 * 1024; // 1GB in bytes
      if (file.size > maxSize) {
        setError('File size must be less than 1GB');
        return;
      }

      setError(null);
      await onUpload(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  return (
    <div className="mt-5">
      <div
        {...getRootProps()}
        className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ${
          isDragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-900/25'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="text-center">
          <input {...getInputProps()} />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
              <span>Upload a file</span>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            MP4, MOV, or AVI up to 1GB
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {isUploading && (
            <p className="mt-2 text-sm text-gray-600">Uploading...</p>
          )}
        </div>
      </div>
    </div>
  );
} 