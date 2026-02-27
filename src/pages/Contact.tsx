import { useState } from 'react'
import { Clients } from '../components/layout/home/Clients'
import { FeaturedImage } from '../components/ui/featured-image'

function Contacts () {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // Add your form submission logic here
    alert('Message sent!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-black text-white py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 break-words">
            Hello@example.com
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-400 text-xs sm:text-sm">
            <p>Located in the United States</p>
            <p>123 Arch St, NYC, USA</p>
          </div>
        </div>

        {/* Phone Image */}
          <FeaturedImage section="contact_middle" />

        {/* Contact Form */}
        <div className="space-y-5 sm:space-y-6 mb-12 sm:mb-16">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-700 py-2 sm:py-3 px-0 text-base sm:text-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-700 py-2 sm:py-3 px-0 text-base sm:text-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"/>
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full bg-transparent border-b border-gray-700 py-2 sm:py-3 px-0 text-base sm:text-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"/>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-between group text-sm sm:text-base">
            <span>Send Message</span>
            <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">||||</span>
          </button>
        </div>
      </div>

<div className='space-y-20'>
        <Clients />
      <FeaturedImage section = "contact_bottom" />
      </div>
    </div>
  )
}
export default Contacts