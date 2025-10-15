'use client'
import { useState } from 'react'
import { 
  User, Briefcase, FileUp, ArrowRight, ArrowLeft, 
  Send, Loader, Phone, Mail, GraduationCap, Target,
  Folder, TrendingUp, Wrench, FileText
} from 'lucide-react'
import ProgressSteps from './ProgressSteps'
import FormSection from './FormSection'
import FileUpload from './FileUpload'

export default function CareerForm() {
  const [currentSection, setCurrentSection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const sections = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Professional', icon: Briefcase },
    { number: 3, title: 'Upload CV', icon: FileUp }
  ]

  const showSection = (sectionNumber) => {
    setCurrentSection(sectionNumber)
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: data.message })
        // Reset form
        document.getElementById('career-form').reset()
        setCurrentSection(1)
      } else {
        setMessage({ type: 'error', text: data.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-700">S.</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 sm:mt-0">Savacy Technologies</h1>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3 sm:mb-4">Join Our Innovative Team</h2>
          <p className="text-sm sm:text-base md:text-xl text-white/90 px-2">Submit your CV and help us shape the future of technology</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-8 backdrop-blur-sm bg-opacity-95 mx-2">
          <ProgressSteps 
            sections={sections} 
            currentSection={currentSection} 
          />

          <form id="career-form" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(new FormData(e.target))
          }}>
            <FormSection isActive={currentSection === 1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <User size={14} className="sm:w-4 sm:h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Mail size={14} className="sm:w-4 sm:h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={14} className="sm:w-4 sm:h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <GraduationCap size={14} className="sm:w-4 sm:h-4" />
                    Education Level
                  </label>
                  <select name="education" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base">
                    <option value="">Select Education</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => showSection(2)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center gap-2 text-sm sm:text-base"
                >
                  Next <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </FormSection>

            <FormSection isActive={currentSection === 2}>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Target size={14} className="sm:w-4 sm:h-4" />
                    Desired Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="e.g., Frontend Developer, Data Scientist"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      <Folder size={14} className="sm:w-4 sm:h-4" />
                      Application Subject
                    </label>
                    <select name="subject" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base">
                      <option value="">Select Subject</option>
                      <option value="Job Application">Job Application</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance Work">Freelance Work</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                      <TrendingUp size={14} className="sm:w-4 sm:h-4" />
                      Years of Experience
                    </label>
                    <select name="experience" className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base">
                      <option value="">Select Experience</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <Wrench size={14} className="sm:w-4 sm:h-4" />
                    Key Skills & Technologies
                  </label>
                  <input
                    type="text"
                    name="skills"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                    placeholder="e.g., JavaScript, React, Python, SQL"
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Separate skills with commas</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    <FileText size={14} className="sm:w-4 sm:h-4" />
                    Cover Letter / Additional Notes
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 text-sm sm:text-base resize-none"
                    placeholder="Tell us why you're interested in joining Savacy Technologies..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => showSection(1)}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base order-2 sm:order-1"
                >
                  <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => showSection(3)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  Next <ArrowRight size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </FormSection>

            <FormSection isActive={currentSection === 3}>
              <FileUpload />

              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={() => showSection(2)}
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base order-2 sm:order-1"
                >
                  <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={16} className="animate-spin sm:w-5 sm:h-5" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="sm:w-5 sm:h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </FormSection>
          </form>

          {message.text && (
            <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center text-sm sm:text-base ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}