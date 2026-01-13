import React, { useState, useEffect } from 'react'
import { Plane, Train, Bus, ExternalLink, MapPin, Clock, DollarSign, Loader2, AlertCircle } from 'lucide-react'
import { generateTravelOptions } from '../../../../service/TravelService'
import Button from '@/components/ui/button'

const TravelTab = ({ parsedData, trip }) => {
  const [travelOptions, setTravelOptions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTravelOptions = async () => {
      if (!parsedData?.destination && !trip?.destination) {
        setError('Destination not available')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // Get destination from user's input (from formData or parsedData)
        const destination = parsedData?.destination || trip?.destination || trip?.formData?.location?.label || trip?.formData?.location
        
        if (!destination) {
          setError('Destination not available')
          setLoading(false)
          return
        }

        console.log('Fetching travel options for destination:', destination)
        
        // Get origin if available from formData
        const origin = trip?.formData?.origin || parsedData?.origin || null
        
        const result = await generateTravelOptions(destination, origin)
        setTravelOptions(result.data)
      } catch (err) {
        console.error('Error fetching travel options:', err)
        setError('Failed to load travel options. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTravelOptions()
  }, [parsedData, trip])

  const getBookingUrl = (type, destination) => {
    const dest = encodeURIComponent(destination)
    
    switch (type.toLowerCase()) {
      case 'flight':
        return `https://www.makemytrip.com/flights/search?tripType=O&itinerary=${dest}&paxType=Adult-1&cabinClass=E`
      case 'train':
        return `https://www.irctc.co.in/nget/train-search?destination=${dest}`
      case 'bus':
        return `https://www.redbus.in/bus-tickets/${dest}`
      default:
        return `https://www.makemytrip.com/flights/search?tripType=O&itinerary=${dest}`
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#f39c12]/30 border-t-[#f39c12] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#e67e22] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-6 text-[#2c3e50] font-semibold">Finding the best travel options for you...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <AlertCircle className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">Unable to Load Travel Options</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-[#f39c12] hover:bg-[#e67e22] text-white">
          Try Again
        </Button>
      </div>
    )
  }

  if (!travelOptions || (!travelOptions.flights && !travelOptions.trains && !travelOptions.buses)) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
        <Plane className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">Travel Options</h3>
        <p className="text-gray-600 max-w-md mx-auto">Travel options will be available soon.</p>
      </div>
    )
  }

  const destination = parsedData?.destination || trip?.destination || 'Destination'

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2c3e50] via-[#34495e] to-[#1a252f] rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">How to Reach {destination}</h3>
            <p className="text-white/80">Choose the best travel option for your journey</p>
          </div>
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <MapPin className="w-8 h-8 text-[#f39c12]" />
          </div>
        </div>
      </div>

      {/* Flights Section */}
      {travelOptions.flights && travelOptions.flights.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Plane className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Flights</h4>
                <p className="text-white/90 text-sm">Fastest way to reach your destination</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {travelOptions.flights.map((flight, index) => (
              <div 
                key={index}
                className="group border-2 border-gray-200 rounded-xl p-5 hover:border-[#3498db] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#3498db]/10 rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-[#3498db]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg text-[#2c3e50]">{flight.airline || 'Flight'}</h5>
                        <p className="text-sm text-gray-600">{flight.route || 'Direct Flight'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {flight.duration && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-[#3498db]" />
                          <span>{flight.duration}</span>
                        </div>
                      )}
                      {flight.stops && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-[#3498db] font-medium">{flight.stops}</span>
                        </div>
                      )}
                      {flight.class && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>{flight.class}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#2c3e50]">
                        {flight.price ? `₹${flight.price.toLocaleString()}` : 'Price on request'}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    <Button
                      onClick={() => window.open(getBookingUrl('flight', destination), '_blank')}
                      className="bg-gradient-to-r from-[#3498db] to-[#2980b9] hover:from-[#2980b9] hover:to-[#3498db] text-white px-6 py-2.5 flex items-center gap-2"
                    >
                      Book Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trains Section */}
      {travelOptions.trains && travelOptions.trains.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#27ae60] to-[#229954] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Train className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Trains</h4>
                <p className="text-white/90 text-sm">Comfortable and scenic journey</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {travelOptions.trains.map((train, index) => (
              <div 
                key={index}
                className="group border-2 border-gray-200 rounded-xl p-5 hover:border-[#27ae60] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#27ae60]/10 rounded-lg flex items-center justify-center">
                        <Train className="w-6 h-6 text-[#27ae60]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg text-[#2c3e50]">{train.name || train.trainNumber || 'Train'}</h5>
                        <p className="text-sm text-gray-600">{train.route || 'Express Train'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {train.duration && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-[#27ae60]" />
                          <span>{train.duration}</span>
                        </div>
                      )}
                      {train.class && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-[#27ae60] font-medium">{train.class}</span>
                        </div>
                      )}
                      {train.availability && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>{train.availability}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#2c3e50]">
                        {train.price ? `₹${train.price.toLocaleString()}` : 'Price on request'}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    <Button
                      onClick={() => window.open(getBookingUrl('train', destination), '_blank')}
                      className="bg-gradient-to-r from-[#27ae60] to-[#229954] hover:from-[#229954] hover:to-[#27ae60] text-white px-6 py-2.5 flex items-center gap-2"
                    >
                      Book Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#27ae60] to-[#229954] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Train className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Trains</h4>
                <p className="text-white/90 text-sm">Not available for this destination</p>
              </div>
            </div>
          </div>
          <div className="p-8 text-center">
            <Train className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Train services are not available to this destination</p>
            <p className="text-gray-500 text-sm mt-2">Please consider flight options for international destinations</p>
          </div>
        </div>
      )}

      {/* Buses Section */}
      {travelOptions.buses && travelOptions.buses.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Buses</h4>
                <p className="text-white/90 text-sm">Economical travel option</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {travelOptions.buses.map((bus, index) => (
              <div 
                key={index}
                className="group border-2 border-gray-200 rounded-xl p-5 hover:border-[#f39c12] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#f39c12]/10 rounded-lg flex items-center justify-center">
                        <Bus className="w-6 h-6 text-[#f39c12]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-lg text-[#2c3e50]">{bus.name || bus.operator || 'Bus Service'}</h5>
                        <p className="text-sm text-gray-600">{bus.type || 'AC Sleeper'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      {bus.duration && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-[#f39c12]" />
                          <span>{bus.duration}</span>
                        </div>
                      )}
                      {bus.amenities && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span>{bus.amenities}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#2c3e50]">
                        {bus.price ? `₹${bus.price.toLocaleString()}` : 'Price on request'}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                    <Button
                      onClick={() => window.open(getBookingUrl('bus', destination), '_blank')}
                      className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] hover:from-[#e67e22] hover:to-[#f39c12] text-white px-6 py-2.5 flex items-center gap-2"
                    >
                      Book Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold">Buses</h4>
                <p className="text-white/90 text-sm">Not available for this destination</p>
              </div>
            </div>
          </div>
          <div className="p-8 text-center">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Bus services are not available to this destination</p>
            <p className="text-gray-500 text-sm mt-2">Please consider flight options for international destinations</p>
          </div>
        </div>
      )}

      {/* Alternative Booking Options */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h4 className="text-xl font-bold text-[#2c3e50] mb-4">Other Booking Platforms</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => window.open(`https://www.makemytrip.com/flights/search?tripType=O&itinerary=${encodeURIComponent(destination)}`, '_blank')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#f39c12] hover:shadow-md transition-all text-left group"
          >
            <div className="font-semibold text-[#2c3e50] group-hover:text-[#f39c12] transition-colors">MakeMyTrip</div>
            <div className="text-sm text-gray-600 mt-1">Flights, Hotels & More</div>
          </button>
          <button
            onClick={() => window.open(`https://www.irctc.co.in/nget/train-search?destination=${encodeURIComponent(destination)}`, '_blank')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#f39c12] hover:shadow-md transition-all text-left group"
          >
            <div className="font-semibold text-[#2c3e50] group-hover:text-[#f39c12] transition-colors">IRCTC</div>
            <div className="text-sm text-gray-600 mt-1">Train Bookings</div>
          </button>
          <button
            onClick={() => window.open(`https://www.redbus.in/bus-tickets/${encodeURIComponent(destination)}`, '_blank')}
            className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#f39c12] hover:shadow-md transition-all text-left group"
          >
            <div className="font-semibold text-[#2c3e50] group-hover:text-[#f39c12] transition-colors">RedBus</div>
            <div className="text-sm text-gray-600 mt-1">Bus Bookings</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TravelTab
