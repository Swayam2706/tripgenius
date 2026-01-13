import React, { useState, useEffect } from 'react'
import { History, ArrowLeft, MapPin, Calendar, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useTripHistory } from '../hooks/useTripHistory'
import { useAuth } from '../context/AuthContext'

const TripHistory = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { tripHistory, loading, removeTripFromHistory, updateTripStatus, searchTrips, filterByStatus, getStats } = useTripHistory()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Filter trips based on search and status
  const filteredTrips = React.useMemo(() => {
    let trips = tripHistory

    if (searchTerm.trim()) {
      trips = searchTrips(searchTerm)
    }

    if (selectedStatus !== 'all') {
      trips = filterByStatus(selectedStatus)
    }

    return trips
  }, [tripHistory, searchTerm, selectedStatus, searchTrips, filterByStatus])

  const stats = getStats()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] flex items-center justify-center">
        <div className="text-center">
          <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your trip history</p>
          <Button onClick={() => navigate('/')} className="bg-[#f39c12] hover:bg-[#e67e22] text-white">
            Go to Home
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f39c12]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8]">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
          </Button>
          <div className="flex items-center gap-3">
            <History className="w-8 h-8 text-[#f39c12]" />
            <h1 className="text-3xl font-bold text-[#2c3e50]">Trip History</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-[#f39c12]/10 to-[#e67e22]/10 rounded-lg p-4">
              <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.totalTrips}</h3>
              <p className="text-gray-600">Total Trips</p>
            </div>
            <div className="bg-gradient-to-r from-[#3498db]/10 to-[#2980b9]/10 rounded-lg p-4">
              <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.countriesVisited}</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="bg-gradient-to-r from-[#2ecc71]/10 to-[#27ae60]/10 rounded-lg p-4">
              <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.citiesVisited}</h3>
              <p className="text-gray-600">Cities</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Trips List */}
        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            {tripHistory.length === 0 ? (
              <>
                <History className="w-16 h-16 text-[#f39c12]/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">No Trips Yet</h3>
                <p className="text-gray-600">Your trip history will appear here once you start planning adventures!</p>
              </>
            ) : (
              <>
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">No trips found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-[#f39c12]/20 to-[#e67e22]/20 flex items-center justify-center relative">
                  <MapPin className="w-16 h-16 text-[#f39c12]/50" />
                  <button
                    onClick={() => removeTripFromHistory(trip.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:bg-red-50"
                  >
                    <span className="text-red-500 text-sm">×</span>
                  </button>
                  <span className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full ${trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {trip.status}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{trip.title || trip.destination}</h3>
                  <p className="text-gray-600 mb-3">{trip.destination}</p>
                  {trip.startDate && trip.endDate && (
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {trip.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{trip.description}</p>
                  )}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#f39c12] hover:bg-[#e67e22] text-white text-sm">
                      View Details
                    </Button>
                    <select
                      value={trip.status}
                      onChange={(e) => updateTripStatus(trip.id, e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TripHistory
