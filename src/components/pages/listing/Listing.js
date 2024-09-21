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
  const [allSelectedRegions, showAllSelectedRegions] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);

  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);
  const [min, setMinprice] = useState('');
  const [max, setMaxprice] = useState('');

 useEffect(() => {
  const filterListings = () => {
    let regionFilteredListings = listings.filter((listing) =>
      filteredRegions.includes(listing.city.region.name)
    );
    let priceFilteredListings = listings;
    if (min < max) {
      priceFilteredListings = listings.filter(
        (el) => el.price >= min && el.price <= max
      );
    }else{
      console.log(regionFilteredListings);
      setFilteredListings(regionFilteredListings);
      return;
    }
    const combinedListings = listings.filter(
      (listing) =>
        regionFilteredListings.includes(listing) || 
        priceFilteredListings.includes(listing)
    );

    setFilteredListings(combinedListings);
  };

  filterListings();
}, [listings, filteredRegions, min, max]);

useEffect(() => {
  getListings(setListings);
}, []);
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
              Field={Field}
              ErrorMessage={ErrorMessage}
              formik={formik}
              setFilteredRegions={setFilteredRegions}
              setFilterSelected={setFilterSelected}
              showPriceFilter={showPriceFilter}
              setShowPriceFilter={setShowPriceFilter}
              setMinprice={setMinprice}
              setMaxprice={setMaxprice}
            />
            <div className={classes.filled}>
              <div className={classes.filledContent}>
                <div className={classes.filledFilter}>
                  {formik.values.region.length < 1 ? (
                    <div>
                      <h4 className={classes.inputRegion}>ცარიელია</h4>
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
                          onClick={() =>
                            showAllSelectedRegions(!allSelectedRegions)
                          }
                          src={down}
                          alt="down"
                        />
                      </h4>
                      <div className={classes.multiRegion}>
                        {allSelectedRegions &&
                          formik.values.region.slice(1).map((el) => {
                            return (
                              <h4
                                key={Math.random()}
                                className={classes.inputRegion}
                              >
                                {el}
                              </h4>
                            );
                          })}
                      </div>
                    </div>
                  )}
                  <img
                    className={classes.navIcon}
                    onClick={() => {
                      formik.setFieldValue("region", []);
                     setFilteredRegions([])
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>

                <div className={classes.defaultPrice}>
                  <h4
                    onClick={() => {
                      setShowPriceFilter(!showPriceFilter);
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
                    }}
                    src={x}
                    alt="clear"
                  ></img>
                </div>
                <div className={classes.filledFilter}>
                  <h4 className={classes.filterText}>55 მ² - 90 მ²</h4>
                  <img className={classes.navIcon} src={x} alt="clear"></img>
                </div>
                <div className={classes.filledFilter}>
                  <h4 className={classes.filterText}>1</h4>
                  <img className={classes.navIcon} src={x} alt="clear"></img>
                </div>
                <button className={classes.reset} type="reset">
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
