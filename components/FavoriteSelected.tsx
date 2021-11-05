import React from 'react'
import Link from 'next/dist/client/link';
function FavoriteSelected(props: any) {
    const location = props.favoriteLocation
    return (
        <div
          className={`c-location-banner ${props.bannerClass}`}
        >
          <div className="c-location-banner--panel banner-top">
            <img
              src="https://hootswings.com/_assets/images/icons/favorite-icon.svg"
              alt="Favorite icon"
            />
            <a href={"/locations/details/atlanta-decatur"}>
              {location.c_locationName}
            </a>
            <span
              className="float-right expand-icon"
              id="locationPanelToggle"
            //   onClick={this.handleToggle}
            ></span>
          </div>
          <div className="c-location-banner--panel banner-details">
            <div className="banner-details--top">
              <p>
                {location.address}
                <br />
                {location.city}, {location.region} {location.postalCode}
              </p>
              <p>Open • Closing at 11:00pm</p>
            </div>
            <div className="banner-details--bottom">
              <ul>
                <li>
                  <img
                    src="https://hootswings.com/_assets/images/icons/map-icon.svg?a=1"
                    alt="Get directions"
                  />{" "}
                  <a href={location.c_mapUrl}>get directions</a>
                </li>
                <li>
                  <a href={location.orderUrl}>
                    <img
                      src="https://hootswings.com/_assets/images/icons/info-icon.svg"
                      alt="Store details"
                    />{" "}
                    store details
                  </a>
                </li>
                <li>
                  <img
                    src="https://hootswings.com/_assets/images/icons/phone-icon.svg"
                    alt="Phone icon"
                  />{" "}
                  <b>
                    <a href={`tel:${location.mainPhone}`}>
                      {location.mainPhone}
                    </a>
                  </b>
                </li>
                <li>
                  <img
                    src="https://hootswings.com/_assets/images/icons/wing-icon.svg"
                    alt="order online icon"
                  />{" "}
                  <a href={location.orderUrl}>order online</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="c-location-banner--panel banner-bottom">
            <a href="/locations">
              <img
                src="https://hootswings.com/_assets/images/icons/map-icon.svg?a=1"
                alt="Choose different location icon"
                id="chooseDifferentLocation"
              />{" "}
              choose different location
            </a>
          </div>
        </div>
      );
}

export default FavoriteSelected
