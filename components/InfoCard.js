import { HeartIcon, StarIcon } from "@heroicons/react/solid"
import Image from "next/image"

function InfoCard({img, location, title, description,star, price,total}) {
    return (
        <div className="md:flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 first:bg-blue-400">
            <div className="relative mx-auto h-[82vw] w-[82vw] mb-6 md:mb-0 md:h-48 md:w-64 flex-shrink-0">
                <Image className="rounded-2xl" src={img} layout="fill"/>
            </div>
            <div className="flex flex-col flex-grow md:pl-5">
                <div className="flex justify-between">
                    <p>{location}</p>
                    <HeartIcon className="h-7 cursor-pointer"/>
                </div>

                <h4 className="text-xl">{title}</h4>

                <div className="border-b w-10 pt-2"/>

                <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

                <div className="flex justify-between items-end pt-5">
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-red-400" /> {star}
                    </p>

                    <div>
                        <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
                        <p className="text-right font-extralight">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
