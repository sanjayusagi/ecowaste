import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  MapPin,
  Upload,
  X,
  CheckCircle,
  AlertTriangle,
  Award,
  Loader,
  Image as ImageIcon,
  Trash2
} from 'lucide-react';

interface WasteReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (result: any) => void;
}

interface ClassificationResult {
  status: string;
  waste_type: string;
  disposal_method: string;
  confidence: number;
  eco_points_awarded: number;
  gps_location: string;
  is_illegal_dumping: boolean;
  message?: string;
}

const WasteReportModal: React.FC<WasteReportModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPG, PNG, WebP)');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size must be less than 10MB');
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError('Unable to get your location. Please enable location services.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const classifyWaste = async () => {
    if (!selectedImage || !location) {
      setError('Please select an image and enable location');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert image to base64
      const imageBase64 = await convertImageToBase64(selectedImage);

      // Get auth token (you'll need to implement this based on your auth system)
      const authToken = localStorage.getItem('supabase.auth.token') || 'demo-token';

      const response = await fetch('/api/classify-waste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          image: imageBase64,
          latitude: location.lat,
          longitude: location.lng
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Classification failed');
      }

      const result: ClassificationResult = await response.json();
      setResult(result);
      
      if (onSuccess) {
        onSuccess(result);
      }

    } catch (error) {
      console.error('Classification error:', error);
      setError(error instanceof Error ? error.message : 'Classification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setLocation(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={handleClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-eco-500 to-nature-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Waste Classifier</h2>
                  <p className="text-sm text-white/80">Upload image and get instant classification</p>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!result ? (
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Waste Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-eco-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Selected waste"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <motion.button
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">JPG, PNG, WebP (Max 10MB)</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPS Location *
                  </label>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={getCurrentLocation}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      <span>Get Current Location</span>
                    </motion.button>
                    
                    {location && (
                      <div className="flex items-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>Location captured</span>
                      </div>
                    )}
                  </div>
                  
                  {location && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Coordinates:</strong> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <p className="text-red-800">{error}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  onClick={classifyWaste}
                  disabled={!selectedImage || !location || isLoading}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-eco-500 to-nature-500 text-white font-semibold rounded-lg hover:from-eco-600 hover:to-nature-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Classifying...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Classify Waste</span>
                    </>
                  )}
                </motion.button>
              </div>
            ) : (
              /* Results Display */
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Success Header */}
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Classification Complete!</h3>
                  <p className="text-gray-600">{result.message}</p>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trash2 className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Waste Type</span>
                    </div>
                    <p className="text-xl font-bold text-blue-800">{result.waste_type}</p>
                    <p className="text-sm text-blue-600">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-900">EcoPoints Earned</span>
                    </div>
                    <p className="text-xl font-bold text-green-800">+{result.eco_points_awarded}</p>
                    <p className="text-sm text-green-600">Added to your account</p>
                  </div>
                </div>

                {/* Disposal Instructions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Disposal Instructions:</h4>
                  <p className="text-gray-700">{result.disposal_method}</p>
                </div>

                {/* Illegal Dumping Warning */}
                {result.is_illegal_dumping && (
                  <motion.div
                    className="bg-red-50 border border-red-200 p-4 rounded-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-900">Illegal Dumping Detected</span>
                    </div>
                    <p className="text-red-800">
                      This location has been flagged as an illegal dumping zone. 
                      Municipal authorities have been automatically notified.
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    onClick={resetForm}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Classify Another
                  </motion.button>
                  <motion.button
                    onClick={handleClose}
                    className="flex-1 py-2 px-4 bg-eco-600 text-white rounded-lg hover:bg-eco-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Done
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WasteReportModal;