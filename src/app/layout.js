import './globals.css'

export const metadata = {
  title: 'Career Portal - Savacy Technologies',
  description: 'Join our innovative team at Savacy Technologies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}