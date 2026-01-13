import React from 'react'
import { Lightbulb, CheckCircle, Phone, Navigation, Wifi } from 'lucide-react'

const TipsTab = ({ parsedData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Travel Wisdom</h3>
            <p className="text-white/80">Expert tips for an unforgettable journey</p>
          </div>
          <Lightbulb className="w-12 h-12 text-[#f39c12]" />
        </div>
      </div>

      {parsedData.tips && parsedData.tips.length > 0 ? (
        <div className="grid gap-6">
          {parsedData.tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#f39c12] to-[#e67e22] text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-lg">{tip}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Pro Tip
                    </span>
                    <span>•</span>
                    <span>Essential for your trip</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <Lightbulb className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">Travel Tips</h3>
          <p className="text-gray-600 max-w-md mx-auto">Helpful tips and recommendations will appear here once available.</p>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h4 className="text-xl font-bold text-[#2c3e50] mb-6">Additional Resources</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
            <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h5 className="font-semibold text-blue-800 mb-2">Emergency</h5>
            <p className="text-blue-700 text-sm">Important contacts</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
            <Navigation className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h5 className="font-semibold text-green-800 mb-2">Maps</h5>
            <p className="text-green-700 text-sm">Offline navigation</p>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200 hover:bg-orange-100 transition-colors cursor-pointer">
            <Wifi className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h5 className="font-semibold text-orange-800 mb-2">Connectivity</h5>
            <p className="text-orange-700 text-sm">WiFi & SIM cards</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipsTab
