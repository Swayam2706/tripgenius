import React from "react"

export default function Button({ children, className = "", disabled, ...props }) {
  return (
    <button
      className={`
        relative
        px-6 py-3 
        bg-[#2c3e50] 
        text-white 
        font-semibold
        rounded-xl 
        hover:bg-[#f39c12] 
        hover:text-[#2c3e50]
        transition-all
        duration-300
        shadow-lg
        hover:shadow-xl
        transform
        hover:scale-105
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:bg-[#2c3e50]
        disabled:hover:text-white
        overflow-hidden
        group
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {/* Ripple effect background */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Shine effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
    </button>
  )
}
