import Image from 'next/image'

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="/hero.webp"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      ></Image>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
         <p className="font-medium text-sm sm:text-lg lg:text-2xl text-center">
          Not Sure where to go ? Perfect.
        </p>
        <button className="my-3 rounded-full bg-white px-10 py-4 font-bold text-violet-400   shadow-md transition-all hover:shadow-xl active:scale-105">
          I am Flexible
         </button>
      </div>
    </div>
  )
}

export default Banner
