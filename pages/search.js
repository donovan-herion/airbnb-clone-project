import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import {format} from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({searchResults}) {

    const router = useRouter();
    const {location, startDate, endDate, numberOfGuests} = router.query

    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")
    const range = `${formattedStartDate} - ${formattedEndDate}`

    console.log(searchResults)

    return (
        <>
            <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`} />  

            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - {numberOfGuests} guest{numberOfGuests > 1 ? "s" : ""}</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

                    <div className="hidden lg:flex space-x-3 mb-5 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of place</p>
                        <p className="button">Prices</p>
                        <p className="button">Rooms and Beds</p>
                    </div>
                    {searchResults?.map((item) => <InfoCard img={item.img} location={item.location} title={item.title} description={item.description} star={item.star} price={item.price} total={item.total} />)}
                </section>

               
            <section className="hidden xl:block xl:min-w-[400px] h-[100vh] sticky top-24">
                <Map searchResults={searchResults} />
            </section>
               
            </main>



            <Footer /> 
        </>
    )
}

export default Search;

export async function getServerSideProps () {
    const searchResults = await fetch('https://links.papareact.com/isz').then(res =>res.json())

    return {
        props: {
            searchResults,
        }
    }
}