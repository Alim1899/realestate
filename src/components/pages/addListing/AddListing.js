import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  validationSchema,
  initialValues,
  fetchData,
  submitForm,
  changeHandler,
} from "./assets";
import add from "../../../assets/icons/add.svg";
import classes from "./AddListing.module.css";
const AddListing = () => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(localStorage.getItem('selectedRegionId')||'');

  useEffect(() => {
    fetchData(setRegions, setCities);
  }, []);

  return (
    <div className={classes.main}>
      <h2 className={classes.header}>ლისტინგის დამატება</h2>
      <Formik
        validateOnChange
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form
            className={classes.form}
            onSubmit={() => submitForm(formik.errors)}
            onChange={(e) => changeHandler(e, formik.values.image)}
          >
            <div className={classes.type}>
              <h2 className={classes.fieldHead}>გარიგების ტიპი:</h2>
              <Field type="radio" name="type" value="იყიდება" />
              <span className={classes.saleType}>იყიდება</span>

              <Field type="radio" name="type" value="ქირავდება" />
              <span className={classes.saleType}>ქირავდება</span>
              <ErrorMessage
                name="type"
                component="div"
                className={classes.error}
              />
            </div>

            <div className={classes.address}>
              <h2 className={classes.fieldHead}>მდებარეობა</h2>
              <div className={classes.location}>
                <label htmlFor="address">
                  მისამართი *<Field type="text" name="address"></Field>
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={classes.error}
                  />{" "}
                </label>
                <label htmlFor="postal">
                  საფოსტო ინდექსი *<Field type="text" name="postal"></Field>
                  <ErrorMessage
                    name="postal"
                    component="div"
                    className={classes.error}
                  />
                </label>
              </div>

              <div className={classes.region}>
                <label htmlFor="region">
                  რეგიონი
                  <Field
                    onChange={(e) => {
                      const selectedRegionId = e.target.selectedOptions[0].id;
                      setSelectedRegionId(selectedRegionId);
                      formik.values.city = "";
                      formik.handleChange(e);
                    }}
                    as="select"
                    name="region"
                    value={formik.values.region}
                  >
                    <option value="" disabled>
                      აირჩიე რეგიონი
                    </option>
                    {regions.map((el) => {
                      return (
                        <option id={el.id} key={el.id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="region"
                    component="div"
                    className={classes.error}
                  />
                </label>

                <label htmlFor="city">
                  ქალაქი
                  <Field as="select" name="city" value={formik.values.city}>
                    <option value="" disabled>
                      აირჩიე ქალაქი
                    </option>
                    {cities.map((el) => {
                      return el.region_id === Number(selectedRegionId) ? (
                        <option id={el.region_id} key={el.id}>
                          {el.name}
                        </option>
                      ) : null;
                    })}
                  </Field>
                  <ErrorMessage
                    name="city"
                    component="div"
                    className={classes.error}
                  />
                </label>
              </div>
            </div>

            <div className={classes.details}>
              <h2 className={classes.fieldHead}>ბინის დეტალები</h2>
              <div className={classes.about}>
                <label htmlFor="price">
                  ფასი
                  <Field type="text" name="price" value={formik.values.price} />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className={classes.error}
                  />
                </label>
                <label htmlFor="area">
                  ფართობი
                  <Field type="text" name="area" value={formik.values.area} />
                  <ErrorMessage
                    name="area"
                    component="div"
                    className={classes.error}
                  />
                </label>
                <label htmlFor="bedrooms">
                  საძინებლების რაოდენობა*
                  <Field
                    type="text"
                    name="bedrooms"
                    value={formik.values.bedrooms}
                  />
                  <ErrorMessage
                    name="bedrooms"
                    component="div"
                    className={classes.error}
                  />
                </label>
              </div>
              <div className={classes.description}>
                <label>
                  აღწერა
                  <Field
                    type="text"
                    name="description"
                    values={formik.values.description}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className={classes.error}
                  />
                </label>
              </div>
            </div>

            <div className={classes.photoInput}>
              <label htmlFor="listingImage">ატვირთეთ ფოტო:</label>
              <div className={classes.photoInputField}>
                <Field
                  id="fileInput"
                  name="listingImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    const maxSize = 1024 * 1024;
                    if (file.size > maxSize) {
                      alert("მაქსომალური ასატვირთი ზომა არის 1მბ");
                      event.currentTarget.value = "";
                      return;
                    }

                    if (file && file.type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const imageURL = reader.result;
                        formik.setFieldValue("image", imageURL);
                        localStorage.setItem("listingImage", imageURL);
                      };

                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className={classes.imgs}>
                  {formik.values.image && (
                    <img
                      className={classes.preview}
                      src={localStorage.getItem("listingImage")}
                      alt="addedImage"
                    />
                  )}
                  <img
                    className={classes.addIcon}
                    src={add}
                    alt="add"
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                </div>
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className={classes.error}
              />
            </div>
            <div className={classes.agent}>
              <h2 className={classes.fieldHead}>აგენტი</h2>
              <label htmlFor="agent">
                აირჩიე
                <Field as="select" name="agent" value={formik.values.agent}>
                  <option disabled value="">
                    აირჩიე აგენტი
                  </option>
                  <option>გიორგი ბრეგვაძე</option>
                  <option>შოთა ბრეგვაძე</option>
                  <option>ნანი ბრეგვაძე</option>
                </Field>
                <ErrorMessage
                  name="agent"
                  component="div"
                  className={classes.error}
                />
              </label>
            </div>
            <div className={classes.buttons}>
              <button className={classes.cancel} type="button">
                <a href="/">გაუქმება</a>
              </button>
              <button className={classes.addBtn} type="submit">
                დაამატე ლისტინგი
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddListing;
