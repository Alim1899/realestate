import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  validationSchema,
  initialValues,
  fetchData,
  handleSubmit,
  changeHandler,
} from "./assets";
import add from "../../../assets/icons/add.svg";
import classes from "./AddListing.module.css";
const AddListing = () => {
  const [succes, setSucces] = useState(false);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agentList,setAgentList] = useState([]);
  const [previewSrc,setPreviewSrc] = useState(sessionStorage.getItem("listingImage"))
  const [selectedRegionId, setSelectedRegionId] = useState(sessionStorage.getItem('region_id')||'');

  useEffect(() => {
    fetchData(setRegions, setCities,setAgentList);
 
  }, []);


  return (
    <div className={classes.main}>
      <h2 className={classes.header}>ლისტინგის დამატება</h2>
      <Formik
        validateOnChange={true}
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
        }}
      >
        {(formik) => (
          <Form
            className={classes.form}
            onChange={(e) => changeHandler(e, formik,setSelectedRegionId,setPreviewSrc)}
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
                        <option id={el.id} key={el.id}>
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
                  <Field type="number" name="price" value={formik.values.price} />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className={classes.error}
                  />
                </label>
                <label htmlFor="area">
                  ფართობი
                  <Field type="number" name="area" value={formik.values.area} />
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
                  as='textarea'
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
                  />
                  <div className={classes.imgs}>
                    {formik.values.image && (
                      <img
                        className={classes.preview}
                        src={previewSrc}
                        alt="addedImage"
                      />
                    )}
                    <img
                      className={classes.addIcon}
                      src={add}
                      alt="add"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
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
                  {agentList.map(el=>{
                    
                    return <option key={el.id} id={el.id}>{el.name+' '+el.surname}</option>
                  })}
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
              <button onClick={()=>handleSubmit(formik.values, setSucces,formik)} className={classes.addBtn} type="submit">
                დაამატე ლისტინგი
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {succes && (
          <div className={classes.succes}>
            <h1 className={classes.succesMessage}>განცხადება დამატებულაი✅</h1>
          </div>
        )}
    </div>
  );
};

export default AddListing;
