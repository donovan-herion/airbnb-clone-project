import ReactMapGL, {Marker, Popup} from 'react-map-gl';
// import Marker from 'react-map-gl';
import {useState} from 'react';
import getCenter from "geolib/es/getCenter"
import { set } from 'date-fns';
import { StarIcon } from '@heroicons/react/solid';

export default function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({})

    //transform the search results object into the {latitude: xx, longitude: xx} object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    //the latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 11
    })


    console.log(center)
   
    return (<ReactMapGL
    mapStyle="mapbox://styles/donovan-herion/ckz8fddrh001314ns7zelniiu"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewport}
    onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >

            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-10}
                        offsetTop={0}
                    >
                       
                        <p onClick={() => setSelectedLocation(result)} className="cursor-pointer text-2xl" aria-label='push-pin' role="img">
                        📍
                        </p>

                    </Marker>

                    {selectedLocation.long === result.long ? (
                        <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        longitude={result.long}
                        latitude={result.lat}
                        className="z-50"
                        >
                            <p className="p-2 flex items-center justify-center  leading-none">
                            <StarIcon className="h-5 text-red-400" />  {result.star}
                            </p>

                            <p className="mb-2">
                                {result.title}
                            </p>

                            <button className="button bg-red-400 block mx-auto text-white">Book Now {result.price}</button>
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
    </ReactMapGL>)
}
