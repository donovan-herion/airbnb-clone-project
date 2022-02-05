import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'
import Footer from '../components/Footer'
import {useState, useRef, useEffect} from 'react';

export default function Home({exploreData, cardsData}) {

  const [mouseEntered, setMouseEntered] = useState(false)

  const [currentScroll, setCurrentScroll] = useState(0)

  const ref = useRef();
  const wheelStop = useRef();

// block the body from scrolling (or any other element)
useEffect(() => {
  if (mouseEntered) {

    const cancelWheel = e => wheelStop.current && e.preventDefault()
    document.body.addEventListener('wheel', cancelWheel, {passive:false})
    return () => document.body.removeEventListener('wheel', cancelWheel)
  } 
}, [mouseEntered])

  const handleScroll = (e) => {
    console.log(ref.current)

    
    setCurrentScroll(prev => prev += e.deltaY * .5)
    if (currentScroll > ref.current.scrollWidth) {
      setCurrentScroll(ref.current.scrollWidth)
    } else if (currentScroll < 0) {
      setCurrentScroll(0)
    }
    ref.current.scrollLeft = currentScroll




      // while wheel is moving, do not release the lock to prevent normal scrolling behavior
      clearTimeout(wheelStop.current)
      
      // flag indicating to lock page scrolling (setTimeout returns a number)
      wheelStop.current = setTimeout(() => {
        wheelStop.current = false
      }, 300)
    
  }
  return (
   <>
      <Head>
        <title>Airbnb Clone</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <Header />
      <Banner />

      <main className="max-w-[1300px] mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {exploreData?.map(({img,distance,location}) => (
            <SmallCard key={img} img={img} location={location} distance={distance} />
            
            ))}
            
          </div>
        </section>

        <section ref={wheelStop}>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div ref={ref} className="flex space-x-3 overflow-scroll scrollbar-hide"  onWheel={e => handleScroll(e)} onMouseEnter={() => setMouseEntered(true)} onMouseleave={() => setMouseEntered(false)}>
          {cardsData?.map( ({img, title}) => (
              <MediumCard key={img} img={img} title={title} />
          ))}
          {cardsData?.map( ({img, title}) => (
          <MediumCard key={img} img={img} title={title} />
          ))}
          </div>
        </section>

        <LargeCard
        img="https://links.papareact.com/4cj"
        title="The Greatest Outdoors"
        description="Wishlists curated by Airbnb."
        buttonText="Get Inspired"
         />

      </main>
      <Footer />
    </>
  )
}


export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(res=> res.json())
  const cardsData = await fetch("https://links.papareact.com/zp1").then(res=> res.json())

  return {
    props:
  {
    exploreData,
    cardsData
  }
  }
}