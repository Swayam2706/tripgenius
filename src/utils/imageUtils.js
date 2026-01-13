// Utility function to fetch Google images for hotels, places, and destinations

// Image cache to avoid redundant API calls
const imageCache = new Map();

// API base URL - adjust if your backend runs on a different port
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Fetch image from Google via backend API
 * @param {string} query - Search query (e.g., hotel name, place name)
 * @param {string} type - Type of image: 'place', 'hotel', or 'destination'
 * @returns {Promise<string>} - Image URL
 */
const fetchGoogleImage = async (query, type = 'place') => {
  // Check cache first
  const cacheKey = `${query}-${type}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/images/search?query=${encodeURIComponent(query)}&type=${type}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    const imageUrl = data.imageUrl || getFallbackImageUrl(type);

    // Cache the result
    imageCache.set(cacheKey, imageUrl);

    return imageUrl;
  } catch (error) {
    console.warn(`Failed to fetch Google image for "${query}":`, error.message);
    // Return fallback image
    const fallbackUrl = getFallbackImageUrl(type);
    imageCache.set(cacheKey, fallbackUrl);
    return fallbackUrl;
  }
};

/**
 * Get place image URL from Google
 * @param {string} placeName - Name of the place
 * @param {string} destination - Destination city/location
 * @returns {Promise<string>} - Image URL
 */
export const getPlaceImageUrl = async (placeName, destination) => {
  const query = `${placeName} ${destination}`;
  return await fetchGoogleImage(query, 'place');
};

/**
 * Get hotel image URL from Google
 * @param {string} hotelName - Name of the hotel
 * @param {string} location - Location/city
 * @returns {Promise<string>} - Image URL
 */
export const getHotelImageUrl = async (hotelName, location) => {
  const query = `${hotelName} ${location}`;
  return await fetchGoogleImage(query, 'hotel');
};

/**
 * Get multiple hotel image URLs from Google
 * @param {string} hotelName - Name of the hotel
 * @param {string} location - Location/city
 * @param {number} count - Number of images to fetch (default: 3)
 * @returns {Promise<string[]>} - Array of image URLs
 */
export const getHotelImageUrls = async (hotelName, location, count = 3) => {
  const query = `${hotelName} ${location}`;
  const imageUrls = [];

  // Check cache first
  const cacheKey = `${query}-hotel-multiple-${count}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    // Fetch multiple images with different search variations
    const searchQueries = [
      `${query} hotel`,
      `${query} hotel exterior`,
      `${query} hotel room`,
      `${query} hotel lobby`,
      `${query} accommodation`
    ];

    for (let i = 0; i < Math.min(count, searchQueries.length); i++) {
      try {
        const imageUrl = await fetchGoogleImage(searchQueries[i], 'hotel');
        if (imageUrl && !imageUrls.includes(imageUrl)) {
          imageUrls.push(imageUrl);
        }
      } catch (error) {
        console.warn(`Failed to fetch image ${i + 1} for "${hotelName}":`, error.message);
      }
    }

    // If we couldn't fetch enough images, add fallback images
    while (imageUrls.length < count) {
      const fallbackUrl = getFallbackImageUrl('hotel');
      if (!imageUrls.includes(fallbackUrl)) {
        imageUrls.push(fallbackUrl);
      } else {
        break;
      }
    }

    // Cache the result
    imageCache.set(cacheKey, imageUrls);
    return imageUrls;
  } catch (error) {
    console.warn(`Failed to fetch multiple hotel images for "${hotelName}":`, error.message);
    // Return fallback images
    const fallbackUrls = Array(count).fill(getFallbackImageUrl('hotel'));
    imageCache.set(cacheKey, fallbackUrls);
    return fallbackUrls;
  }
};

/**
 * Get destination image URL from Google
 * @param {string} destination - Destination name
 * @returns {Promise<string>} - Image URL
 */
export const getDestinationImageUrl = async (destination) => {
  return await fetchGoogleImage(destination, 'destination');
};

/**
 * Synchronous version for backward compatibility (returns a placeholder that will be replaced)
 * These are kept for components that might use them synchronously
 */
export const getPlaceImageUrlSync = (placeName, destination) => {
  const cacheKey = `${placeName}-${destination}-place`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }
  // Return a placeholder that will trigger async fetch
  return getFallbackImageUrl('place');
};

export const getHotelImageUrlSync = (hotelName, location) => {
  const cacheKey = `${hotelName}-${location}-hotel`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }
  return getFallbackImageUrl('hotel');
};

/**
 * Fallback to a generic travel image if the above fails
 */
export const getFallbackImageUrl = (type = 'place') => {
  const images = {
    place: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    destination: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop'
  };
  return images[type] || images.place;
};
