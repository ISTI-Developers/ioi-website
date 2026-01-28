export default function Hero() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-white py-10">

        <h1 className="text-[2.2rem] sm:text-[3rem] lg:text-8xl lg:col-span-8  font-semibold
                       leading-[1.2] lg:leading-[0.9] 
                       tracking-[-0.03em] lg:tracking-tighter">

          We Create Campaigns That <br className="hidden lg:block" /> Matter.
        </h1>

        <div className="lg:col-span-4 flex lg:justify-end">
          <p className="text-gray-400 text-md lg:text-lg  max-w-[20rem] lgtext-left">
            Located in Makati, Philippines, our Agency is dedicated to crafting robust and renowned brands.
          </p>
        </div>
      </div>
    </div>
  )
}