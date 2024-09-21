import { useEffect, useState } from "react";
import plus from "../../../assets/icons/plus.svg";
import redplus from "../../../assets/icons/redplus.svg";
import up from "../../../assets/icons/up.svg";
import down from "../../../assets/icons/down.svg";
import { renderByRegion, renderByPrice } from "./assets";
import classes from "./Listing.module.css";
import { fetchData } from "./assets";
const Navigation = ({
  formik,
  Field,
  ErrorMessage,
  openModal,
  setShowModal,
  setFilteredRegions,
  setFilterSelected,
  showPriceFilter,
  setShowPriceFilter,
 setMinprice,setMaxprice
}) => {
  const [regionsFilter, showRegionsFilter] = useState(false);
  const [regions, setRegions] = useState([]);
  useEffect(() => {
    fetchData(setRegions);
  }, []);

  return (
    <div className={classes.nav}>
      <div className={classes.filters}>
        {/* COMPLETED |||||||||||||||||||||||||||||||||||||||||\*/}
       
       
       
        <div className={classes.region}>
          <button
            className={classes.filter}
            onClick={() => showRegionsFilter(!regionsFilter)}
            type="button"
          >
            რეგიონი
            <img
              src={regionsFilter ? up : down}
              className={classes.filterIcon}
              alt="down"
            ></img>
          </button>
          {regionsFilter && (
            <div className={classes.regions}>
              <h3 className={classes.regionHead}>რეგიონების მიხედვით:</h3>
              <div className={classes.checkboxes}>
                {regions.map((region) => (
                  <div key={region.id} className={classes.checked}>
                    <Field
                      key={region.id}
                      type="checkbox"
                      name="region"
                      as="input"
                      checked={formik.values.region.includes(region.name)}
                      value={region.name}
                    />
                    <h3 className={classes.regionName}>{region.name}</h3>
                  </div>
                ))}
              </div>
              <div className={classes.regionBtn}>
                <button
                  onClick={() =>
                    renderByRegion(
                      formik.values.region,
                      setFilteredRegions,
                      setFilterSelected,
                      showRegionsFilter
                    )
                  }
                  type="button"
                >
                  არჩევა
                </button>
              </div>
            </div>
          )}
        </div>
        {/* |||||||||||||||||||||||||||||||||||||||||||||||| */}

        <div className={classes.price}>
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            type="button"
            className={classes.filter}
          >
            საფასო კატეგორია
            <img
              src={showPriceFilter ? up : down}
              className={classes.filterIcon}
              alt="down"
            ></img>
          </button>
          {showPriceFilter && (
            <div className={classes.priceFilter}>
              <div className={classes.prices}>
                <h3 className={classes.priceHead}>ფასის მიხედვით</h3>
                <div className={classes.minmax}>
                  <div className={classes.minPrice}>
                    <Field
                      name="minPrice"
                      type="number"
                      value={formik.values.minPrice}
                    />
                    <span>₾</span>
                    <div className={classes.priceExamples}>
                      <h5>მინ. ფასი</h5>
                      <h4
                        onClick={(e) => formik.setFieldValue("minPrice", 50000)}
                      >
                        50 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("minPrice", 100000)
                        }
                      >
                        100 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("minPrice", 150000)
                        }
                      >
                        150 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("minPrice", 200000)
                        }
                      >
                        200 000 ₾
                      </h4>
                      <h4
                        onClick={(e) => formik.setFieldValue("minPrice", 30000)}
                      >
                        300 000 ₾
                      </h4>
                    </div>
                  </div>
                  <div className={classes.maxPrice}>
                    <Field
                      name="maxPrice"
                      type="number"
                      value={formik.values.maxPrice}
                    />
                    <span>₾</span>
                    <div className={classes.priceExamples}>
                      <h5>მაქს. ფასი</h5>
                      <h4
                        onClick={(e) => formik.setFieldValue("maxPrice", 50000)}
                      >
                        50 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("maxPrice", 100000)
                        }
                      >
                        100 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("maxPrice", 150000)
                        }
                      >
                        150 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("maxPrice", 200000)
                        }
                      >
                        200 000 ₾
                      </h4>
                      <h4
                        onClick={(e) =>
                          formik.setFieldValue("maxPrice", 300000)
                        }
                      >
                        300 000 ₾
                      </h4>
                    </div>
                  </div>
                </div>
                <ErrorMessage
                  name="maxPrice"
                  component="div"
                  className={classes.error}
                />
              </div>
              <div className={classes.priceBtn}>
                <button
                className={classes.selectBtn}
                  onClick={() =>
                    renderByPrice(
                      formik.values.minPrice,
                      formik.values.maxPrice,
                      setShowPriceFilter,
                      setFilterSelected,
                      setMinprice,
                      setMaxprice
                    )
                  }
                  type="button"
                  disabled={formik.values.minPrice > formik.values.maxPrice}
                >
                  არჩევა
                </button>
              </div>
            </div>
          )}
        </div>














        <button className={classes.filter}>
          ფართობი
          <img src={down} className={classes.filterIcon} alt="down"></img>
        </button>
        <button className={classes.filter}>
          საძინებლების რაოდენობა
          <img src={down} className={classes.filterIcon} alt="down"></img>
        </button>
      </div>
      <div className={classes.adds}>
        <a href="add">
          <button className={classes.addListing} type="button">
            <img className={classes.navIcon} src={plus} alt="plus"></img>
            ლისტინგის დამატება
          </button>
        </a>

        <button
          onClick={(e) => openModal(e, setShowModal)}
          className={classes.addAgent}
          type="button"
        >
          <img className={classes.navIcon} src={redplus} alt="plus"></img>
          აგენტის დამატება
        </button>
      </div>
    </div>
  );
};

export default Navigation;
