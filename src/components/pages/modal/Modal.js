import classes from "./Modal.module.css";
import add from '../../../assets/icons/add.svg'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const Modal = (props) => {
  const handleBeforeUnload = () => {
    localStorage.clear();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  
  const initialValues = {
    agentName: localStorage.getItem("agentName") || "",
    agentLastName: localStorage.getItem("agentLastName") || "",
    agentEmail: localStorage.getItem("agentEmail") || "",
    agentNumber: localStorage.getItem("agentNumber") || "",
    image: localStorage.getItem("agentImage") || "",
  };
  const validationSchema = Yup.object().shape({
    agentName: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("აუცილებელია ამ ველის შევსება"),
    agentLastName: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("აუცილებელია ამ ველის შევსება"),
    agentEmail: Yup.string()
      .matches(
        /^[\w.-]+@redberry\.ge$/,
        "ელ.ფოსტა უნდა მთავრდებოდეს @redberry.ge-თი"
      )
      .required("აუცილებელია ამ ველის შევსება"),
    agentNumber: Yup.string()
      .min(2, "მინიმუმ 2 სიმბოლო")
      .required("აუცილებელია ამ ველის შევსება")
      .matches(/^5\d{8}$/, "შეიყვანეთ შემდეგი ფორმატით 5XXXXXXXX"),
      image: Yup.string()
      .required("აუცილებელია ფოტოს ატვირთვა(max.2MB")
  });
  const changeHandler = (e, url)=>{
    if(e.target.value){
      if(e.target.name==='agentImage'){
        console.log(url);
        localStorage.setItem('agentImage',url)
      }else{

       localStorage.setItem(e.target.name,e.target.value)
      }
    }else{
      localStorage.removeItem(e.target.name);
    }
  }
  const submitForm =(errors)=>{
    console.log(errors);
  }
  return (
    <div className={classes.background} onClick={props.closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={classes.main}>
        <h1 className={classes.header}>აგენტის დამატება</h1>
        <Formik
          validateOnChange
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
          
        >
          {(formik) => (
            <Form className={classes.form} onChange={(e)=>changeHandler(e,formik.values.image)}>
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
  onChange={(event) => {
    const file = event.currentTarget.files[0];
    const maxSize = 2*1024*1024;
    if(file.size>maxSize){
      alert("მაქსომალური ასატვირთი ზომა არის 2მბ")
      event.currentTarget.value="";
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result;
        formik.setFieldValue("image", imageURL);
        localStorage.setItem('agentImage',imageURL)
      };

      reader.readAsDataURL(file); 
    }
  }}
/>
    <div className={classes.imgs}>
   { formik.values.image&&<img
      className={classes.preview}
      src={localStorage.getItem('agentImage') } 
      alt="addedImage"
    />}
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
<div className={classes.buttons}>
            <button className={classes.cancel} onClick={props.closeModal} type="button">გაუქმება</button>
            <button className={classes.addBtn} onClick={()=>submitForm(formik)} type="submit">დაამატე აგენტი</button>
          </div>

            </Form>
          )}
          
        </Formik>
        
      </div>
    </div>
  );
};

export default Modal;
