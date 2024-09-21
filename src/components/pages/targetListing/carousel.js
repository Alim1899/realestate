import { useState, useEffect, useCallback } from "react";
import leftSlide from "../../../assets/icons/prev.svg";
import rightSlide from "../../../assets/icons/next.svg";
import Card from "../card/Card";
import classes from "./TargetListing.module.css";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const getListing = async (setListing) => {
    await fetch(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setSlides(data));
  };
  useEffect(() => {
    getListing(setSlides);
  }, []);

  const slider = useCallback(() => {
    const newIndex = (activeSlide + 1 + slides.length) % slides.length;

    setActiveSlide(newIndex);
  }, [slides.length, activeSlide]);

  useEffect(() => {
    const timer = setTimeout(slider, 3500);
    return () => clearTimeout(timer);
  }, [activeSlide, slider]);

  const changeByButtons = (direction) => {
    const newIndex = (activeSlide + direction + slides.length) % slides.length;
    setActiveSlide(newIndex);
    console.log(activeSlide);
  };

  return (
    <div className={classes.carousel}>
      <div className={classes.slider}>
        <img
          alt="Previous slide"
          onClick={() => changeByButtons(-1)}
          className={classes.leftArrow}
          src={leftSlide}
        />
        <div className={classes.sliderContent}>
          {slides.length > 0 && (
            <div className={classes.slides}>
              <Card
                key={slides[activeSlide].id}
                id={slides[activeSlide].id}
                type={slides[activeSlide].is_rental ? "ქირავდება" : "იყიდება"}
                price={slides[activeSlide].price || "0"}
                location={slides[activeSlide].address || "მითითებული არ არის"}
                bedroom={slides[activeSlide].bedrooms || "0"}
                area={slides[activeSlide].area || "0"}
                postal={slides[activeSlide].zip_code || "0000"}
                src={slides[activeSlide].image}
              />
              <Card
                key={slides[(activeSlide + 1) % slides.length].id}
                id={slides[(activeSlide + 1) % slides.length].id}
                type={
                  slides[(activeSlide + 1) % slides.length].is_rental
                    ? "ქირავდება"
                    : "იყიდება"
                }
                price={slides[(activeSlide + 1) % slides.length].price || "0"}
                location={
                  slides[(activeSlide + 1) % slides.length].address ||
                  "მითითებული არ არის"
                }
                bedroom={
                  slides[(activeSlide + 1) % slides.length].bedrooms || "0"
                }
                area={slides[(activeSlide + 1) % slides.length].area || "0"}
                postal={
                  slides[(activeSlide + 1) % slides.length].zip_code || "0000"
                }
                src={slides[(activeSlide + 1) % slides.length].image}
              />
              <Card
                key={slides[(activeSlide + 2) % slides.length].id}
                id={slides[(activeSlide + 2) % slides.length].id}
                type={
                  slides[(activeSlide + 2) % slides.length].is_rental
                    ? "ქირავდება"
                    : "იყიდება"
                }
                price={slides[(activeSlide + 2) % slides.length].price || "0"}
                location={
                  slides[(activeSlide + 2) % slides.length].address ||
                  "მითითებული არ არის"
                }
                bedroom={
                  slides[(activeSlide + 2) % slides.length].bedrooms || "0"
                }
                area={slides[(activeSlide + 2) % slides.length].area || "0"}
                postal={
                  slides[(activeSlide + 2) % slides.length].zip_code || "0000"
                }
                src={slides[(activeSlide + 2) % slides.length].image}
              />
              <Card
                key={slides[(activeSlide + 3) % slides.length].id}
                id={slides[(activeSlide + 3) % slides.length].id}
                type={
                  slides[(activeSlide + 3) % slides.length].is_rental
                    ? "ქირავდება"
                    : "იყიდება"
                }
                price={slides[(activeSlide + 3) % slides.length].price || "0"}
                location={
                  slides[(activeSlide + 3) % slides.length].address ||
                  "მითითებული არ არის"
                }
                bedroom={
                  slides[(activeSlide + 3) % slides.length].bedrooms || "0"
                }
                area={slides[(activeSlide + 3) % slides.length].area || "0"}
                postal={
                  slides[(activeSlide + 3) % slides.length].zip_code || "0000"
                }
                src={slides[(activeSlide + 3) % slides.length].image}
              />
            </div>
          )}

          <div></div>
        </div>
        <img
          onClick={() => changeByButtons(1)}
          alt="Next slide"
          className={classes.rightArrow}
          src={rightSlide}
        />
      </div>
    </div>
  );
};

export default Slider;
