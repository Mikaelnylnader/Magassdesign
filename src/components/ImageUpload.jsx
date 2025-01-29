import React, { useState } from 'react';
import { uploadImage, deleteImage, getImageUrl } from '../utils/supabase';

function ImageUpload({ onImageSelect, bucket = 'carousel' }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
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
      
      // Get the public URL
      const publicUrl = await getImageUrl(bucket, filename);
      
      // Pass the URL to parent component
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
      <label className="block mb-4">
        <span className="text-primary">Choose an image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
      {isUploading && (
        <p className="text-primary">Uploading...</p>
      )}
      {error && (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
}

export default ImageUpload;