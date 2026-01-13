// Get approximate coordinates for destinations

export const getDestinationCoordinates = (destination) => {
  const destinationLower = destination?.toLowerCase() || 'pune'
  
  const coordinates = {
    // India
    'pune': { lat: 18.5204, lng: 73.8567 },
    'mahabaleshwar': { lat: 17.9244, lng: 73.6568 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'goa': { lat: 15.2993, lng: 74.1240 },
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'kolkata': { lat: 22.5726, lng: 88.3639 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'jaipur': { lat: 26.9124, lng: 75.7873 },
    'udaipur': { lat: 24.5854, lng: 73.7125 },
    'shimla': { lat: 31.1048, lng: 77.1734 },
    'manali': { lat: 32.2432, lng: 77.1892 },
    'ooty': { lat: 11.4102, lng: 76.6950 },
    'kodaikanal': { lat: 10.2381, lng: 77.4892 },
    
    // Europe
    'paris': { lat: 48.8566, lng: 2.3522 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'rome': { lat: 41.9028, lng: 12.4964 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'amsterdam': { lat: 52.3676, lng: 4.9041 },
    'berlin': { lat: 52.5200, lng: 13.4050 },
    'vienna': { lat: 48.2082, lng: 16.3738 },
    'prague': { lat: 50.0755, lng: 14.4378 },
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'lisbon': { lat: 38.7223, lng: -9.1393 },
    'athens': { lat: 37.9838, lng: 23.7275 },
    'dublin': { lat: 53.3498, lng: -6.2603 },
    'edinburgh': { lat: 55.9533, lng: -3.1883 },
    'brussels': { lat: 50.8503, lng: 4.3517 },
    'zurich': { lat: 47.3769, lng: 8.5417 },
    'milan': { lat: 45.4642, lng: 9.1900 },
    'venice': { lat: 45.4408, lng: 12.3155 },
    'florence': { lat: 43.7696, lng: 11.2558 },
    'istanbul': { lat: 41.0082, lng: 28.9784 },
    
    // Asia
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'singapore': { lat: 1.3521, lng: 103.8198 },
    'bangkok': { lat: 13.7563, lng: 100.5018 },
    'dubai': { lat: 25.2048, lng: 55.2708 },
    'hong kong': { lat: 22.3193, lng: 114.1694 },
    'seoul': { lat: 37.5665, lng: 126.9780 },
    'beijing': { lat: 39.9042, lng: 116.4074 },
    'shanghai': { lat: 31.2304, lng: 121.4737 },
    'kuala lumpur': { lat: 3.1390, lng: 101.6869 },
    'jakarta': { lat: -6.2088, lng: 106.8456 },
    'manila': { lat: 14.5995, lng: 120.9842 },
    'ho chi minh city': { lat: 10.8231, lng: 106.6297 },
    'hanoi': { lat: 21.0285, lng: 105.8542 },
    'taipei': { lat: 25.0330, lng: 121.5654 },
    'osaka': { lat: 34.6937, lng: 135.5023 },
    'kyoto': { lat: 35.0116, lng: 135.7681 },
    
    // Americas
    'new york': { lat: 40.7128, lng: -74.0060 },
    'los angeles': { lat: 34.0522, lng: -118.2437 },
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'chicago': { lat: 41.8781, lng: -87.6298 },
    'miami': { lat: 25.7617, lng: -80.1918 },
    'las vegas': { lat: 36.1699, lng: -115.1398 },
    'toronto': { lat: 43.6532, lng: -79.3832 },
    'vancouver': { lat: 49.2827, lng: -123.1207 },
    'montreal': { lat: 45.5017, lng: -73.5673 },
    'mexico city': { lat: 19.4326, lng: -99.1332 },
    'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
    'sao paulo': { lat: -23.5505, lng: -46.6333 },
    'buenos aires': { lat: -34.6037, lng: -58.3816 },
    'lima': { lat: -12.0464, lng: -77.0428 },
    'bogota': { lat: 4.7110, lng: -74.0721 },
    
    // Oceania
    'sydney': { lat: -33.8688, lng: 151.2093 },
    'melbourne': { lat: -37.8136, lng: 144.9631 },
    'brisbane': { lat: -27.4698, lng: 153.0251 },
    'perth': { lat: -31.9505, lng: 115.8605 },
    'adelaide': { lat: -34.9285, lng: 138.6007 },
    'auckland': { lat: -36.8485, lng: 174.7633 },
    'wellington': { lat: -41.2865, lng: 174.7762 },
    'queenstown': { lat: -45.0312, lng: 168.6626 },
    'christchurch': { lat: -43.5321, lng: 172.6362 },
    'new zealand': { lat: -41.2865, lng: 174.7762 },
    
    // Africa
    'cairo': { lat: 30.0444, lng: 31.2357 },
    'cape town': { lat: -33.9249, lng: 18.4241 },
    'johannesburg': { lat: -26.2041, lng: 28.0473 },
    'marrakech': { lat: 31.6295, lng: -7.9811 },
    'casablanca': { lat: 33.5731, lng: -7.5898 },
    'nairobi': { lat: -1.2921, lng: 36.8219 },
    'lagos': { lat: 6.5244, lng: 3.3792 },
    'accra': { lat: 5.6037, lng: -0.1870 },
    
    // Middle East
    'doha': { lat: 25.2854, lng: 51.5310 },
    'abu dhabi': { lat: 24.4539, lng: 54.3773 },
    'riyadh': { lat: 24.7136, lng: 46.6753 },
    'tel aviv': { lat: 32.0853, lng: 34.7818 },
    'jerusalem': { lat: 31.7683, lng: 35.2137 },
    'beirut': { lat: 33.8938, lng: 35.5018 },
    
    // Additional popular destinations
    'bali': { lat: -8.3405, lng: 115.0920 },
    'phuket': { lat: 7.8804, lng: 98.3923 },
    'santorini': { lat: 36.3932, lng: 25.4615 },
    'mykonos': { lat: 37.4467, lng: 25.3289 },
    'maldives': { lat: 3.2028, lng: 73.2207 },
    'mauritius': { lat: -20.3484, lng: 57.5522 },
    'seychelles': { lat: -4.6796, lng: 55.4920 }
  }
  
  // Try exact match first
  if (coordinates[destinationLower]) {
    return coordinates[destinationLower]
  }
  
  // Try partial match
  for (const [key, coords] of Object.entries(coordinates)) {
    if (destinationLower.includes(key) || key.includes(destinationLower)) {
      return coords
    }
  }
  
  // Country-level fallbacks
  if (destinationLower.includes('france') || destinationLower.includes('paris')) {
    return coordinates['paris']
  }
  if (destinationLower.includes('uk') || destinationLower.includes('united kingdom') || destinationLower.includes('england')) {
    return coordinates['london']
  }
  if (destinationLower.includes('italy') || destinationLower.includes('rome')) {
    return coordinates['rome']
  }
  if (destinationLower.includes('spain') || destinationLower.includes('barcelona')) {
    return coordinates['barcelona']
  }
  if (destinationLower.includes('japan') || destinationLower.includes('tokyo')) {
    return coordinates['tokyo']
  }
  if (destinationLower.includes('china') || destinationLower.includes('beijing')) {
    return coordinates['beijing']
  }
  if (destinationLower.includes('australia') || destinationLower.includes('sydney')) {
    return coordinates['sydney']
  }
  if (destinationLower.includes('zealand') || destinationLower.includes('new zealand')) {
    return coordinates['new zealand']
  }
  if (destinationLower.includes('usa') || destinationLower.includes('united states') || destinationLower.includes('america')) {
    return coordinates['new york']
  }
  if (destinationLower.includes('canada') || destinationLower.includes('toronto')) {
    return coordinates['toronto']
  }
  if (destinationLower.includes('thailand') || destinationLower.includes('bangkok')) {
    return coordinates['bangkok']
  }
  if (destinationLower.includes('uae') || destinationLower.includes('united arab emirates') || destinationLower.includes('dubai')) {
    return coordinates['dubai']
  }
  if (destinationLower.includes('egypt') || destinationLower.includes('cairo')) {
    return coordinates['cairo']
  }
  if (destinationLower.includes('south africa') || destinationLower.includes('cape town')) {
    return coordinates['cape town']
  }
  if (destinationLower.includes('turkey') || destinationLower.includes('istanbul')) {
    return coordinates['istanbul']
  }
  
  // Default to a generic location (can be improved with geocoding API)
  // Return coordinates near the equator/prime meridian as a neutral fallback
  return { lat: 0, lng: 0 }
}
