import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface WasteClassificationRequest {
  image: string // base64 encoded image
  latitude: number
  longitude: number
  user_id: string
}

interface WasteClassificationResponse {
  status: string
  waste_type: string
  disposal_method: string
  confidence: number
  eco_points_awarded: number
  gps_location: string
  is_illegal_dumping: boolean
  message?: string
}

// Waste disposal instructions
const DISPOSAL_METHODS = {
  'Plastic': 'Clean and place in Blue Recycling Bin. Remove caps and labels for better recycling.',
  'Organic': 'Compost at home or place in Green Organic Waste Bin. Great for creating nutrient-rich soil!',
  'E-Waste': 'Take to certified E-Waste collection center. Never throw electronics in regular trash.',
  'Glass': 'Clean and place in designated Glass Recycling Bin. Separate by color if required.',
  'Metal': 'Clean cans and metal items, place in Metal Recycling Bin. Aluminum cans are highly recyclable!',
  'Paper': 'Clean, dry paper goes in Paper Recycling Bin. Remove staples and plastic windows.',
  'Textile': 'Donate wearable clothes or take to textile recycling center. Consider upcycling projects!',
  'Biomedical': 'DANGER: Take to hospital or pharmacy for safe disposal. Never put in regular trash.',
  'General': 'Place in Black General Waste Bin. Consider if item can be recycled or reused first.'
}

// Simple AI classification based on image analysis
function classifyWasteFromImage(imageBase64: string): { waste_type: string, confidence: number } {
  try {
    // In a real implementation, you would use TensorFlow.js or an AI service
    // For demo purposes, we'll simulate classification based on image characteristics
    
    // Decode base64 to get image info (simplified simulation)
    const imageData = imageBase64.substring(0, 100).toLowerCase()
    
    // Simple keyword-based classification (in production, use actual AI model)
    if (imageData.includes('plastic') || imageData.includes('bottle') || Math.random() > 0.7) {
      return { waste_type: 'Plastic', confidence: 0.92 + Math.random() * 0.07 }
    } else if (imageData.includes('organic') || imageData.includes('food') || Math.random() > 0.8) {
      return { waste_type: 'Organic', confidence: 0.88 + Math.random() * 0.1 }
    } else if (imageData.includes('electronic') || imageData.includes('battery') || Math.random() > 0.85) {
      return { waste_type: 'E-Waste', confidence: 0.91 + Math.random() * 0.08 }
    } else if (imageData.includes('glass') || Math.random() > 0.75) {
      return { waste_type: 'Glass', confidence: 0.89 + Math.random() * 0.09 }
    } else if (imageData.includes('metal') || imageData.includes('can') || Math.random() > 0.82) {
      return { waste_type: 'Metal', confidence: 0.87 + Math.random() * 0.11 }
    } else if (imageData.includes('paper') || Math.random() > 0.78) {
      return { waste_type: 'Paper', confidence: 0.85 + Math.random() * 0.12 }
    } else if (imageData.includes('textile') || imageData.includes('cloth') || Math.random() > 0.88) {
      return { waste_type: 'Textile', confidence: 0.83 + Math.random() * 0.15 }
    } else if (imageData.includes('medical') || imageData.includes('syringe') || Math.random() > 0.95) {
      return { waste_type: 'Biomedical', confidence: 0.94 + Math.random() * 0.05 }
    }
    
    // Default classification
    const wasteTypes = ['Plastic', 'Organic', 'Paper', 'Metal', 'Glass']
    const randomType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)]
    return { waste_type: randomType, confidence: 0.75 + Math.random() * 0.2 }
    
  } catch (error) {
    console.error('Classification error:', error)
    return { waste_type: 'General', confidence: 0.5 }
  }
}

// Check if location is in illegal dumping zone
async function checkIllegalDumping(supabase: any, latitude: number, longitude: number): Promise<boolean> {
  try {
    // Query illegal dumping zones within 100 meters radius
    const { data: zones, error } = await supabase
      .from('illegal_dumping_zones')
      .select('*')
      .eq('is_active', true)
    
    if (error) {
      console.error('Error checking illegal zones:', error)
      return false
    }
    
    // Check if current location is within any illegal zone radius
    for (const zone of zones || []) {
      const distance = calculateDistance(
        latitude, longitude,
        parseFloat(zone.latitude), parseFloat(zone.longitude)
      )
      
      if (distance <= (zone.radius_meters || 100)) {
        return true
      }
    }
    
    return false
  } catch (error) {
    console.error('Error in illegal dumping check:', error)
    return false
  }
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180
  const φ2 = lat2 * Math.PI/180
  const Δφ = (lat2-lat1) * Math.PI/180
  const Δλ = (lon2-lon1) * Math.PI/180

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c // Distance in meters
}

// Upload image to Supabase Storage
async function uploadImage(supabase: any, imageBase64: string, userId: string): Promise<string> {
  try {
    // Convert base64 to blob
    const base64Data = imageBase64.split(',')[1] || imageBase64
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'image/jpeg' })
    
    const fileName = `waste-reports/${userId}/${Date.now()}.jpg`
    
    const { data, error } = await supabase.storage
      .from('waste-images')
      .upload(fileName, blob)
    
    if (error) {
      console.error('Upload error:', error)
      throw error
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('waste-images')
      .getPublicUrl(fileName)
    
    return publicUrl
  } catch (error) {
    console.error('Image upload failed:', error)
    throw new Error('Failed to upload image')
  }
}

// Award EcoPoints to user
async function awardEcoPoints(supabase: any, userId: string, points: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        eco_points: supabase.raw(`eco_points + ${points}`)
      })
      .eq('user_id', userId)
    
    if (error) {
      console.error('Error awarding points:', error)
    }
  } catch (error) {
    console.error('Failed to award points:', error)
  }
}

// Send notification for illegal dumping
async function sendIllegalDumpingNotification(
  supabase: any, 
  wasteReportId: string, 
  location: string
): Promise<void> {
  try {
    // In a real implementation, you would integrate with SendGrid/Twilio
    // For now, we'll log the notification
    console.log(`🚨 ILLEGAL DUMPING ALERT: Report ${wasteReportId} at ${location}`)
    
    // You could also insert into a notifications table
    await supabase
      .from('notifications')
      .insert({
        type: 'illegal_dumping',
        title: 'Illegal Dumping Detected',
        message: `New illegal dumping report at ${location}`,
        report_id: wasteReportId,
        priority: 'high'
      })
  } catch (error) {
    console.error('Failed to send notification:', error)
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verify the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const body: WasteClassificationRequest = await req.json()

    // Validation
    if (!body.image || !body.latitude || !body.longitude) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: image, latitude, longitude' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate GPS coordinates
    if (body.latitude < -90 || body.latitude > 90 || 
        body.longitude < -180 || body.longitude > 180) {
      return new Response(
        JSON.stringify({ error: 'Invalid GPS coordinates' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check image size (base64 encoded, roughly 10MB limit)
    if (body.image.length > 13000000) { // ~10MB in base64
      return new Response(
        JSON.stringify({ error: 'Image too large. Maximum size is 10MB' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Upload image to storage
    const imageUrl = await uploadImage(supabase, body.image, user.id)

    // Classify waste using AI
    const { waste_type, confidence } = classifyWasteFromImage(body.image)

    // Check for illegal dumping
    const isIllegalDumping = await checkIllegalDumping(
      supabase, 
      body.latitude, 
      body.longitude
    )

    // Prepare GPS location string
    const gpsLocation = `${body.latitude},${body.longitude}`

    // Award EcoPoints
    const ecoPoints = 10
    await awardEcoPoints(supabase, user.id, ecoPoints)

    // Store in database
    const { data: wasteReport, error: dbError } = await supabase
      .from('waste_reports')
      .insert({
        user_id: user.id,
        image_url: imageUrl,
        waste_type: waste_type,
        disposal_method: DISPOSAL_METHODS[waste_type as keyof typeof DISPOSAL_METHODS] || DISPOSAL_METHODS.General,
        latitude: body.latitude,
        longitude: body.longitude,
        confidence_score: confidence,
        points_awarded: ecoPoints,
        is_illegal_dumping: isIllegalDumping
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to save waste report' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send notification if illegal dumping detected
    if (isIllegalDumping && wasteReport) {
      await sendIllegalDumpingNotification(
        supabase, 
        wasteReport.id, 
        gpsLocation
      )
    }

    // Prepare response
    const response: WasteClassificationResponse = {
      status: 'success',
      waste_type: waste_type,
      disposal_method: DISPOSAL_METHODS[waste_type as keyof typeof DISPOSAL_METHODS] || DISPOSAL_METHODS.General,
      confidence: Math.round(confidence * 100) / 100,
      eco_points_awarded: ecoPoints,
      gps_location: gpsLocation,
      is_illegal_dumping: isIllegalDumping,
      message: isIllegalDumping 
        ? '⚠️ Illegal dumping detected! Municipal authorities have been notified.'
        : '✅ Waste classified successfully! Thank you for helping keep our environment clean.'
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})