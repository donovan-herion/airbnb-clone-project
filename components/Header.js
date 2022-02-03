import Image from 'next/image'
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import {useState} from "react"

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({placeholder}) {

  const router = useRouter();

  const [searchInput, setSearchInput] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key:'selection'
  }

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      }
    })
  }




  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      <div onClick={() => router.push('/')} className="relative my-auto flex h-10 cursor-pointer items-center p-5 md:text-2xl lg:items-start lg:text-3xl">
          <Image
            src="/logo.svg"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          ></Image>
      </div>

      <div className="flex items-center justify-center ml-5 rounded-full py-2 border-2 md:shadow-sm">
        <input
          className="flex-grow bg-transparent pl-5 text-gray-600 placeholder-gray-400 outline-none overflow-hidden"
          type="text"
          placeholder={placeholder || "Search"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex" />
      </div>

      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <div className="flex justify-between rounded-full md:border-2 p-2">
          <p className="hidden md:block px-5">Login</p>
          {/* <MenuIcon className="h-6" /> */}
          <UserCircleIcon className="h-6" />
        </div>
      </div>


      {searchInput && 
      <div className="flex flex-col mt-5 col-span-3 mx-auto">
        <DateRangePicker 
        ranges={[selectionRange]}
        minDate={new Date()}
        rangeColors={['#fd5b61']}
        onChange={handleSelect}
        />
        <div className="flex items-center border-t-2">
          <h2 className="text-2xl flex-grow font-semibold  py-3">Number of Guests</h2>
          <UsersIcon className="h-5" />

          <input type="number" min={1} value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} className="w-12 pl-2 text-lg outline-none" />
        </div>

        <div className="flex">
          <button onClick={() => setSearchInput("")} className="flex-grow text-gray-500">Cancel</button>
          <button className="flex-grow text-red-400" onClick={search}>Search</button>
        </div>
      </div>
      }
    </header>
  )
}

export default Header
