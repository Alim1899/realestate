import * as Yup from 'yup';
const token = process.env.REACT_APP_TOKEN;
export  const handleBeforeUnload = () => {
    sessionStorage.clear();
  };

  export const initialValues = {
    agentName: sessionStorage.getItem("agentName") || "",
    agentLastName: sessionStorage.getItem("agentLastName") || "",
    agentEmail: sessionStorage.getItem("agentEmail") || "",
    agentNumber: sessionStorage.getItem("agentNumber") || "",
    image:"",
    agentImage:""
  };

  export const validationSchema = Yup.object().shape({
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
      .required("აუცილებელია ფოტოს ატვირთვა(max.1MB")
  });

  export const changeHandler = (e, formik) => {
    const { name, value, files } = e.target;
  
    if (value) {
      if (name === "agentImage") {
        const file = files[0]; 
        const reader = new FileReader();
  
        if (file.size < 1024 * 1024) {
          formik.setFieldValue('image', file); 
  
          reader.onload = () => {
            const imageUrl = reader.result; 
            sessionStorage.setItem("agentImage", imageUrl); 
          };
  
          reader.readAsDataURL(file);
        } else {
          alert("მაქსიმალური ზომა არის 1მბ"); 
        }
      } else {
        sessionStorage.setItem(name, value);
      }
    } else {
      sessionStorage.removeItem(name);
    }
  };
  


  export const handleSubmit = async (formData,setSucces,formik) => {
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.agentName);
    formDataToSend.append('surname', formData.agentLastName);
    formDataToSend.append('email', formData.agentEmail);
    formDataToSend.append('phone', formData.agentNumber);
    formDataToSend.append('avatar', formData.image);
  
    try {
      const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: formDataToSend, 
      });
  
      if (response.ok) {
      setSucces(true);
     formik.resetForm();
      sessionStorage.clear();
      setTimeout(() => {
        setSucces(false)
      }, 1500);
    
      } 
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

