// Unsplash API for multiple images
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const unsplashCache = new Map();

/**
 * Fetch multiple images from Unsplash
 * @param {string} query - Search query
 * @param {number} count - Number of images to fetch
 * @returns {Promise<Array>} - Array of image URLs
 */
export const fetchUnsplashImages = async (query, count = 3) => {
  const cacheKey = `${query}-${count}`;
  
  if (unsplashCache.has(cacheKey)) {
    return unsplashCache.get(cacheKey);
  }

  try {
    // Check if we have a real API key
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not found in VITE_UNSPLASH_ACCESS_KEY. Using demo images.');
      return getDemoImages(query, count);
    }

    console.log(`Fetching ${count} images from Unsplash for query: "${query}"`);
    
    // Use real Unsplash API
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${UNSPLASH_ACCESS_KEY}`);
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('Unsplash API key is invalid. Check your VITE_UNSPLASH_ACCESS_KEY in .env.local');
      } else if (response.status === 403) {
        console.error('Unsplash API rate limit exceeded. Using demo images.');
      } else {
        console.error(`Unsplash API error: ${response.status} ${response.statusText}`);
      }
      return getDemoImages(query, count);
    }
    
    const data = await response.json();
    console.log(`Unsplash API returned ${data.results?.length || 0} images`);
    
    if (!data.results || data.results.length === 0) {
      console.log('No images found on Unsplash, using demo images');
      return getDemoImages(query, count);
    }
    
    const images = data.results.map(photo => ({
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      description: photo.description || photo.alt_description || query,
      photographer: photo.user?.name || 'Unknown',
      photographerUrl: photo.user?.links?.html || '#'
    }));
    
    unsplashCache.set(cacheKey, images);
    return images;
    
  } catch (error) {
    console.error('Unsplash API error:', error);
    return getDemoImages(query, count);
  }
}

// Helper function for demo images
function getDemoImages(query, count = 3) {
    // Demo mode - use predefined high-quality travel images
    const demoQueries = {
        'default': [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop'
        ],
        'taj mahal': [
            'https://images.unsplash.com/photo-1524492442939-3bba5a2b2d1f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1548919175-b40008800b5b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        ],
        'fort': [
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
        ],
        'palace': [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1524492442939-3bba5a2b2d1f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1548919175-b40008800b5b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
        ],
        'temple': [
            'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1548919175-b40008800b5b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1524492442939-3bba5a2b2d1f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
        ]
    };

    // Get relevant images based on query
    let images = demoQueries.default;
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('taj')) {
        images = demoQueries['taj mahal'];
    } else if (lowerQuery.includes('fort')) {
        images = demoQueries['fort'];
    } else if (lowerQuery.includes('palace') || lowerQuery.includes('mahal')) {
        images = demoQueries['palace'];
    } else if (lowerQuery.includes('temple')) {
        images = demoQueries['temple'];
    }

    // Shuffle and take requested count
    const shuffled = images.sort(() => 0.5 - Math.random());
    const result = shuffled.slice(0, count);
    
    // Return in same format as real API
    return result.map(url => ({
        url,
        thumb: url,
        description: query,
        photographer: 'Demo',
        photographerUrl: '#'
    }));
}

/**
 * Get multiple images for a place
 * @param {string} placeName - Name of the place
 * @param {string} destination - Destination (for context)
 * @returns {Promise<Array>} - Array of image URLs
 */
export const getMultiplePlaceImages = async (placeName, destination) => {
  const queries = [
    `${placeName} ${destination}`,
    placeName,
    `${placeName} landmark`,
    `${placeName} tourism`
  ];
  
  const allImages = [];
  
  for (const query of queries) {
    try {
      const images = await fetchUnsplashImages(query, 2);
      allImages.push(...images);
    } catch (error) {
      console.warn(`Failed to fetch images for query: ${query}`, error);
    }
  }
  
  // Remove duplicates and return up to 4 images
  const uniqueImages = allImages.filter((img, index, arr) => 
    arr.findIndex(i => i.url === img.url) === index
  );
  
  return uniqueImages.slice(0, 4);
};
