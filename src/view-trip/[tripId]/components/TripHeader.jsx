import React from 'react'
import { ArrowLeft, Download, Share2, Heart, Globe, Compass, Calendar, Users, DollarSign, MapPin, Hotel, Utensils, Zap, Award } from 'lucide-react'
import Button from '@/components/ui/Button'

const TripHeader = ({
  trip,
  parsedData,
  isLiked,
  setIsLiked,
  showShareModal,
  setShowShareModal,
  navigate
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#1a252f]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f39c12' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f39c12]/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl animate-float animation-delay-300"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#27ae60]/10 rounded-full blur-3xl animate-float animation-delay-200"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <Button
            onClick={() => navigate(-1)}
            className="group bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setIsLiked(!isLiked)}
              className={`group backdrop-blur-md flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 border ${isLiked
                  ? 'bg-[#f39c12]/20 text-[#f39c12] border-[#f39c12]/50 hover:bg-[#f39c12]/30'
                  : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                }`}
            >
              <Heart className={`w-5 h-5 transition-all ${isLiked ? 'fill-current scale-110' : ''}`} />
              <span className="font-medium">{isLiked ? 'Saved' : 'Save'}</span>
            </Button>

            <Button
              onClick={() => setShowShareModal(true)}
              className="group bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Share</span>
            </Button>

            <Button className="group bg-gradient-to-r from-[#f39c12] to-[#e67e22] hover:from-[#e67e22] hover:to-[#f39c12] text-white flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center animate-fade-in-up">
          {/* Destination Icon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Globe className="w-8 h-8 text-[#f39c12]" />
            </div>
            <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse"></div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Compass className="w-8 h-8 text-[#f39c12]" />
            </div>
          </div>

          {/* Destination Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {parsedData.destination || trip.destination}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Your personalized <span className="font-semibold text-[#f39c12]">{parsedData.duration || trip.duration}-day</span> adventure for <span className="font-semibold text-[#f39c12]">{parsedData.travelers || trip.travelers} travelers</span>
          </p>

          {/* Trip Info Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default">
              <Calendar className="w-5 h-5 text-[#f39c12] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">{parsedData.duration || trip.duration} days</span>
            </div>
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default">
              <Users className="w-5 h-5 text-[#f39c12] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">{parsedData.travelers || trip.travelers} travelers</span>
            </div>
            <div className="group flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default">
              <DollarSign className="w-5 h-5 text-[#f39c12] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">{parsedData.budget || trip.budget} budget</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: MapPin, label: 'Days Planned', value: parsedData.itinerary?.length || 0, color: 'from-[#f39c12] to-[#e67e22]' },
              { icon: Hotel, label: 'Hotels', value: parsedData.hotels?.length || 0, color: 'from-[#3498db] to-[#2980b9]' },
              { icon: Utensils, label: 'Food Spots', value: parsedData.foodRecommendations?.length || 0, color: 'from-[#27ae60] to-[#229954]' },
              { icon: Zap, label: 'Pro Tips', value: parsedData.tips?.length || 0, color: 'from-[#9b59b6] to-[#8e44ad]' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-default"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripHeader
