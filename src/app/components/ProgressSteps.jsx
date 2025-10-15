'use client'
import { Check } from 'lucide-react'

export default function ProgressSteps({ sections, currentSection }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-8">
        {sections.map((section, index) => {
          const isCompleted = section.number < currentSection
          const isActive = section.number === currentSection
          const Icon = section.icon

          return (
            <div key={section.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white shadow-lg' : ''}
                  ${isActive ? 'bg-blue-600 text-white shadow-xl scale-110' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                <span className={`
                  text-sm font-medium mt-2 transition-colors duration-300
                  ${isCompleted || isActive ? 'text-blue-600' : 'text-gray-500'}
                `}>
                  {section.title}
                </span>
              </div>
              {index < sections.length - 1 && (
                <div className={`
                  w-16 h-1 transition-colors duration-300
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}