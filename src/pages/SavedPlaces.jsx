import React, { useState, useEffect } from 'react'
import { Bookmark, ArrowLeft, MapPin, Heart, Search, Filter, Grid, List, Plus, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useSavedPlaces } from '../hooks/useSavedPlaces'
import { useAuth } from '../context/AuthContext'

const SavedPlaces = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { savedPlaces, loading, savePlace, removeSavedPlace, toggleFavorite, searchPlaces, filterByCategory, getCategories, getStats } = useSavedPlaces()
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newPlace, setNewPlace] = useState({
    name: '',
    location: '',
    category: 'Landmark',
    description: '',
    rating: 5
  })

  // Filter places based on search and category
  const filteredPlaces = React.useMemo(() => {
    let places = savedPlaces

    if (searchTerm.trim()) {
      places = searchPlaces(searchTerm)
    }

    if (selectedCategory !== 'all') {
      places = filterByCategory(selectedCategory)
    }

    return places
  }, [savedPlaces, searchTerm, selectedCategory, searchPlaces, filterByCategory])

  const handleAddPlace = () => {
    if (newPlace.name && newPlace.location) {
      savePlace(newPlace)
      setNewPlace({
        name: '',
        location: '',
        category: 'Landmark',
        description: '',
        rating: 5
      })
      setShowAddModal(false)
    }
  }

  const categories = getCategories()
  const stats = getStats()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] flex items-center justify-center">
        <div className="text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to view your saved places</p>
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
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-md"
            >
              <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
            </Button>
            <div className="flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-[#f39c12]" />
              <h1 className="text-3xl font-bold text-[#2c3e50]">Saved Places</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[#f39c12] hover:bg-[#e67e22] text-white px-4 py-2 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Place
            </Button>
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
              {filteredPlaces.length} places
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.totalPlaces}</h3>
                <p className="text-gray-600">Total Places</p>
              </div>
              <Bookmark className="w-8 h-8 text-[#f39c12]/50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.favoritePlaces}</h3>
                <p className="text-gray-600">Favorites</p>
              </div>
              <Heart className="w-8 h-8 text-red-500/50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#2c3e50]">{stats.categories}</h3>
                <p className="text-gray-600">Categories</p>
              </div>
              <Filter className="w-8 h-8 text-blue-500/50" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid className="w-4 h-4 text-[#2c3e50]" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="w-4 h-4 text-[#2c3e50]" />
              </button>
            </div>
          </div>
        </div>

        {/* Saved Places Grid/List */}
        {filteredPlaces.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            {savedPlaces.length === 0 ? (
              <>
                <Sparkles className="w-16 h-16 text-[#f39c12]/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">No Saved Places Yet</h3>
                <p className="text-gray-600 mb-6">Start building your travel wishlist by adding places you want to visit!</p>
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#f39c12] hover:bg-[#e67e22] text-white px-6 py-3 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Place
                </Button>
              </>
            ) : (
              <>
                <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">No places found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                  }`}
              >
                {/* Image */}
                <div className={viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'}>
                  <div className="w-full h-full bg-gradient-to-br from-[#f39c12]/20 to-[#e67e22]/20 flex items-center justify-center relative">
                    <MapPin className="w-12 h-12 text-[#f39c12]/50" />
                    <button
                      onClick={() => toggleFavorite(place.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Heart
                        className={`w-4 h-4 ${place.isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                      />
                    </button>
                    <button
                      onClick={() => removeSavedPlace(place.id)}
                      className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow hover:bg-red-50"
                    >
                      <span className="text-red-500 text-sm">×</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#2c3e50] mb-1">{place.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{place.location}</p>
                    </div>
                    {place.isFavorite && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Favorite</span>
                    )}
                  </div>

                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{place.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium text-[#2c3e50]">{place.rating}</span>
                      </div>
                      <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] px-2 py-1 rounded-full">
                        {place.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Saved {place.savedDate}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-[#f39c12] hover:bg-[#e67e22] text-white text-sm">
                      View Details
                    </Button>
                    <Button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-[#2c3e50]">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Place Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-[#2c3e50] mb-6">Add New Place</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place Name</label>
                  <input
                    type="text"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    placeholder="e.g., Eiffel Tower"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newPlace.location}
                    onChange={(e) => setNewPlace({ ...newPlace, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    placeholder="e.g., Paris, France"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newPlace.category}
                    onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                  >
                    <option value="Landmark">Landmark</option>
                    <option value="Island">Island</option>
                    <option value="Historical Site">Historical Site</option>
                    <option value="Natural Wonder">Natural Wonder</option>
                    <option value="City">City</option>
                    <option value="Beach">Beach</option>
                    <option value="Museum">Museum</option>
                    <option value="Restaurant">Restaurant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newPlace.description}
                    onChange={(e) => setNewPlace({ ...newPlace, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
                    rows={3}
                    placeholder="Why do you want to visit this place?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewPlace({ ...newPlace, rating: star })}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= newPlace.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleAddPlace}
                  disabled={!newPlace.name || !newPlace.location}
                  className="flex-1 bg-[#f39c12] hover:bg-[#e67e22] text-white disabled:bg-gray-300"
                >
                  Add Place
                </Button>
                <Button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-[#2c3e50]"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPlaces
