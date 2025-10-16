import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendAdminEmail(formData, file) {
  const {
    name,
    email,
    phone,
    jobTitle,
    subject,
    experience,
    education,
    skills,
    coverLetter,
  } = formData;

  const adminEmailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #0f766e; margin: 0; padding: 0; background: #f0fdfa; }
      .container { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin: 20px; }
      .header { background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); color: white; padding: 10px; text-align: center; }
      .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; color: white; }
      .content { padding: 30px; }
      .section { background: #f0fdfa; padding: 10px; margin: 15px 0; border-radius: 12px; border-left: 4px solid #0f766e; }
      .urgent { background: #dc2626; color: white; padding: 10px; border-radius: 8px; text-align: center; margin: 20px 0; font-weight: bold; }
      .footer { text-align: center; padding: 5px; color: #6b7280; font-size: 12px; background: #f8fafc; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">Savacy Technologies</div>
        <h1> New CV Received</h1>
      </div>
      
      <div class="content">
        <div class="urgent">⚡ NEW APPLICATION - REVIEW REQUIRED</div>
        
        <div class="section">
          <h3> Candidate Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <div class="section">
          <h3> Position Details</h3>
          <p><strong>Job Title:</strong> ${jobTitle}</p>
          <p><strong>Application Type:</strong> ${
            subject || "General Application"
          }</p>
          <p><strong>Experience:</strong> ${experience || "Not specified"}</p>
          <p><strong>Education:</strong> ${education || "Not specified"}</p>
        </div>

        ${
          skills
            ? `<div class="section"><h3> Skills</h3><p>${skills}</p></div>`
            : ""
        }
        ${
          coverLetter
            ? `<div class="section"><h3> Cover Letter</h3><p>${coverLetter}</p></div>`
            : ""
        }

        <div class="section">
          <h3>📎 Attachment</h3>
          <p><strong>CV File:</strong> ${file.originalname}</p>
          <p><strong>File Size:</strong> ${(file.size / 1024 / 1024).toFixed(
            2
          )} MB</p>
        </div>
      </div>

      <div class="footer">
        <p>Savacy Technologies - Automated Notification System</p>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Savacy Careers" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: ` New CV: ${name} - ${jobTitle}`,
    html: adminEmailHtml,
    attachments: [
      {
        filename: `CV_${name.replace(/\s+/g, "_")}.pdf`,
        content: file.buffer,
      },
    ],
  });
}

export async function sendAutoReply(formData) {
  const { name, email, jobTitle } = formData;

  const autoReplyHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #0f766e; margin: 0; padding: 0; background: #f0fdfa; }
      .container { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); margin: 20px; }
      .header { background: linear-gradient(135deg, #0f766e 0%, #115e59 100%); color: white; padding: 10px; text-align: center; }
      .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; color: white; }
      .content { padding: 5px; }
      .message { background: #ecfdf5; padding: 5px; margin: 20px 0; border-radius: 12px; text-align: start; border: 2px solid #a7f3d0; }
      .footer { text-align: center; padding: 100px; color: #6b7280; font-size: 12px; background: #f8fafc; }
      
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">


            </span>            Savacy Technologies</div>
        <h1> Application Received</h1>
      </div>
      
      <div class="content">
        <div class="message">
          <h2>Thank You, ${name}!</h2>
          <p>We have successfully received your application for the <strong>${jobTitle}</strong> position at <strong>Savacy Technologies</strong>.</p>
          <p>Our recruitment team will carefully review your qualifications and experience. You can expect to hear back from us within 3-5 business days as we process your application through our screening procedure.</p>
          <p style="background: white; padding: 12px; border-radius: 8px; margin: 15px 0; border: 1px solid #d1fae5;">
            <strong>Application ID:</strong> ST${Date.now()
              .toString()
              .slice(-6)}
          </p>
        </div>
        
        <div style="text-align: start; margin-top: 25px;">
          <h3 style="color: #0f766e; margin-bottom: 15px;">Our Recruitment Process</h3>
          <p style="color: #374151; line-height: 1.8; max-width: 500px; margin: 0 auto;">
            Our hiring process begins with a thorough review of your application by our recruitment team. 
            If your profile matches our requirements, we will contact you for an initial screening conversation 
            to learn more about your background and career aspirations. Successful candidates will then proceed 
            to technical interviews with our team members, followed by a final decision typically within 1-2 weeks.
          </p>
        </div>

        <div style="background: #fef3c7; padding: 5px; border-radius: 8px; margin-top: 20px; text-align: center;">
          <p style="margin: 0; color: #92400e;">
            <strong>Need to update your application?</strong><br>
            Simply reply to this email with any updates or questions.
          </p>
        </div>
      </div>

      <div class="footer">
        <p><strong>Savacy Technologies</strong></p>
        <p>Innovating Tomorrow, Today</p>
        <p>📧 careers@savacytech.com | 🌐 www.savacytech.com</p>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from: `"Savacy Technologies" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: ` Application Received - Savacy Technologies`,
    html: autoReplyHtml,
  });
}
