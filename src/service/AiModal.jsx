import axios from 'axios'
import { getDestinationPlaces, getDestinationHotels, getDestinationFood } from '../utils/destinationData'
import { getDestinationCoordinates } from '../utils/coordinates'

const AI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your_gemini_api_key_here'

export const generateTravelPlan = async (formData) => {
  try {
    const destination = formData.location?.label || formData.location || 'Pune'
    const prompt = `Generate a detailed travel itinerary for ${formData.noofDays} days in ${destination} for ${formData.traveler} people with a ${formData.budget} budget. 

IMPORTANT: You MUST respond with ONLY valid JSON format, no additional text before or after. The JSON structure should be:

{
  "destination": "${destination}",
  "duration": ${formData.noofDays},
  "budget": "${formData.budget}",
  "travelers": "${formData.traveler}",
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Full address",
      "price": 5000,
      "imageUrl": "https://example.com/hotel-image.jpg",
      "coordinates": {"lat": 18.5204, "lng": 73.8567},
      "rating": 4.5,
      "description": "Hotel description",
      "amenities": ["WiFi", "Pool", "Spa"]
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "date": "Day 1",
      "theme": "Historical & Cultural",
      "places": [
        {
          "name": "Place Name",
          "details": "Detailed description",
          "imageUrl": "https://example.com/place-image.jpg",
          "coordinates": {"lat": 18.5204, "lng": 73.8567},
          "ticketPrice": 100,
          "duration": "2-3 hours",
          "bestTimeToVisit": "8:00 AM - 11:00 AM"
        }
      ]
    }
  ],
  "foodRecommendations": [
    {
      "name": "Restaurant Name",
      "type": "Local/Street Food/Fine Dining",
      "price": 300,
      "description": "What to try here",
      "location": "Area name"
    }
  ],
  "budgetBreakdown": {
    "entryFees": 1500,
    "food": 5000,
    "accommodation": 10000,
    "shopping": 2000,
    "total": 17500
  },
  "tips": [
    "Tip 1",
    "Tip 2"
  ]
}

Generate realistic data with proper image URLs. For imageUrl fields, use Unsplash Source API format: https://source.unsplash.com/800x600/?{place name},{destination} (replace spaces with commas). Use real place names and coordinates based on the ${formData.budget} budget.

CRITICAL REQUIREMENTS:
- You MUST include an "itinerary" array with at least ${formData.noofDays} day(s) of activities
- Each day in the itinerary MUST have a "places" array with at least 2-4 places to visit
- The itinerary is REQUIRED and cannot be empty or missing
- For "bestTimeToVisit", provide exact timings in format "8:00 AM - 11:00 AM" (NOT "Morning", "Afternoon", etc.)
- Do NOT include words like "Morning", "Afternoon", "Evening" in bestTimeToVisit - only exact time ranges
- Do NOT include any estimation text or phrases in the response
- Do NOT include transportation section in the response
- Ensure ALL fields in the JSON structure are populated with realistic data for ${destination}`

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    )

    let responseText = response.data.candidates[0].content.parts[0].text
    
    // Try to extract JSON from the response
    try {
      // Remove markdown code blocks if present
      responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      // Try to find JSON object in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[0])
        
        // Validate and fix missing itinerary
        if (!jsonData.itinerary || !Array.isArray(jsonData.itinerary) || jsonData.itinerary.length === 0) {
          console.warn('AI response missing itinerary, generating fallback itinerary')
          const fallbackData = generateStructuredJSON(formData)
          jsonData.itinerary = fallbackData.data.itinerary
        }
        
        // Ensure all required fields exist
        if (!jsonData.hotels || !Array.isArray(jsonData.hotels)) {
          const fallbackData = generateStructuredJSON(formData)
          jsonData.hotels = fallbackData.data.hotels
        }
        
        return { data: jsonData }
      }
      
      // If no JSON found, try parsing the whole response
      const jsonData = JSON.parse(responseText)
      
      // Validate and fix missing itinerary
      if (!jsonData.itinerary || !Array.isArray(jsonData.itinerary) || jsonData.itinerary.length === 0) {
        console.warn('AI response missing itinerary, generating fallback itinerary')
        const fallbackData = generateStructuredJSON(formData)
        jsonData.itinerary = fallbackData.data.itinerary
      }
      
      return { data: jsonData }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON, using fallback:', parseError)
      // Fall back to generating structured JSON
      return generateStructuredJSON(formData)
    }
  } catch (error) {
    console.error('Error generating travel plan:', error)
    // Fall back to generating structured JSON
    return generateStructuredJSON(formData)
  }
}

// Generate structured JSON fallback
const generateStructuredJSON = (formData) => {
  const destination = formData.location?.label || formData.location || 'Pune'
  const days = parseInt(formData.noofDays) || 3
  const people = formData.traveler || '2'
  const budget = formData.budget || 'Moderate'
  
  const budgetMultiplier = budget === 'Cheap' ? 0.7 : budget === 'Moderate' ? 1 : budget === 'Luxury' ? 1.5 : 1
  const peopleMultiplier = people === '1' ? 1 : people === '2' ? 2 : people === '3-4' ? 3.5 : people === '5+' ? 5 : 2
  const calculateCost = (baseCost) => Math.round(baseCost * budgetMultiplier * peopleMultiplier)
  const baseCoords = getDestinationCoordinates(destination)
  
  // Generate hotels
  const generateHotels = () => {
    const hotelTemplates = getDestinationHotels(destination, budget)
    
    return hotelTemplates.map(hotel => ({
      name: hotel.name,
      address: `${hotel.location}, ${destination}`,
      price: Math.round(hotel.basePrice * budgetMultiplier * peopleMultiplier),
      // imageUrl will be fetched asynchronously by HotelCard component
      imageUrl: null,
      coordinates: { lat: baseCoords.lat + (Math.random() - 0.5) * 0.1, lng: baseCoords.lng + (Math.random() - 0.5) * 0.1 },
      rating: hotel.rating,
      description: hotel.desc,
      amenities: hotel.amenities
    }))
  }
  
  // Generate itinerary
  const generateItinerary = () => {
    let places = getDestinationPlaces(destination)
    const destinationLower = destination?.toLowerCase() || ''
    
    // Check if we got default Pune places for a non-Pune destination
    const isPuneDefault = places.length > 0 && places[0]?.name === 'Shaniwar Wada'
    const isNotPune = destinationLower !== 'pune' && !destinationLower.includes('pune')
    
    // Generate generic places for unknown destinations (when we got Pune default but destination is not Pune)
    if (!places || places.length === 0 || (isPuneDefault && isNotPune)) {
      // Generate location-aware generic places based on destination characteristics
      const destinationLower = destination?.toLowerCase() || ''
      
      // Detect destination type for more relevant place suggestions
      const isCoastal = destinationLower.includes('beach') || destinationLower.includes('coast') || 
                       destinationLower.includes('island') || destinationLower.includes('bay') ||
                       destinationLower.includes('harbor') || destinationLower.includes('port')
      const isMountain = destinationLower.includes('mountain') || destinationLower.includes('hill') ||
                        destinationLower.includes('alps') || destinationLower.includes('peak')
      const isCountry = destinationLower.length > 10 && !destinationLower.includes('city') && 
                       !destinationLower.includes('town') && !destinationLower.includes('island')
      
      let genericPlaceTypes = []
      
      if (isCoastal) {
        genericPlaceTypes = [
          { name: `${destination} Beach`, desc: 'Beautiful sandy beach perfect for relaxation and water activities', duration: '3-4 hours', baseCost: 0, theme: 'Beach & Recreation' },
          { name: `${destination} Harbor`, desc: 'Scenic harbor area with boats and waterfront dining', duration: '2-3 hours', baseCost: 0, theme: 'Scenic & Recreation' },
          { name: `${destination} Lighthouse`, desc: 'Historic lighthouse with panoramic ocean views', duration: '1-2 hours', baseCost: 100, theme: 'Historical & Scenic' },
          { name: `${destination} Marine Park`, desc: 'Protected marine area with diverse sea life', duration: '2-3 hours', baseCost: 300, theme: 'Nature & Wildlife' },
          { name: `${destination} Boardwalk`, desc: 'Charming waterfront promenade', duration: '1-2 hours', baseCost: 0, theme: 'Recreation & Scenic' },
          { name: `${destination} Seafood Market`, desc: 'Fresh local seafood and culinary experiences', duration: '1-2 hours', baseCost: 0, theme: 'Food & Cultural' },
          { name: `${destination} Coastal Trail`, desc: 'Scenic hiking trail along the coastline', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
          { name: `${destination} Sunset Point`, desc: 'Perfect spot to watch spectacular sunsets', duration: '1 hour', baseCost: 0, theme: 'Scenic & Relaxation' }
        ]
      } else if (isMountain) {
        genericPlaceTypes = [
          { name: `${destination} Summit`, desc: 'Mountain peak with breathtaking panoramic views', duration: '3-4 hours', baseCost: 0, theme: 'Nature & Scenic' },
          { name: `${destination} Hiking Trail`, desc: 'Scenic mountain trails for all skill levels', duration: '2-4 hours', baseCost: 0, theme: 'Nature & Adventure' },
          { name: `${destination} Cable Car`, desc: 'Aerial ride with stunning mountain vistas', duration: '1-2 hours', baseCost: 800, theme: 'Scenic & Recreation' },
          { name: `${destination} Alpine Lake`, desc: 'Crystal clear mountain lake', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Scenic' },
          { name: `${destination} Viewpoint`, desc: 'Spectacular mountain and valley views', duration: '1 hour', baseCost: 0, theme: 'Scenic & Photography' },
          { name: `${destination} Mountain Village`, desc: 'Charming alpine village with local culture', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Shopping' },
          { name: `${destination} Waterfall`, desc: 'Beautiful cascading waterfall', duration: '1-2 hours', baseCost: 0, theme: 'Nature & Scenic' },
          { name: `${destination} Nature Reserve`, desc: 'Protected area with diverse wildlife', duration: '3-4 hours', baseCost: 200, theme: 'Nature & Wildlife' }
        ]
      } else if (isCountry) {
        genericPlaceTypes = [
          { name: `${destination} Capital City`, desc: 'Explore the vibrant capital with rich history and culture', duration: '4-5 hours', baseCost: 0, theme: 'Cultural & Historical' },
          { name: `${destination} National Park`, desc: 'Protected natural area showcasing the country\'s beauty', duration: '4-6 hours', baseCost: 500, theme: 'Nature & Wildlife' },
          { name: `${destination} Cultural Heritage Site`, desc: 'UNESCO World Heritage site', duration: '2-3 hours', baseCost: 300, theme: 'Historical & Cultural' },
          { name: `${destination} Scenic Route`, desc: 'Beautiful drive through stunning landscapes', duration: '4-6 hours', baseCost: 2000, theme: 'Scenic & Nature' },
          { name: `${destination} Traditional Village`, desc: 'Experience authentic local culture and traditions', duration: '3-4 hours', baseCost: 200, theme: 'Cultural & Local' },
          { name: `${destination} Mountain Range`, desc: 'Majestic mountains and hiking opportunities', duration: '6-8 hours', baseCost: 500, theme: 'Nature & Adventure' },
          { name: `${destination} Coastal Area`, desc: 'Beautiful beaches and coastal scenery', duration: '3-4 hours', baseCost: 0, theme: 'Beach & Scenic' },
          { name: `${destination} Historic City`, desc: 'Ancient city with rich architectural heritage', duration: '3-4 hours', baseCost: 400, theme: 'Historical & Architectural' }
        ]
      } else {
        // Default city places
        genericPlaceTypes = [
          { name: `${destination} City Center`, desc: 'Explore the heart of the city with local markets and cultural sites', duration: '2-3 hours', baseCost: 0, theme: 'Cultural & Shopping' },
          { name: `${destination} Historic District`, desc: 'Discover the rich history and heritage of the region', duration: '2-3 hours', baseCost: 200, theme: 'Historical & Cultural' },
          { name: `${destination} Art Museum`, desc: 'World-class collection of art and cultural artifacts', duration: '2-3 hours', baseCost: 500, theme: 'Art & Cultural' },
          { name: `${destination} Central Park`, desc: 'Beautiful urban park perfect for relaxation', duration: '2-3 hours', baseCost: 0, theme: 'Nature & Recreation' },
          { name: `${destination} Observation Deck`, desc: 'Panoramic city views from above', duration: '1-2 hours', baseCost: 800, theme: 'Scenic & Views' },
          { name: `${destination} Local Market`, desc: 'Experience local culture, food, and shopping', duration: '2-3 hours', baseCost: 0, theme: 'Shopping & Food' },
          { name: `${destination} Cathedral`, desc: 'Historic religious architecture', duration: '1 hour', baseCost: 0, theme: 'Spiritual & Architectural' },
          { name: `${destination} Waterfront`, desc: 'Scenic waterfront area with dining and activities', duration: '2-3 hours', baseCost: 0, theme: 'Recreation & Scenic' }
        ]
      }
      
      places = genericPlaceTypes
    }
    
    const itinerary = []
    const placesPerDay = Math.min(4, Math.ceil(Math.max(places.length, days * 2) / days))
    
    for (let day = 1; day <= days; day++) {
      const dayPlaces = []
      // Exact timings for each place
      const timings = [
        { start: '8:00 AM', end: '11:00 AM' },
        { start: '11:30 AM', end: '2:00 PM' },
        { start: '2:30 PM', end: '5:00 PM' },
        { start: '5:30 PM', end: '8:00 PM' }
      ]
      
      const themes = [
        'Historical & Cultural',
        'Nature & Scenic',
        'Adventure & Recreation',
        'Local Experiences',
        'Relaxation & Leisure'
      ]
      
      for (let i = 0; i < placesPerDay && ((day - 1) * placesPerDay + i) < places.length; i++) {
        const placeIndex = (day - 1) * placesPerDay + i
        const place = places[placeIndex % places.length]
        const timing = timings[i % timings.length]
        dayPlaces.push({
          name: place.name,
          details: place.desc,
          // imageUrl will be fetched asynchronously by PlaceCard component
          imageUrl: null,
          coordinates: { lat: baseCoords.lat + (Math.random() - 0.5) * 0.1, lng: baseCoords.lng + (Math.random() - 0.5) * 0.1 },
          ticketPrice: calculateCost(place.baseCost),
          duration: place.duration,
          bestTimeToVisit: `${timing.start} - ${timing.end}`
        })
      }
      
      itinerary.push({
        day: day,
        date: `Day ${day}`,
        theme: themes[(day - 1) % themes.length],
        places: dayPlaces
      })
    }
    
    return itinerary
  }
  
  // Generate food recommendations
  const generateFoodRecommendations = () => {
    return getDestinationFood(destination, budget)
  }
  
  // Calculate budget breakdown
  const calculateBudgetBreakdown = () => {
    const entryFees = calculateCost(300 * days)
    const food = calculateCost(400 * days)
    const accommodation = calculateCost(2000 * days)
    const shopping = calculateCost(200 * days)
    
    return {
      entryFees,
      food,
      accommodation,
      shopping,
      total: entryFees + food + accommodation + shopping
    }
  }
  
  return {
    data: {
      destination,
      duration: days,
      budget,
      travelers: people,
      hotels: generateHotels(),
      itinerary: generateItinerary(),
      foodRecommendations: generateFoodRecommendations(),
      budgetBreakdown: calculateBudgetBreakdown(),
      tips: [
        `Book accommodations in advance for ${people} people`,
        'Use group transport options for cost efficiency',
        'Take advantage of group discounts at attractions',
        `Consider hotel locations based on your ${days}-day itinerary`
      ]
    }
  }
}
