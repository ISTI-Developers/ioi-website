import {ContactForm} from '../components/pages/forms/contact'
import { Clients } from '../components/layout/home/Clients'
import { FeaturedImage } from '../components/ui/featured-image'

function Contacts () {

  return (
    <div className="w-full text-white overflow-x-hidden px-6 md:px-12 lg:px-24 flex flex-col space-y-20">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6 sm:mb-8">
          <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 break-words">
            Hello@example.com
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-400 text-xs sm:text-sm">
            <p>Located in the United States</p>
            <p>123 Arch St, NYC, USA</p>
          </div>
        </div>

        <div className='space-y-20'>
          <FeaturedImage section="contact_middle" />
        <ContactForm />
        </div>
        <div className='space-y-20'>
        <Clients />
      <FeaturedImage section = "contact_bottom" />
      </div>
      </div>
    </div>
  )
}
export default Contacts