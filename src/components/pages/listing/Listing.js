import { useState, useEffect } from "react";
import classes from "./Listing.module.css";
import x from "../../../assets/icons/x.svg";
import down from "../../../assets/icons/down.svg";
import Card from "../card/Card";
import Modal from "../modal/Modal";
import { openModal, closeModal, getListings, initialValues } from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navigation from "./Navigation";
const Listing = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [allSelectedRegions, showAllSelectedRegions] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);
  const [listingSelected, setListingSelected] = useState(false);

  useEffect(() => {
    getListings(setListings);
  }, []);

  useEffect(() => {
    const filterListings = (listings, selectedRegions) => {
      const newListing = listings.filter((listing) =>
        selectedRegions.includes(listing.city.region.name)
      );
      setFilteredListings(newListing);
    };
    console.log(listingSelected);
    filterListings(listings, filteredRegions);
  }, [listings, filteredRegions, listingSelected]);

  return (
    <div className={classes.main}>
      {showModal && <Modal closeModal={(e) => closeModal(e, setShowModal)} />}
      <Formik
        initialValues={initialValues}
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
              setListingSelected={setListingSelected}
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
                      formik.setFieldValue("region", [])
                      setListingSelected(false)}}
                    src={x}
                    alt="clear"
                  ></img>
                </div>

                <div className={classes.filledFilter}>
                  <h4 className={classes.filterText}>55 მ² - 90 მ²</h4>
                  <img className={classes.navIcon} src={x} alt="clear"></img>
                </div>
                <div className={classes.filledFilter}>
                  <h4 className={classes.filterText}>20000₾ - 100000₾</h4>
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
        {listingSelected && filteredListings.length > 0 ? (
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
        ) : listingSelected && filteredListings.length === 0 ? (
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
