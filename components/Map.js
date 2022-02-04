import ReactMapGL, {Marker, Popup} from 'react-map-gl';
// import Marker from 'react-map-gl';
import {useState} from 'react';
import getCenter from "geolib/es/getCenter"
import { set } from 'date-fns';

export default function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({})

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        longitude: 37.7577,
        latitude: 15,
        zoom: 11
    })

    //transform the search results object into the {latitude: xx, longitude: xx} object

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    //the latitude and longitude of the center of locations coordinates
    const center = getCenter(coordinates);

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
                        offsetLeft={-20}
                        offsetTop={-10}
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
                        >
                        {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
    </ReactMapGL>)
}
