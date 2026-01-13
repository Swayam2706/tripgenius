import React, { useState, useEffect } from 'react'
import { getPlaceImageUrl, getFallbackImageUrl } from '../../utils/imageUtils'
import { getMultiplePlaceImages } from '../../utils/unsplashImageUtils'
import { formatPrice } from '../../utils/currency'
import { ChevronLeft, ChevronRight, MapPin, Clock, DollarSign, Camera, Navigation, Heart, Share2 } from 'lucide-react'

const PlaceCard = ({ place, destination }) => {
  const [images, setImages] = useState([place.imageUrl || getFallbackImageUrl('place')])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImageLoading(true)
        
        // Start with fallback
        setImages([getFallbackImageUrl('place')])
        
        if (!destination || !place.name) {
          setImageLoading(false)
          return
        }
        
        console.log('Fetching images for:', place.name, 'in', destination)
        
        // Try Google API first
        const queries = [
          `${place.name} ${destination}`,
          `${place.name}`,
          `${place.name} landmark`,
          `${place.name} tourism`
        ]
        
        const googleImages = []
        
        // Try Google API first
        for (let i = 0; i < queries.length && googleImages.length < 3; i++) {
          try {
            const query = queries[i]
            console.log(`Trying Google API query ${i + 1}: ${query}`)
            
            const response = await fetch(`http://localhost:5000/api/images/search?query=${encodeURIComponent(query)}&type=place`)
            const data = await response.json()
            
            console.log(`Google API Response for "${query}":`, data)
            
            if (data.source === 'google' && data.imageUrl && !googleImages.includes(data.imageUrl)) {
              googleImages.push(data.imageUrl)
              console.log(`✓ Added Google image ${googleImages.length}: ${data.imageUrl}`)
              setImages([...googleImages])
            }
          } catch (error) {
            console.warn(`Google API query ${i + 1} failed:`, error.message)
          }
        }
        
        // If Google API didn't work, use Unsplash alternative
        if (googleImages.length === 0) {
          console.log('Google API failed, trying Unsplash alternative...')
          try {
            const unsplashImages = await getMultiplePlaceImages(place.name, destination)
            console.log(`✓ Got ${unsplashImages.length} images from Unsplash`)
            
            // Extract URLs from Unsplash image objects
            const imageUrls = unsplashImages.map(img => img.url)
            setImages(imageUrls)
          } catch (error) {
            console.warn('Unsplash alternative failed:', error)
            // Keep fallback image
          }
        } else {
          console.log(`✓ Successfully got ${googleImages.length} Google images`)
        }
        
      } catch (error) {
        console.error('Error fetching images:', error)
        setImages([getFallbackImageUrl('place')])
      } finally {
        setImageLoading(false)
      }
    }
    
    fetchImages()
  }, [place.name, destination])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 group transform hover:scale-[1.02] animate-fade-in-up">
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {imageLoading ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex flex-col items-center justify-center">
            <Camera className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm font-medium">Loading amazing views...</span>
          </div>
        ) : (
          <>
            {/* Main Image */}
            <div className="relative h-full">
              <img 
                src={images[currentImageIndex]} 
                alt={`${place.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  if (currentImageIndex === 0) {
                    e.target.src = getFallbackImageUrl('place')
                  }
                }}
              />
              
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
              
              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                aria-label="Like place"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              
              {/* Best Time Badge */}
              {place.bestTimeToVisit && (
                <div className="absolute bottom-3 left-3 bg-[#f39c12] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  🕐 {place.bestTimeToVisit}
                </div>
              )}
            </div>
            
            {/* Image Dots Indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-[#2c3e50] mb-1 group-hover:text-[#f39c12] transition-colors duration-300">
              {place.name}
            </h4>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">{place.details}</p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium border border-blue-200">
            <Clock className="w-3 h-3" />
            {place.duration}
          </span>
          {place.ticketPrice > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-200">
              <DollarSign className="w-3 h-3" />
              {formatPrice(place.ticketPrice, destination)}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium border border-purple-200">
            <Camera className="w-3 h-3" />
            {images.length} Photos
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {place.coordinates ? (
            <button 
              className="flex items-center gap-2 text-[#2c3e50] hover:text-[#f39c12] font-medium text-sm transition-colors duration-200 group"
              onClick={() => {
                const url = `https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`
                window.open(url, '_blank')
              }}
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>View on Map</span>
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1" />
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-[#f39c12] hover:bg-[#f39c12]/10 rounded-lg transition-all duration-200">
              <Navigation className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#f39c12] hover:bg-[#f39c12]/10 rounded-lg transition-all duration-200">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceCard

