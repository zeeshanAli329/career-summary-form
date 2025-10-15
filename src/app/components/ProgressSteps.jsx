'use client'
import { Check } from 'lucide-react'

export default function ProgressSteps({ sections, currentSection }) {
  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <div className="flex items-center justify-between w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2 sm:px-4">
        {sections.map((section, index) => {
          const isCompleted = section.number < currentSection
          const isActive = section.number === currentSection
          const Icon = section.icon

          return (
            <div key={section.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <div className={`
                  w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-green-500 text-white shadow-lg' : ''}
                  ${isActive ? 'bg-blue-600 text-white shadow-xl scale-110' : ''}
                  ${!isCompleted && !isActive ? 'bg-gray-200 text-gray-500' : ''}
                `}>
                  {isCompleted ? (
                    <Check size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  ) : (
                    <Icon size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  )}
                </div>
                <span className={`
                  text-xs font-medium mt-1 transition-colors duration-300 text-center
                  ${isCompleted || isActive ? 'text-blue-600' : 'text-gray-500'}
                  hidden sm:block
                `}>
                  {section.title}
                </span>
                <span className={`
                  text-[10px] font-medium mt-1 transition-colors duration-300 text-center
                  ${isCompleted || isActive ? 'text-blue-600' : 'text-gray-500'}
                  block sm:hidden
                `}>
                  Step {section.number}
                </span>
              </div>
              {index < sections.length - 1 && (
                <div className={`
                  flex-1 h-1 transition-colors duration-300 mx-1
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