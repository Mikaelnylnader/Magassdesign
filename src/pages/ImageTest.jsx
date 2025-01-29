import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import GoogleDriveUpload from '../components/GoogleDriveUpload';
import { GradientHeading } from '../components/ui/gradient-heading'; 
import { supabase } from '../utils/supabase';
import { RainbowButton } from '../components/ui/rainbow-button';

function ImageTest() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const handleImageSelect = (imageUrl) => {
    setUploadedImages(prev => [...prev, imageUrl]);
  };

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      setConnectionStatus('Connected to Supabase successfully!');
      console.log('Available buckets:', data);
    } catch (err) {
      setConnectionStatus('Failed to connect to Supabase: ' + err.message);
      console.error('Supabase connection error:', err);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <GradientHeading size="lg" variant="pink" className="mb-8">
          Image Upload Test
        </GradientHeading>
        
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Test Supabase Connection</h2>
          <RainbowButton onClick={testSupabaseConnection}>
            Test Connection
          </RainbowButton>
          {connectionStatus && (
            <p className={`mt-4 ${connectionStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
              {connectionStatus}
            </p>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Upload from Device</h2>
          <ImageUpload onImageSelect={handleImageSelect} />
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Upload from Google Drive</h2>
          <GoogleDriveUpload onImageSelect={handleImageSelect} />
        </div>

        {uploadedImages.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Uploaded Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedImages.map((url, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageTest;