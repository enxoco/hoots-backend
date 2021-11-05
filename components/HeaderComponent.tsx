import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NoFavoriteSelected from './NoFavoriteSelected';
import FavoriteSelected from './FavoriteSelected'
interface FavoriteLocation {
    id: String
}
function HeaderComponent(props: any) {
  console.log('props', props)
    return (
      <>
        <section className="c-cta_banner bg--green show-desktop">
          <div className="c-cta_banner__container">
            <div className="c-cta_banner__text">
              <p className="c-cta_banner__title text-color--brown">
                new location in aubrey tx!
              </p>
            </div>

            <div className="c-cta_banner__text">
              <p className="c-cta_banner__title text-color--brown">
                <a
                  href="/locations/details/little-elm"
                  style={{ color: "#4b1700", textDecoration: "none" }}
                >
                  now open
                </a>
              </p>
            </div>
          </div>
        </section>
        <section className="c-cta_banner bg--green show-mobile">
          <div className="c-cta_banner__container">
            <div className="c-cta_banner__text">
              <p className="c-cta_banner__title text-color--brown">
                <a
                  href="/locations/details/little-elm"
                  style={{ color: "#4b1700", textDecoration: "none" }}
                >
                  now open
                </a>
              </p>
            </div>

            <div className="c-cta_banner__text">
              <p className="c-cta_banner__title text-color--brown">
                aubrey, tx
              </p>
            </div>
          </div>
        </section>
        <header className="main-header header--home banner js-header">
          <div className="main-header__container">
            <span className="js-menu-button">
              <button className="menu-burger" aria-label="Navigation">
                <span className="menu-burger__bar menu-burger__bar--1"></span>
                <span className="menu-burger__bar menu-burger__bar--2"></span>
                <span className="menu-burger__bar menu-burger__bar--3"></span>

                <span className="menu-burger__close menu-burger__close--1"></span>
                <span className="menu-burger__close menu-burger__close--2"></span>
              </button>
            </span>

            <a href="/" className="main-header__logo">
              <img
                src="https://hootswings.com/perch/resources/logos/hoots-wings-logo.png"
                alt="Hoots Wings"
                height="25"
                width="25"
              />
            </a>
            <div className="main-header__navigation">
              <nav className="main-nav js-main-nav">
                <ul className="main-nav__list">
                  <li className="main-nav__list-item">
                    <a
                      className="main-nav__list-link "
                      href="https://order.hootswings.com"
                    >
                      Order
                    </a>
                  </li>

                  <li className="main-nav__list-item">
                    <a className="main-nav__list-link " href="/locations">
                      Locations
                    </a>
                  </li>

                  <li className="main-nav__list-item">
                    <a className="main-nav__list-link " href="/food">
                      Menu
                    </a>
                  </li>
                </ul>
                <ul className="main-nav__list">
                  <li className="main-nav__list-item">
                    <a
                      className="main-nav__list-link hootscoop"
                      href="/hoot-scoop"
                    >
                      Hootscoop
                    </a>
                  </li>

                  <li className="main-nav__list-item">
                    <a className="main-nav__list-link " href="/about">
                      About
                    </a>
                  </li>

                  <li className="main-nav__list-item">
                    <a
                      className="main-nav__list-link "
                      href="https://hootsfranchise.com/"
                    >
                      franchise
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="main-header__mobile-ctas">
              <a
                className="main-header__mobile-cta main-header__mobile-cta--map"
                href="/locations"
              >
                <img
                  src="https://hootswings.com/_assets/images/icons/map-icon.svg"
                  alt=""
                />
              </a>
              <a
                className="main-header__mobile-cta main-header__mobile-cta--order"
                href="https://hootswings.com/locations/"
              >
                Order
              </a>
            </div>
          </div>

          {props.favoriteLocation ? (
            <FavoriteSelected
              favoriteLocation={props.favoriteLocation}
            />
          ) : (
            <NoFavoriteSelected />
          )}
          <div className="c-hootscoop-banner show-mobile bg--purple">
            <span className="c-hootscoop-banner--left">
              <a href="/hoot-scoop" aria-label="Sign up for Hoot Scoop">
                hootscoop
              </a>
            </span>
            <span className="c-hootscoop-banner--right">
              <a href="/hoot-scoop" aria-label="Sign up for Hoot Scoop">
                join now
              </a>
            </span>
          </div>
        </header>
      </>
    );
}

export default HeaderComponent
