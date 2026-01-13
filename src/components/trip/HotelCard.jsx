import React, { useState, useEffect } from 'react'
import { getHotelImageUrls, getFallbackImageUrl } from '../../utils/imageUtils'
import { formatPrice } from '../../utils/currency'

const HotelCard = ({ hotel, destination }) => {
  const [images, setImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imagesLoading, setImagesLoading] = useState(true)

  useEffect(() => {
    // If hotel already has multiple images, use them
    if (hotel.images && Array.isArray(hotel.images) && hotel.images.length > 0) {
      setImages(hotel.images)
      setImagesLoading(false)
      return
    }

    // If hotel has a single image, convert to array
    if (hotel.imageUrl) {
      setImages([hotel.imageUrl])
      setImagesLoading(false)
      return
    }

    // Otherwise, fetch multiple images from Google
    const fetchImages = async () => {
      try {
        setImagesLoading(true)
        const hotelImages = await getHotelImageUrls(hotel.name, destination || hotel.address, 3)
        setImages(hotelImages)
      } catch (error) {
        console.error('Error fetching hotel images:', error)
        setImages([getFallbackImageUrl('hotel')])
      } finally {
        setImagesLoading(false)
      }
    }

    fetchImages()
  }, [hotel.name, hotel.images, hotel.imageUrl, destination, hotel.address])

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        {imagesLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
            <span className="text-gray-400 text-sm">Loading images...</span>
          </div>
        )}
        
        {images.length > 0 && (
          <>
            {/* Main Image */}
            <img 
              src={images[currentImageIndex]} 
              alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover ${imagesLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onError={(e) => {
                if (currentImageIndex === 0) {
                  // Only replace with fallback if this is the first image
                  const fallbackUrl = getFallbackImageUrl('hotel')
                  setImages([fallbackUrl])
                }
              }}
            />
            
            {/* Navigation Arrows - Only show if multiple images */}
            {images.length > 1 && !imagesLoading && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Image Indicators */}
            {images.length > 1 && !imagesLoading && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Image Counter */}
            {images.length > 1 && !imagesLoading && (
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-yellow-500 text-sm font-semibold">⭐ {hotel.rating?.toFixed(1) || '4.0'}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
          <span>📍</span>
          <span>{hotel.address}</span>
        </p>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities?.slice(0, 4).map((amenity, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities?.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(hotel.price, destination)}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default HotelCard

