function About() {
  return (
    <section className="min-h-screen bg-accent text-black px-6 pb-16 md:px-[60px] md:pb-24">
      {/* Hi heading + E-MAIL on same row */}
      <div className="flex items-center justify-between pt-12 md:pt-24">
        <h1 className="font-display text-[36px] font-bold tracking-[1.92px] md:text-[48px]">
          Hi! :)
        </h1>
        <a
          href="mailto:presecki.iva@gmail.com"
          className="inline-block rounded-full border border-black px-7 py-2 font-display text-[16px] font-bold tracking-[0.8px] transition-colors duration-200 hover:bg-black hover:text-accent md:text-[20px]"
        >
          E-MAIL
        </a>
      </div>

      {/* Bio text */}
      <div className="mt-10 max-w-[871px] font-display text-[20px] font-semibold leading-[29px] tracking-[0.96px] md:text-[24px]">
        <p>
          My name is Iva, I'm a 24 year old Faculty of Graphic Arts graduate.
          During my studies, I explored a range of digital media practices,
          focusing on diverse tools, processes and practical approaches,
          with particular attention to how these forms can intersect, integrate
          and mutually enhance one another. I am motivated by continuous
          learning and the exploration of ways to integrate animation, 3D,
          and classic 2D practices into cohesive product presentations.
        </p>

        <p className="mt-8">
          I see design as a constantly evolving field shaped by new
          techniques and current trends. I believe it should balance
          innovation with timelessness, while staying clear and purposeful
          to communicate ideas in a direct and accessible way.
        </p>
      </div>

      {/* Exhibitions — right aligned */}
      <div className="mt-20 text-right font-display text-[16px] tracking-[0.8px] md:mt-28 md:text-[20px]">
        <p className="font-bold">EXIBITIONS</p>
        <p className="mt-1 font-semibold">Zagreb Design Week 2024.</p>
        <p className="font-semibold">MM Centar Zagreb</p>
        <p className="font-semibold">Faculty of Graphic Arts exibitions</p>
      </div>
    </section>
  )
}

export default About
