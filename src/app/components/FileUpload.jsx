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
    <div className="space-y-6">
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
          className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 group"
        >
          <Upload size={48} className="mx-auto text-gray-400 group-hover:text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Drop your CV here or click to browse
          </h3>
          <p className="text-gray-500">Supports PDF files only (Maximum 5MB)</p>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg mt-6"
          >
            Browse Files
          </button>
        </div>
      ) : (
        <div className="border-2 border-blue-200 bg-blue-50 rounded-2xl p-6 animate-slide-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText size={32} className="text-blue-600" />
              <div>
                <div className="font-semibold text-blue-800">{file.name}</div>
                <div className="text-sm text-blue-600">{formatFileSize(file.size)}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}