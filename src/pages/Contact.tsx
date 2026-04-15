import {ContactForm} from '../components/pages/forms/contact'

function Contacts () {
  return (
    <div className="w-full text-white px-2 lg:px-25 flex flex-col mb-30">
      <img src="/contacts.gif" alt="Contact Us Gif" className="w-250 mx-auto block pt-30 pb-20" />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-base md:text-lg lg:text-xl text-gray-300 text-justify">
          <p>inquiry@innovationone.com.ph</p>
          <p>+63 917 112 0767 - Francis Ceruma</p>
          <p>
            HPL Building, 60 Sen. Gil Puyat Ave.,<br />
            Makati City 1234, Philippines
          </p>
        </div>
        <ContactForm/>
      </section>
    </div>
  )
}
export default Contacts