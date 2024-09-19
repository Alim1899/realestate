
import * as Yup from "yup";
const token = process.env.REACT_APP_TOKEN;

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
      .matches(/^\d+$/, "მხოლოდ რიცხვები"),
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

  export const initialValues = {
    type: localStorage.getItem("type") || "",
    address: localStorage.getItem("address") || "",
    postal: localStorage.getItem("postal") || "",
    region: localStorage.getItem("region") || "",
    city: localStorage.getItem("city") || "",
    price: localStorage.getItem("price") || "",
    area: localStorage.getItem("area") || "",
    bedrooms: localStorage.getItem("bedrooms") || "",
    description: localStorage.getItem("description") || "",
    agent: localStorage.getItem("agent") || "",
    image: localStorage.getItem("listingImage") || "",
    selectedRegionId:localStorage.getItem("selectedRegionId") || ""
  };

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
  
  export const submitForm =(errors)=>{
    console.log(errors);
  }

  export const changeHandler = (e, url)=>{
    if(e.target.value){
      if(e.target.name==='listingImage'){
        console.log(url);
        localStorage.setItem('listingImage',url)
      }else if(e.target.name==='region'){
        localStorage.setItem(e.target.name,e.target.value)
        localStorage.setItem("selectedRegionId",e.target.selectedOptions[0].id)
      }   else{

       localStorage.setItem(e.target.name,e.target.value)
      }
    }else{
      localStorage.removeItem(e.target.name);
    }
  }


 