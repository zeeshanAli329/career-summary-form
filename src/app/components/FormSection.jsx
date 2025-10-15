'use client'

export default function FormSection({ isActive, children }) {
  return (
    <div className={`
      transition-all duration-500 ease-in-out
      ${isActive 
        ? 'block animate-fade-in-up' 
        : 'hidden'
      }
    `}>
      {children}
    </div>
  )
}