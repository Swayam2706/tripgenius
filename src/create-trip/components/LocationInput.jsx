import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const LocationInput = ({ value, onChange }) => {
  const [place, setPlace] = useState(null)

  const handleChange = (val) => {
    setPlace(val)
    onChange(val)
  }

  return (
    <div className="mt-8 animate-fade-in-up animation-delay-150">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-[#2c3e50] flex items-center gap-2">
          <span className="text-2xl">📍</span>
          Where would you like to go?
        </h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange: handleChange,
            styles: {
              control: (provided) => ({
                ...provided,
                borderRadius: '0.75rem',
                borderColor: '#e5e7eb',
                padding: '0.5rem',
                '&:hover': {
                  borderColor: '#f39c12',
                }
              })
            }
          }}
        />
      </div>
    </div>
  )
}

export default LocationInput
