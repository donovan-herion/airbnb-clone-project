import Image from 'next/image'

function MediumCard({img, title}) {
    return (
        <div className="cursor-pointer  scrollbar-hide p-3 -ml-3">
            <div className="relative h-80 w-80 hover:scale-[103%] transition-all duration-300 ease-out">
                <Image src={img} layout="fill" className="rounded-lg"></Image>
            </div>
            <h3 className="text-2xl mt-3">{title}</h3>
        </div>
    )
}

export default MediumCard
