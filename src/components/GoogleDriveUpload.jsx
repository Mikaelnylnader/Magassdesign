import React, { useState } from 'react';
import { uploadImage } from '../utils/supabase';
import { RainbowButton } from './ui/rainbow-button';

function GoogleDriveUpload({ onImageSelect, bucket = 'carousel' }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleDriveUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      
      // Generate a unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${file.name}`;
      
      // Upload the file
      await uploadImage(file, bucket, filename);
      
      // Get the public URL and notify parent component
      const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
      onImageSelect(publicUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <label className="block">
          <span className="text-primary mb-2 block">Select image from your device</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleGoogleDriveUpload}
            disabled={isUploading}
            className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-accent file:text-white
              hover:file:bg-red-700
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </label>

        <div className="text-sm text-gray-400">
          To upload from Google Drive:
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Open your Google Drive</li>
            <li>Right-click on the image</li>
            <li>Select "Download"</li>
            <li>Choose the downloaded file using the input above</li>
          </ol>
        </div>

        {isUploading && (
          <div className="text-primary">Uploading...</div>
        )}
        {error && (
          <div className="text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
}

export default GoogleDriveUpload;