import React from 'react'

function LocationListing(location: any) {
    console.log('location', location.location)
    return (
        <div>
            <h1>Name = {location.location.c_locationName}</h1>
        </div>
    )
}

export default LocationListing
