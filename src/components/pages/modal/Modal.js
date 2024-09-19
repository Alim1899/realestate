import classes from "./Modal.module.css";
import add from "../../../assets/icons/add.svg";
import {
  initialValues,
  validationSchema,
  changeHandler,
  handleSubmit,
} from "./assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
const Modal = (props) => {
  const [succes, setSucces] = useState(false);

  return (
    <div className={classes.background} onClick={props.closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={classes.main}>
        <h1 className={classes.header}>აგენტის დამატება</h1>
        <Formik
          validateOnBlur={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange={true}
        >
          {(formik) => (
            <Form
              className={classes.form}
              onChange={(e) => changeHandler(e, formik)}
            >
              <div className={classes.fullName}>
                <div className={classes.name}>
                  <label htmlFor="agentName">
                    სახელი
                    <Field
                      name="agentName"
                      type="text"
                      value={formik.values.agentName}
                    ></Field>
                  </label>
                  <ErrorMessage
                    name="agentName"
                    component="div"
                    className={classes.error}
                  />
                </div>
                <div className={classes.lastName}>
                  <label htmlFor="agentLastName">
                    გვარი
                    <Field
                      name="agentLastName"
                      type="text"
                      value={formik.values.agentLastName}
                    ></Field>
                  </label>
                  <ErrorMessage
                    name="agentLastName"
                    component="div"
                    className={classes.error}
                  />
                </div>
              </div>
              <div className={classes.contact}>
                <div className={classes.number}>
                  <label htmlFor="agentEmail">
                    ელ.ფოსტა
                    <Field
                      name="agentEmail"
                      type="email"
                      value={formik.values.agentEmail}
                    />
                  </label>
                  <ErrorMessage
                    name="agentEmail"
                    component="div"
                    className={classes.error}
                  />
                </div>

                <div className={classes.email}>
                  <label htmlFor="agentNumber">
                    ტელეფონი
                    <Field
                      name="agentNumber"
                      type="text"
                      value={formik.values.agentNumber}
                    />
                  </label>
                  <ErrorMessage
                    name="agentNumber"
                    component="div"
                    className={classes.error}
                  />
                </div>
              </div>
              <div className={classes.photoInput}>
                <label htmlFor="agentImage">ატვირთეთ ფოტო:</label>
                <div className={classes.photoInputField}>
                  <Field
                    id="fileInput"
                    name="agentImage"
                    type="file"
                    accept="image/*"
                  />
                  <div className={classes.imgs}>
                    {formik.values.image && (
                      <img
                        className={classes.preview}
                        src={sessionStorage.getItem("agentImage")}
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
              <div className={classes.buttons}>
                <button
                  className={classes.cancel}
                  onClick={props.closeModal}
                  type="button"
                >
                  გაუქმება
                </button>
                <button
                  className={classes.addBtn}
                  onClick={() => handleSubmit(formik.values, setSucces, formik)}
                  type="submit"
                >
                  დაამატე აგენტი
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {succes && (
          <div className={classes.succes}>
            <h1 className={classes.succesMessage}>აგენტი დამატებულაი✅</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
