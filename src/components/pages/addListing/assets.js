
import * as Yup from "yup";
const token = process.env.REACT_APP_TOKEN;
export const initialValues = {
  type: sessionStorage.getItem("type") || "",
  address: sessionStorage.getItem("address") || "",
  postal: sessionStorage.getItem("postal") || "",
  region: sessionStorage.getItem("region") || "",
  city: sessionStorage.getItem("city") || "",
  price: sessionStorage.getItem("price") || "",
  area: sessionStorage.getItem("area") || "",
  bedrooms: sessionStorage.getItem("bedrooms") || "",
  description: sessionStorage.getItem("description") || "",
  agent: sessionStorage.getItem("agent") || "",
  image:"",
  is_rental:sessionStorage.getItem('type')==="იყიდება"?0:sessionStorage.getItem('type')==="ქირავდება"?1:undefined,
  city_id:sessionStorage.getItem("city_id")||"",
  listingImage:"",
  region_id:sessionStorage.getItem("region_id") || "",
  agent_id:sessionStorage.getItem("agent_id")||''
};
export const  validationSchema = Yup.object().shape({
    address: Yup.string()
      .required("აუცილებელი ველი")
      .min(2, "მინიმუმ 2 სიმბოლო"),
    image: Yup.string()
      .required("აუცილებელია ფოტოს ატვირთვა"),
    postal: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^\d+$/, "მხოლოდ რიცხვები"),
    price: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^\d+$/, "მხოლოდ რიცხვები"),
    area: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^\d*\.?\d+$/, "მხოლოდ რიცხვები"),
    bedrooms: Yup.string()
      .required("აუცილებელი ველი")
      .matches(/^[1-9]\d*$/, "მხოლოდ მთელი რიცხვები"),
    description: Yup.string()
      .required("აუცილებელი ველი")
      .test(
        "minWords",
        "აღწერაში უნდა იყოს მინიმუმ 5 სიტყვა",
        (value) => value && value.trim().split(/\s+/).length >= 5
      ),
    agent: Yup.string().required("აუცილებელი ველი"),
    region: Yup.string().required("აუცილებელი ველი"),
    city: Yup.string().required("აუცილებელი ველი"),
    type: Yup.string().required("აუცილებელი ველი"),
  });
 export const fetchData = async (setRegions,setCities,setAgentList) => {
    try {
      const regions = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/regions');
      const cities = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/cities');
      const agents = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/agents',{
        headers: {
          'Authorization':`Bearer ${token}`,
        'accept':'application/json'
        }
       });
       const agentList = await agents.json()
      const regionsData = await regions.json(); 
      const cityData = await cities.json();
      setRegions(regionsData)
      setCities(cityData)
      setAgentList(agentList)
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  export const changeHandler = (e, formik,setSelectedRegionId,setPreviewSrc)=>{
    const { name, value, files } = e.target;

    if(value){

      if (name === "listingImage") {
        const file = files[0]; 
        const reader = new FileReader();
  
        if (file.size < 1024 * 1024) {
          formik.setFieldValue('image', file); 
  
          reader.onload = () => {
            const imageUrl = reader.result; 
            sessionStorage.setItem("listingImage", imageUrl);
            setPreviewSrc(imageUrl) 
          };
  
          reader.readAsDataURL(file);
        } else {
          alert("მაქსიმალური ზომა არის 1მბ"); 
        }
      }else if(name==='region' ){
        const id = e.target.selectedOptions[0].id;
        setSelectedRegionId(id);
        formik.setFieldValue('region_id',id)
        sessionStorage.setItem(name,value)
        formik.setFieldValue('city','');
        sessionStorage.removeItem('city');
        sessionStorage.setItem('region_id',id);
        sessionStorage.removeItem("city_id")
      } else if(name==='city'){
        const id = e.target.selectedOptions[0].id;
        sessionStorage.setItem("city_id",id)
       sessionStorage.setItem(name,value)
       formik.setFieldValue("city_id",id)
      }
      else if(name==='type'){
       console.log(value);
       if(value==='იყიდება'){
        formik.setFieldValue('is_rental',false)
      }else{
        formik.setFieldValue('is_rental',true)
      }
      formik.setFieldValue(name,value)
      sessionStorage.setItem(name,value)
      } else if(name==='agent'){
        const id = e.target.selectedOptions[0].id;

        sessionStorage.setItem(name,value)
        sessionStorage.setItem('agent_id',id)
        formik.setFieldValue('agent_id',id);

      }else{
        sessionStorage.setItem(name,value)
      }
    }
  }
  export const handleSubmit = async (formData,setSucces,formik) => {
  console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append('address', formData.address);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('region_id', formData.region_id);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('city_id', formData.city_id);
    formDataToSend.append('zip_code', formData.postal);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('area', formData.area);
    formDataToSend.append('bedrooms', formData.bedrooms);
    formDataToSend.append('is_rental',Number(formData.is_rental));
    formDataToSend.append('agent_id', Number(formData.agent_id));

    try {
      const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: formDataToSend, 
      });

  
      if (!response.ok) {
      setSucces(true);
console.log(await response.text());
      setTimeout(() => {
        setSucces(false)
      }, 1500);
    
      } else{
        console.log("SUCCES");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
