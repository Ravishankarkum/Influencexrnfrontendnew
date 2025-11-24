// MediaUpload Component: Handles drag-and-drop + manual file uploads with UI preview.
// Supports images/videos, validates file size & type, uploads to backend, and returns file list.

import { Camera, FileText, Image, Upload, Video, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { API_CONFIG, createApiUrl } from '../../config/api.js';

// Main upload component
export function MediaUpload({ onUpload, acceptedTypes = "image/*,video/*", maxFiles = 5, existingFiles = [] }) {
  const [dragActive, setDragActive] = useState(false);   // For drag-over UI highlight
  const [uploadedFiles, setUploadedFiles] = useState(existingFiles);  // Store uploaded files
  const [uploading, setUploading] = useState(false);     // Upload progress state
  const fileInputRef = useRef(null);                     // Hidden input reference

  // Handle drag events for UI highlight
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file selection via input
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Main file handler (validation + upload)
  const handleFiles = async (files) => {
    // Prevent exceeding maximum allowed files
    if (uploadedFiles.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setUploading(true);
    const newFiles = [];

    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file type based on acceptedTypes
      if (!file.type.match(acceptedTypes.replace(/\*/g, ''))) {
        alert(`File type ${file.type} not supported`);
        continue;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB`);
        continue;
      }

      const formData = new FormData();
      formData.append("media", file);

      try {
        // Upload to backend using config URL
        const uploadUrl = createApiUrl(API_CONFIG.ENDPOINTS.UPLOADS.BASE);
        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        // API error handling
        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();

        // Prepare uploaded file object for UI display
        const uploadedFile = {
          id: Date.now() + i,
          name: file.name,
          size: file.size,
          type: file.type,
          url: data.url,
          uploadedAt: new Date().toISOString()
        };

        newFiles.push(uploadedFile);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    // Update local state
    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    setUploading(false);

    // Trigger callback to parent if provided
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  // Remove file from the preview list
  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  // Select icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image size={20} />;
    if (fileType.startsWith('video/')) return <Video size={20} />;
    return <FileText size={20} />;
  };

  // Convert file size to readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Upload UI */}
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <Upload size={32} className="text-white" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {uploading ? 'Uploading...' : 'Upload Media Files'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports images and videos up to 10MB each. Maximum {maxFiles} files.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all inline-flex items-center gap-2"
          >
            <Camera size={16} />
            Choose Files
          </button>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length}/{maxFiles})</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                
                {/* Thumbnail / Icon */}
                <div className="flex-shrink-0">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={16} />
                </button>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
