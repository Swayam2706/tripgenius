import axios from 'axios'

const AI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'your_gemini_api_key_here'

// List of Indian cities/states for detection
const INDIAN_LOCATIONS = [
  'mumbai', 'delhi', 'bangalore', 'kolkata', 'chennai', 'hyderabad', 'pune', 'ahmedabad',
  'jaipur', 'surat', 'lucknow', 'kanpur', 'nagpur', 'indore', 'thane', 'bhopal',
  'visakhapatnam', 'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'agra', 'nashik',
  'faridabad', 'meerut', 'rajkot', 'varanasi', 'srinagar', 'amritsar', 'aurangabad',
  'goa', 'manali', 'shimla', 'darjeeling', 'ooty', 'kerala', 'karnataka', 'tamil nadu',
  'maharashtra', 'rajasthan', 'gujarat', 'punjab', 'west bengal', 'uttar pradesh'
]

// Check if destination is international
const isInternationalDestination = (destination) => {
  if (!destination) return false
  
  const destLower = destination.toLowerCase().trim()
  
  // Check if it's an Indian location
  const isIndian = INDIAN_LOCATIONS.some(loc => destLower.includes(loc))
  
  // Common international destinations
  const internationalKeywords = [
    'thailand', 'bangkok', 'phuket', 'singapore', 'malaysia', 'kuala lumpur',
    'dubai', 'uae', 'abu dhabi', 'bali', 'indonesia', 'japan', 'tokyo',
    'china', 'beijing', 'shanghai', 'south korea', 'seoul', 'vietnam',
    'philippines', 'manila', 'sri lanka', 'colombo', 'nepal', 'kathmandu',
    'bhutan', 'thimphu', 'bangladesh', 'dhaka', 'myanmar', 'yangon',
    'maldives', 'male', 'hong kong', 'taiwan', 'taipei', 'macau',
    'europe', 'paris', 'london', 'rome', 'barcelona', 'amsterdam',
    'usa', 'united states', 'new york', 'los angeles', 'canada', 'toronto',
    'australia', 'sydney', 'melbourne', 'new zealand', 'auckland'
  ]
  
  const isInternational = internationalKeywords.some(keyword => destLower.includes(keyword))
  
  return isInternational && !isIndian
}

export const generateTravelOptions = async (destination, origin = null) => {
  const isInternational = isInternationalDestination(destination)
  
  try {
    // If origin is provided, use it; otherwise generate routes from major Indian cities
    const originText = origin 
      ? `from ${origin} to ${destination}`
      : `to ${destination} from major Indian cities (Mumbai, Delhi, Bangalore, Kolkata, Chennai, Hyderabad, Pune)`
    
    const prompt = `Generate detailed travel options ${originText}. The destination is: ${destination}

${isInternational ? 'IMPORTANT: This is an INTERNATIONAL destination. Only provide FLIGHT options. Do NOT include trains or buses as they are not available for international travel.' : 'This is a domestic destination within India. Provide flights, trains, and buses.'}

IMPORTANT: You MUST respond with ONLY valid JSON format, no additional text before or after. The JSON structure should be:

{
  "flights": [
    {
      "airline": "Airline Name",
      "route": "Origin City to ${destination}",
      "duration": "2h 30m",
      "stops": "Non-stop or 1 stop",
      "class": "Economy/Business",
      "price": 5000
    }
  ]${isInternational ? '' : `,
  "trains": [
    {
      "name": "Train Name",
      "trainNumber": "12345",
      "route": "Origin City to ${destination}",
      "duration": "8h 30m",
      "class": "AC/3A/Sleeper",
      "availability": "Available",
      "price": 1500
    }
  ],
  "buses": [
    {
      "name": "Bus Operator",
      "operator": "Operator Name",
      "type": "AC Sleeper/AC Seater",
      "duration": "12h",
      "amenities": "WiFi, Charging",
      "price": 800
    }
  ]`}
}

Generate realistic data specific to ${destination}:
- At least 3-5 flight options with different airlines, routes from major Indian cities, and prices
${isInternational ? '' : `- At least 2-3 train options with different classes and routes
- At least 2-3 bus options with different operators`}
- Realistic prices in Indian Rupees (₹) based on actual distance to ${destination}
- Realistic durations based on actual distance to ${destination}
- For flights, include both direct and connecting options from major Indian cities (Mumbai, Delhi, Bangalore, Kolkata, Chennai)
${isInternational ? '' : `- For trains, include different classes (AC, 3A, Sleeper) with actual train names if possible
- For buses, include AC and non-AC options`}
- Make sure routes are realistic for reaching ${destination}
${isInternational ? '- For international destinations, ONLY provide flight options. Set trains and buses arrays to empty []' : ''}

CRITICAL REQUIREMENTS:
- All prices should be in Indian Rupees (₹)
- Provide realistic durations based on actual distance to ${destination}
- Include variety in options (different price ranges, durations, classes)
- Use actual city names and realistic routes to ${destination}
- Do NOT include any text outside the JSON structure
- Focus on routes that actually connect to ${destination}`

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
        return { data: jsonData }
      }
      
      // If no JSON found, try parsing the whole response
      const jsonData = JSON.parse(responseText)
      
      // Ensure international destinations only have flights
      if (isInternational) {
        jsonData.trains = []
        jsonData.buses = []
      }
      
      return { data: jsonData }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON, using fallback:', parseError)
      // Fall back to generating structured data
      return generateFallbackTravelOptions(destination, isInternational)
    }
  } catch (error) {
    console.error('Error generating travel options:', error)
    // Fall back to generating structured data
    return generateFallbackTravelOptions(destination, isInternational)
  }
}

// Generate fallback travel options
const generateFallbackTravelOptions = (destination, isInternational = false) => {
  const origins = ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata', 'Chennai']
  
  // For international destinations, adjust flight prices and durations
  const flightPrices = isInternational 
    ? [15000, 18000, 22000, 25000, 28000] // Higher prices for international
    : [4500, 6500, 5200, 5800, 6200] // Domestic prices
  
  const flightDurations = isInternational
    ? ["4h 30m", "5h 15m", "6h 45m", "7h 20m", "8h 10m"] // Longer for international
    : ["2h 15m", "3h 30m", "2h 45m", "3h 15m", "2h 50m"] // Domestic durations
  
  return {
    data: {
      flights: origins.slice(0, 5).map((orig, index) => ({
        airline: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'GoAir'][index],
        route: `${orig} to ${destination}`,
        duration: flightDurations[index],
        stops: index === 1 || index === 3 ? "1 stop" : "Non-stop",
        class: "Economy",
        price: flightPrices[index]
      })),
      trains: isInternational ? [] : origins.slice(0, 3).map((orig, index) => ({
        name: ['Rajdhani Express', 'Shatabdi Express', 'Express Train'][index],
        trainNumber: ['12301', '12001', '12345'][index],
        route: `${orig} to ${destination}`,
        duration: ['8h 30m', '6h 15m', '12h'][index],
        class: ['AC 2 Tier', 'AC Chair Car', 'AC 3 Tier'][index],
        availability: "Available",
        price: [2500, 1800, 1500][index]
      })),
      buses: isInternational ? [] : [
        {
          name: "Volvo Multi-Axle",
          operator: "RedBus",
          type: "AC Sleeper",
          duration: "10h",
          amenities: "WiFi, Charging, Reclining Seats",
          price: 1200
        },
        {
          name: "AC Seater",
          operator: "KSRTC",
          type: "AC Seater",
          duration: "8h 30m",
          amenities: "WiFi, Charging",
          price: 800
        },
        {
          name: "Sleeper Bus",
          operator: "Private Operator",
          type: "Non-AC Sleeper",
          duration: "12h",
          amenities: "Basic",
          price: 600
        }
      ]
    }
  }
}
