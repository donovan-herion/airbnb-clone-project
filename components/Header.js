import Image from 'next/image'
import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  GlobeAltIcon,
} from '@heroicons/react/solid'

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      <div className="relative my-auto flex h-10 cursor-pointer items-center p-5 md:text-2xl lg:items-start lg:text-3xl">
          <Image
            src="/logo.svg"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          ></Image>
      </div>

      <div className="flex items-center rounded-full py-2 border-2 md:shadow-sm">
        <input
          className="flex-grow bg-transparent pl-5 text-gray-600 placeholder-gray-400 outline-none"
          type="text"
          placeholder="Start your search"
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex" />
      </div>

      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden md:inline">Become a host</p>
        <GlobeAltIcon className="hidden md:inline h-6 cursor-pointer" />

        <div className="b-2 flex justify-between rounded-full border-2 p-2">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
    </header>
  )
}

export default Header
