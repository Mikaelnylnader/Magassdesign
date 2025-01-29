import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import { TrashIcon } from '@heroicons/react/24/outline';

function Admin() {
  const [images, setImages] = useState({
    hero: [],
    projects: [],
    products: []
  });

  const handleImageSelect = (section, imageData) => {
    setImages(prev => ({
      ...prev,
      [section]: [...prev[section], imageData]
    }));
  };

  const handleImageRemove = (section, index) => {
    setImages(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const ImageSection = ({ title, section }) => (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
      <ImageUpload onImageSelect={(img) => handleImageSelect(section, img)} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {images[section].map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              onClick={() => handleImageRemove(section, index)}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
              aria-label="Remove image"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary">Image Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageSection title="Hero Section" section="hero" />
          <ImageSection title="Projects" section="projects" />
          <ImageSection title="Products" section="products" />
        </div>
      </div>
    </div>
  );
}

export default Admin;