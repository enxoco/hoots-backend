import React from 'react'
import Link from 'next/link'
function NoFavoriteSelected(props: any) {
    return (
        <div
          className={`c-location-banner ${props.bannerClass}`}
        >
          <div className="c-location-banner--panel banner-top">
            <img
              src="https://hootswings.com/_assets/images/icons/favorite-icon.svg"
              alt="Favorite icon"
            />
            <a
              href="/locations"
              style={{ textDecoration: "none" }}
              id="chooseFavoriteLocation"
            >
              choose favorite
            </a>
            <span
              className="float-right expand-icon"
              id="locationPanelToggle"
              // onClick={this.handleToggle}
            ></span>
          </div>
          <div className="c-location-banner--panel banner-details">
            <div className="banner-details--top"></div>
            <div className="banner-details--bottom"></div>
          </div>
          <div className="c-location-banner--panel banner-bottom">
            <a href="/locations" id="chooseDifferentLocation">
              <img
                src="https://hootswings.com/_assets/images/icons/map-icon.svg?a=1"
                alt="Choose different location"
              />{" "}
              choose different location
            </a>
          </div>
        </div>
      );
}

export default NoFavoriteSelected
