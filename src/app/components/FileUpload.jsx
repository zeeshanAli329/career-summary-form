'use client'
import { useState, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File too large. Please select a PDF under 5MB.')
        return
      }
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file only.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <input
        type="file"
        name="pdf"
        ref={fileInputRef}
        accept="application/pdf"
        required
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="hidden"
      />

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleBrowseClick}
          className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 group"
        >
          <Upload size={32} className="mx-auto text-gray-400 group-hover:text-blue-500 mb-3 sm:mb-4 w-8 h-8 sm:w-12 sm:h-12" />
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mb-2">
            Drop your CV here or click to browse
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mb-4 sm:mb-6">Supports PDF files only (Maximum 5MB)</p>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-sm sm:text-base"
          >
            Browse Files
          </button>
        </div>
      ) : (
        <div className="border-2 border-blue-200 bg-blue-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <FileText size={24} className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
              <div>
                <div className="font-semibold text-blue-800 text-sm sm:text-base">{file.name}</div>
                <div className="text-xs sm:text-sm text-blue-600">{formatFileSize(file.size)}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}