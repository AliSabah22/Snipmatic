'use client';

import React, { useState } from 'react';
import VideoUpload from './VideoUpload';

export default function VideoUploadClient() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/video/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      // Refresh the page to show the new video
      window.location.reload();
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return <VideoUpload onUpload={handleUpload} isUploading={isUploading} />;
} 