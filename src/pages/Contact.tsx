import {ContactForm} from '../components/pages/forms/contact'

function Contacts () {
  return (
    <div className="w-full text-white px-2 lg:px-25 flex flex-col mb-30">
      <h1 className="font-bold text-[20.1vw] w-full text-center">
        Contact us
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-base md:text-lg lg:text-xl text-gray-300 text-justify">
          <p>hello@example.com</p>
          <p>+63 9975134678</p>
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