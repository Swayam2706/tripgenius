import React from 'react'
import { DollarSign, Ticket, Utensils, Hotel, ShoppingBag, TrendingUp, Lightbulb, CheckCircle } from 'lucide-react'
import { formatPrice } from '../../../../utils/currency'

const BudgetTab = ({ parsedData }) => {
  return (
    <div className="space-y-8">
      {parsedData.budgetBreakdown ? (
        <>
          <div className="bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold">Budget Analysis</h3>
              <TrendingUp className="w-10 h-10 text-[#f39c12]" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 text-[#f39c12]">Expense Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-[#f39c12]" />
                      Entry Fees
                    </span>
                    <span className="font-bold">{formatPrice(parsedData.budgetBreakdown.entryFees || 0, parsedData.destination)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#f39c12]" />
                      Food & Dining
                    </span>
                    <span className="font-bold">{formatPrice(parsedData.budgetBreakdown.food || 0, parsedData.destination)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-[#f39c12]" />
                      Accommodation
                    </span>
                    <span className="font-bold">{formatPrice(parsedData.budgetBreakdown.accommodation || 0, parsedData.destination)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#f39c12]" />
                      Shopping
                    </span>
                    <span className="font-bold">{formatPrice(parsedData.budgetBreakdown.shopping || 0, parsedData.destination)}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-[#f39c12]/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#f39c12]/30">
                  <DollarSign className="w-16 h-16 text-[#f39c12]" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{formatPrice(parsedData.budgetBreakdown.total || 0, parsedData.destination)}</div>
                <div className="text-[#f39c12] font-semibold">Total Budget</div>
              </div>
            </div>
          </div>

          {/* Budget Tips */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h4 className="text-xl font-bold text-[#2c3e50] mb-6 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-[#f39c12]" />
              Money-Saving Tips
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h5 className="font-semibold text-green-800 mb-1">Book in Advance</h5>
                  <p className="text-green-700 text-sm">Save up to 20% on hotels and flights</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h5 className="font-semibold text-blue-800 mb-1">Travel Off-Season</h5>
                  <p className="text-blue-700 text-sm">Better prices and fewer crowds</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <h5 className="font-semibold text-orange-800 mb-1">Local Dining</h5>
                  <p className="text-orange-700 text-sm">Try street food and local restaurants</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <h5 className="font-semibold text-purple-800 mb-1">Public Transport</h5>
                  <p className="text-purple-700 text-sm">Save on travel costs within cities</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <DollarSign className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">Budget Analysis</h3>
          <p className="text-gray-600 max-w-md mx-auto">Detailed budget breakdown will appear here once available.</p>
        </div>
      )}
    </div>
  )
}

export default BudgetTab
