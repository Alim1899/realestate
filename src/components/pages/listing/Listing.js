import { useState, useEffect } from "react";
import classes from "./Listing.module.css";
import x from "../../../assets/icons/x.svg";
import down from "../../../assets/icons/down.svg";
import Card from "../card/Card";
import Modal from "../modal/Modal";
import {
  openModal,
  closeModal,
  getListings,
  initialValues,
  validationSchema,
} from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navigation from "./Navigation";
const Listing = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [regionsFilter, showRegionsFilter] = useState(false);
  const [showBedFilter, setShowBedFilter] = useState(false);
  const [showAreaFilter, setShowAreaFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);
  const [min, setMinprice] = useState("");
  const [max, setMaxprice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [bedrooms, setBedrooms] = useState();

  useEffect(() => {
    if (!max && !maxArea && filteredRegions.length === 0 && !bedrooms) {
      setFilterSelected(false);
    } else {
      setFilterSelected(true);
    }
  }, [min, max, filteredRegions, maxArea, minArea, filterSelected, bedrooms]);

  useEffect(() => {
    const filterListings = () => {
      let regionFilteredListings = listings;
      if (filteredRegions.length > 0) {
        regionFilteredListings = listings.filter((listing) =>
          filteredRegions.includes(listing.city.region.name)
        );
      } else regionFilteredListings = [];

      let priceFilteredListings = listings;
      if (max) {
        priceFilteredListings = listings.filter(
          (el) => el.price >= min && el.price <= max
        );
      } else priceFilteredListings = [];

      let areaFilteredListings = listings;
      if (maxArea) {
        areaFilteredListings = listings.filter(
          (el) => el.area >= minArea && el.area <= maxArea
        );
      } else areaFilteredListings = [];
      let bedFilteredListings = listings;
      if (bedrooms) {
        bedFilteredListings = listings.filter((el) => el.bedrooms === bedrooms);
      } else bedFilteredListings = [];

      let combinedListings = listings.filter(
        (listing) =>
          regionFilteredListings.includes(listing) ||
          priceFilteredListings.includes(listing) ||
          areaFilteredListings.includes(listing) ||
          bedFilteredListings.includes(listing)
      );

      setFilteredListings(combinedListings);
    };

    filterListings();
  }, [listings, filteredRegions, min, max, minArea, maxArea, bedrooms]);

  useEffect(() => {
    getListings(setListings);
  }, []);

  useEffect(() => {
    getListings(setListings);
  }, []);

  useEffect(() => {
    getListings(setListings);
  }, []);

  const handleFilterClick = (filterType) => {
    if (filterType === "regions") {
      showRegionsFilter(!regionsFilter);
      setShowBedFilter(false);
      setShowAreaFilter(false);
      setShowPriceFilter(false);
    } else if (filterType === "bed") {
      showRegionsFilter(false);
      setShowAreaFilter(false);
      setShowPriceFilter(false);
      setShowBedFilter(!showBedFilter);
    } else if (filterType === "area") {
      showRegionsFilter(false);
      setShowAreaFilter(!showAreaFilter);
      setShowPriceFilter(false);
      setShowBedFilter(false);
    } else if (filterType === "price") {
      showRegionsFilter(false);
      setShowAreaFilter(false);
      setShowPriceFilter(!showPriceFilter);
      setShowBedFilter(false);
    }
  };
  return (
    <div className={classes.main}>
      {showModal && <Modal closeModal={(e) => closeModal(e, setShowModal)} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form>
            <Navigation
              openModal={openModal}
              setShowModal={setShowModal}
              Field={Field}
              regionsFilter={regionsFilter}
              showRegionsFilter={() => handleFilterClick("regions")}
              ErrorMessage={ErrorMessage}
              formik={formik}
              setFilteredRegions={setFilteredRegions}
              showPriceFilter={showPriceFilter}
              setShowPriceFilter={() => handleFilterClick("price")}
              setMinprice={setMinprice}
              setMaxprice={setMaxprice}
              showAreaFilter={showAreaFilter}
              setShowAreaFilter={() => handleFilterClick("area")}
              showBedFilter={showBedFilter}
              setShowBedFilter={() => handleFilterClick("bed")}
              setMinArea={setMinArea}
              setMaxArea={setMaxArea}
              setBedrooms={setBedrooms}
            />
            <div className={classes.filled}>
              <div className={classes.filledContent}>
                <div className={classes.filledFilter}>
                  {formik.values.region.length < 1 ? (
                    <div>
                      <h4
                        onClick={() => handleFilterClick("regions")}
                        className={classes.inputRegion}
                      >
                        აირჩიე რეგიონი<img src={down} alt="down"></img>
                      </h4>
                    </div>
                  ) : formik.values.region.length === 1 ? (
                    <h4 className={classes.inputRegion}>
                      {formik.values.region[0]}
                    </h4>
                  ) : (
                    <div className={classes.allSelectedRegions}>
                      <h4 className={classes.inputRegion}>
                        {formik.values.region[0]}
                        <img
                          onClick={() => handleFilterClick("regions")}
                          src={down}
                          alt="down"
                        />
                      </h4>
                    </div>
                  )}
                  <img
                    className={classes.navIcon}
                    onClick={() => {
                      formik.setFieldValue("region", []);
                      setFilteredRegions([]);
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>

                <div className={classes.defaultPrice}>
                  <h4
                    onClick={() => {
                      handleFilterClick("price");
                    }}
                    className={classes.priceRange}
                  >
                    {formik.values.minPrice || 0}₾ -{" "}
                    {formik.values.maxPrice || "∞ ₾"}
                  </h4>
                  <img
                    className={classes.navIcon}
                    onClick={() => {
                      formik.setFieldValue("minPrice", "");
                      formik.setFieldValue("maxPrice", "");
                      setMinprice("");
                      setMaxprice("");
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>
                <div className={classes.filledFilter}>
                  <h4
                    className={classes.filterText}
                    onClick={() => handleFilterClick("area")}
                  >
                    {formik.values.areaMin || 0} მ² -
                    {formik.values.areaMax || 0} მ²
                  </h4>
                  <img
                    className={classes.navIcon}
                    onClick={() => {
                      formik.setFieldValue("areaMin", "");
                      formik.setFieldValue("areaMax", "");
                      setMinArea("");
                      setMaxArea("");
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>
                <div className={classes.filledFilter}>
                  <h4
                    className={classes.filterText}
                    onClick={() => handleFilterClick("bed")}
                  >
                    {formik.values.bedroom}
                  </h4>
                  <img
                    className={classes.navIcon}
                    onClick={() => {
                      formik.setFieldValue("bedroom", "");
                      setBedrooms("");
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>

                <button
                  onClick={() => {
                    formik.resetForm();
                    setMinArea("")
                    setMaxArea("");
                    setBedrooms("")
                    setMinprice("")
                    setMaxprice("")
                    setFilteredRegions([])
                  }}
                  className={classes.reset}
                  type="reset"
                >
                  გასუფთავება
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className={classes.cards}>
        {filterSelected && filteredListings.length > 0 ? (
          filteredListings.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                type={el.is_rental ? "ქირავდება" : "იყიდება"}
                price={el.price || "0"}
                location={el.address || "მითითებული არ არის"}
                bedroom={el.bedrooms || "0"}
                area={el.area || "0"}
                postal={el.zip_code || "0000"}
                src={el.image}
              />
            );
          })
        ) : filterSelected && filteredListings.length === 0 ? (
          <div className={classes.notFound}>
            <h2>აღნიშნული მონაცემებით განცხადება ვერ მოიძებნა</h2>
          </div>
        ) : (
          listings.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                type={el.is_rental ? "ქირავდება" : "იყიდება"}
                price={el.price || "0"}
                location={el.address || "მითითებული არ არის"}
                bedroom={el.bedrooms || "0"}
                area={el.area || "0"}
                postal={el.zip_code || "0000"}
                src={el.image}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Listing;
