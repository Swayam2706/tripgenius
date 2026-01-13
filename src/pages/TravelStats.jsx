import React from 'react'
import { TrendingUp, ArrowLeft, MapPin, Globe, Clock, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

const TravelStats = () => {
  const navigate = useNavigate()

  const stats = [
    {
      icon: MapPin,
      label: 'Total Destinations',
      value: '47',
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      label: 'Countries Visited',
      value: '18',
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Clock,
      label: 'Travel Days',
      value: '156',
      change: '+24%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: '$12,450',
      change: '+18%',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const recentActivity = [
    { destination: 'Paris, France', date: '2024-06-15', type: 'International' },
    { destination: 'New York, USA', date: '2024-04-10', type: 'Domestic' },
    { destination: 'Tokyo, Japan', date: '2024-02-05', type: 'International' },
    { destination: 'London, UK', date: '2023-12-20', type: 'International' }
  ]

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
            <TrendingUp className="w-8 h-8 text-[#f39c12]" />
            <h1 className="text-3xl font-bold text-[#2c3e50]">Travel Statistics</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <div className="flex items-center gap-1">
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                <span className="text-gray-500 text-xs">vs last year</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#2c3e50] mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#f39c12]" />
                    <div>
                      <p className="font-medium text-[#2c3e50]">{activity.destination}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </div>
                  <span className="text-sm bg-[#f39c12]/20 text-[#f39c12] px-2 py-1 rounded-full">
                    {activity.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#2c3e50] mb-4">Travel Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Visit 25 Countries</span>
                  <span className="text-sm text-gray-600">18/25</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">50 Destinations</span>
                  <span className="text-sm text-gray-600">47/50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#3498db] to-[#2980b9] h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">200 Travel Days</span>
                  <span className="text-sm text-gray-600">156/200</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelStats
