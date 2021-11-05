import React from 'react'
import Image from 'next/dist/client/image';

function LocationCard(props: any) {
    const location = props.locationDetail
    function handleChange(id){
        props.onChange(id)
    }
    return (
        <div className="c-feature-location" key={location.c_oloId}>
          <div className="c-feature-location__column">
            <div
              className="
            c-feature-location__store-info
            c-feature-location__store-info--contact
          "
            >
              <div>
                <div
                  className={`favorite-selector ${
                    props.isFavorite ? "selected" : ""
                  }`}
                onClick={() => handleChange(location.c_oloId)}
                >
                  {/* <Image src={favoriteImage} alt="icon" width={15} height={15} /> */}
                  <span>
                    {" "}
                    {props.isFavorite ? "your favorite" : "make favorite"}
                  </span>
                </div>
              </div>
              <div className="c-feature-location__store-name">
                <p>{props.locationDetail.c_locationName}</p>
              </div>
              <div className="c-feature-location__store-address">
                <p>
                  <b>Open • Closing at 11:00pm</b>
                </p>
              </div>
              <div className="c-feature-location__store-address">
                <p>
                  {location.address}
                  <br />
                  {location.city}, {location.region} {location.postalCode}
                </p>
              </div>
              <a
                href={`tel:${location.mainPhone}`}
                aria-label="tel:{ location.mainPhone }"
                className="c-feature-location__store-map-link"
              >
                <img
                  src="https://hootswings.com/_assets/images/icons/phone-icon.svg"
                  alt="Store Phone: { location.mainPhone }"
                />
                <span>{location.mainPhone}</span>
              </a>
              <a
                href={location.c_mapUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Get directions"
                className="c-feature-location__store-map-link"
              >
                <img
                  src="https://hootswings.com/_assets/images/icons/map-icon.svg"
                  alt="Get Directions"
                />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
          <div className="c-feature-location__column">
            <a
              href={location.orderUrl}
              aria-label="Order online"
              className="c-feature-location__cta c-cta c-cta--orange-outline"
            >
              <img
                src="https://hootswings.com/_assets/images/icons/wing-icon.svg"
                alt="Order online"
                className="button-icon"
              />
              <span>ORDER ONLINE</span>
            </a>
            <a
              href="/locations/details/atlanta-decatur"
              className="c-feature-location__cta c-cta c-cta--orange-outline"
            >
              <img
                src="https://hootswings.com/_assets/images/icons/details-icon.svg"
                alt="get store details"
                className="button-icon details-icon"
              />
              <span>store details</span>
            </a>
            <a
              href="https://www.ezcater.com/catering/pvt/hoots-wings-decatur"
              className="c-feature-location__cta c-cta c-cta--orange-outline"
            >
              <img
                src="https://hootswings.com/_assets/images/icons/catering-icon.svg"
                alt="get catering link"
                className="button-icon circle-icon"
              />
              <span>get catering</span>
            </a>
          </div>
          <div className="c-feature-location__column">
            {/* <a
              href="https://goo.gl/maps/8H6ByMsWeAv5CEfs9"
              target="_blank"
              rel="noreferrer"
              aria-label="Decatur Location Map Link"
              className="c-feature-location__store-info-map"
              style={mapStyle}
            ></a> */}
          </div>
          <hr />
        </div>
      );
}

export default LocationCard
