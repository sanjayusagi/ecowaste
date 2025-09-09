export interface User {
  id: string;
  name: string;
  email: string;
  type: 'citizen' | 'ngo' | 'municipality' | 'government' | 'hospital';
  points: number;
  level: number;
  avatar?: string;
  isPremium?: boolean;
}

export interface WasteReport {
  id: string;
  type: 'plastic' | 'organic' | 'electronic' | 'paper' | 'metal';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  status: 'pending' | 'verified' | 'resolved';
  reportedBy: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface Donation {
  id: string;
  type: 'food' | 'clothes' | 'books' | 'electronics';
  description: string;
  quantity: number;
  donorId: string;
  ngoId?: string;
  status: 'available' | 'claimed' | 'delivered';
  images: string[];
  location: string;
  timestamp: Date;
}

export interface EcoProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'recycled' | 'biodegradable' | 'renewable' | 'upcycled';
  images: string[];
  sellerId: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface BloodRequest {
  id: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  hospitalId: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  unitsNeeded: number;
  deadline: Date;
  status: 'active' | 'fulfilled' | 'expired';
}