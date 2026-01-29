import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function Experience() {
  const experienceStats = [
    { label: "/YEARS OF EXPERIENCE", value: 15, suffix: "+" },
    { label: "/TEAM MEMBERS", value: 25, suffix: "+" },
    { label: "/Projects", value: 50, suffix: "+" },
    { label: "/Clients", value: 20, suffix: "+" },
  ]

  return (
    <div className="w-full">
      <h2 className="text-primary lg:text-sm uppercase">//Experience</h2>

      <p className="text-white font-bold text-2xl lg:text-3xl max-w-[96%] md:max-w-[22rem] lg:max-w-160 mb-5">
        Located in the  Makati, Philippines, our Agency is dedicated to crafting
        robust and renowned brands.
      </p>

      <p className="text-lightgray text-[0.95rem] lg:text-[1rem] max-w-120">
        We are a dedicated bunch of professionals with many years of experience
        within the creative industry.
      </p>

      <section>
        {experienceStats.map((stat, index) => (
          <StatRow key={index} stat={stat} delay={index * 0.12} />
        ))}
      </section>
    </div>
  )
}

function StatRow({
  stat,
  delay,
}: {
  stat: { label: string; value: number; suffix: string }
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(Math.round(latest))
  })

  useEffect(() => {
    if (!isInView) return

    animate(motionValue, stat.value, {
      duration: 0.9,
      delay,
      ease: "easeOut",
    })
  }, [isInView, stat.value, delay, motionValue])

  return (
    <div
      ref={ref}
      className="flex flex-col-reverse md:flex-row md:justify-between md:items-center items-start justify-between border-b border-white/20 py-8 lg:py-10"
    >
      <h3 className="text-primary text-sm  tracking-widest font-medium py-4">
        {stat.label}
      </h3>

      <motion.span className="text-white text-[8rem] lg:text-[12rem] font-bold leading-none">
        {stat.suffix}
        {displayValue}

      </motion.span>
    </div>
  )
}
