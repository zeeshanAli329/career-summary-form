import { NextResponse } from 'next/server'
import { sendAdminEmail, sendAutoReply } from '../../lib/email'

export async function POST(request) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const jobTitle = formData.get('jobTitle')
    const subject = formData.get('subject')
    const experience = formData.get('experience')
    const education = formData.get('education')
    const skills = formData.get('skills')
    const coverLetter = formData.get('coverLetter')
    const file = formData.get('pdf')

    // Validation
    if (!name || !email || !jobTitle || !file) {
      return NextResponse.json(
        { success: false, error: 'Name, email, job title, and CV are required.' },
        { status: 400 }
      )
    }

    const fileBuffer = await file.arrayBuffer()
    const fileData = {
      originalname: file.name,
      buffer: Buffer.from(fileBuffer),
      size: file.size,
    }

    const formDataObj = {
      name, email, phone, jobTitle, subject, experience, education, skills, coverLetter
    }

    // Send both emails
    await Promise.all([
      sendAdminEmail(formDataObj, fileData),
      sendAutoReply(formDataObj)
    ])

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.'
    })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}