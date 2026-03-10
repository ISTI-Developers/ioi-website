import {ContactForm} from '../components/pages/forms/contact'
import { Clients } from '../components/layout/home/Clients'
import { FeaturedImage } from '../components/ui/featured-image'

function Contacts () {

  return (
    <div className="w-full overflow-x-hidden text-white px-2 lg:px-25 flex flex-col space-y-10 lg:space-y-42">
      
        <div className="mb-6 sm:mb-8">
          <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 break-words">
            Hello@example.com
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-400 text-base sm:text-lg">
            <p>Located in Metro Manila</p>
            <p className="justify-end">HPL Building, 60 Sen. Gil Puyat Ave.,<br/>
            Makati City 1234, Philippines</p>
          </div>
        </div>
       
          <FeaturedImage section="contact_middle" />

          <div className="mt-8 sm:mt-10">
            <ContactForm />
          </div>

          <div className="mt-20">
            <Clients />
          </div>

          <div className="mt-20">
            <FeaturedImage section = "contact_bottom" />
        </div>
      </div>
  )
}
export default Contacts