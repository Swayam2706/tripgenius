import React from 'react'
import { MapPin, Calendar, Users, DollarSign, CheckCircle, Award, Camera, Navigation, Phone, ChevronRight } from 'lucide-react'

const OverviewTab = ({ trip, parsedData }) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Trip Summary Card - Redesigned */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#1a252f] rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f39c12]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#3498db]/10 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Award className="w-8 h-8 text-[#f39c12]" />
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold">Trip Overview</h3>
                <p className="text-white/70 mt-1">Your complete travel guide</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Adventure Details */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-[#f39c12] flex items-center gap-2">
                <div className="w-1 h-6 bg-[#f39c12] rounded-full"></div>
                Adventure Details
              </h4>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: 'Destination', value: parsedData.destination || trip.destination },
                  { icon: Calendar, label: 'Duration', value: `${parsedData.duration || trip.duration} days` },
                  { icon: Users, label: 'Travelers', value: `${parsedData.travelers || trip.travelers} travelers` },
                  { icon: DollarSign, label: 'Budget', value: parsedData.budget || trip.budget }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="p-3 bg-[#f39c12]/20 rounded-xl group-hover:bg-[#f39c12]/30 transition-colors">
                      <item.icon className="w-5 h-5 text-[#f39c12]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white/60 mb-1">{item.label}</div>
                      <div className="text-lg font-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* What's Included */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-[#f39c12] flex items-center gap-2">
                <div className="w-1 h-6 bg-[#f39c12] rounded-full"></div>
                What's Included
              </h4>
              <div className="space-y-3">
                {[
                  'Personalized itinerary',
                  'Hotel recommendations',
                  'Food suggestions',
                  'Budget breakdown',
                  'Travel tips & insights'
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-white/90 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Enhanced */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            icon: Camera, 
            title: 'Photo Memories', 
            desc: 'Capture and organize your travel photos',
            color: 'from-[#f39c12] to-[#e67e22]',
            bgColor: 'bg-[#f39c12]/10'
          },
          { 
            icon: Navigation, 
            title: 'Offline Maps', 
            desc: 'Download maps for offline navigation',
            color: 'from-[#3498db] to-[#2980b9]',
            bgColor: 'bg-[#3498db]/10'
          },
          { 
            icon: Phone, 
            title: 'Emergency Contacts', 
            desc: 'Important contacts for your destination',
            color: 'from-[#27ae60] to-[#229954]',
            bgColor: 'bg-[#27ae60]/10'
          }
        ].map((action, index) => (
          <div 
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            
            <div className={`relative w-14 h-14 ${action.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <action.icon className={`w-7 h-7 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`} />
            </div>
            
            <h4 className="text-xl font-bold text-[#2c3e50] mb-2 group-hover:text-[#f39c12] transition-colors">
              {action.title}
            </h4>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">{action.desc}</p>
            
            <button className="group/btn text-[#f39c12] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300">
              <span>Explore</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverviewTab
