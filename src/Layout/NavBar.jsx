import React, { useContext, useEffect, useRef, useState } from "react";
import "./style/navbar.css";
import images from "../assets/images";
import { NavLink, useNavigate } from "react-router-dom";
import { ShipmentTrackingContext } from "../App";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const context = useContext(ShipmentTrackingContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const id = useRef(null);

  const [openShippment, setOpenShippment] = useState(false);

  function changeLanguage() {
    window.location.href = `/${i18n.language === "en" ? "ar" : "en"}`;
  }

  const [openSideBar, setOpenSideBar] = useState(false);

  function searchShipment(e) {
    e.preventDefault();
    window.location.replace(`/${i18n.language}?id=${id.current}`);

    if (screen.width <= 1000) {
      openSideBarMenu();
    }
  }

  const openSideBarMenu = () => {
    let fixed = document.getElementsByClassName("page-container")[0];
    if (openSideBar === false) {
      document.getElementsByClassName("navBarContainer")[0].style.height =
        "100vh";
      setOpenSideBar(true);

      fixed.style.overflow = "hidden";
      fixed.style.height = "90vh";
    } else {
      document.getElementsByClassName("navBarContainer")[0].style.height =
        "9vh";
      setOpenSideBar(false);
      fixed.style.overflow = "visible";
    }
  };

  return (
    <div className="navBarContainer">
      <img
        onClick={openSideBarMenu}
        className="menu-icon"
        src={openSideBar ? images.closeIcon : images.menuIcon}
      />
      <a className="logo">
        <img src={images.logo} />
      </a>

      <div className="routesContainer">
        <NavLink className="routeButton">
          <h1>{t("home")}</h1>
        </NavLink>

        <NavLink className="routeButton">
          <h1>{t("prices")}</h1>
        </NavLink>

        <NavLink className="routeButton">
          <h1>{t("call-sales")}</h1>
        </NavLink>
      </div>

      <div className="routesContainer">
        <div className="track-shippment-container">
          <a
            className={`routeButton track-shippment ${
              openShippment && "opened"
            }`}
            onClick={() => {
              setOpenShippment(!openShippment);
            }}
          >
            <h1>{t("track-shipment")}</h1>
          </a>
          {openShippment && (
            <div className="search-shippment-container">
              <div className="input-container">
                <h4>{t("track-your-shipment")}</h4>
                <form
                  onSubmit={(e) => searchShipment(e)}
                  className="input-search"
                >
                  <input
                    onChange={(e) => (id.current = +e.target.value)}
                    placeholder={t("shipment-number")}
                  />
                  <button style={{ border: "none" }}>
                    <img
                      dir={document.documentElement.dir}
                      src={images.searchIcon}
                    />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="seperator" />

        <NavLink className="routeButton">
          <h1>{t("login")}</h1>
        </NavLink>

        <button onClick={changeLanguage} className="language-button">
          {i18n.language === "ar" ? "ENG" : "عربي"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
