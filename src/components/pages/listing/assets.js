import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  minPrice: Yup.string(),
  maxPrice: Yup.string().test(
    "maxPriceGreaterThanMinPrice",
    "შეიყვანეთ ვალიდური რიცხვები",
    function (value) {
      const { minPrice } = this.parent;
      return !minPrice || !value || Number(value) >= Number(minPrice);
    }
  ),
  areaMin:Yup.string(),
  areaMax: Yup.string().test(
    "areaMaxGreatherThanAreaMin",
    "შეიყვანეთ ვალიდური რიცხვები",
    function (value) {
      const { areaMin } = this.parent;
      return !areaMin || !value || Number(value) >= Number(areaMin);
    }
  ),

});
export const initialValues = {
  region: sessionStorage.getItem("selectedRegions") || [],
  minPrice: sessionStorage.getItem("minPrice") || "",
  maxPrice: sessionStorage.getItem("maxPrice") || "",
  areaMin: sessionStorage.getItem("areaMin") || "",
  areaMax: sessionStorage.getItem("areaMax") || "",
  bedroom: sessionStorage.getItem("bedroom") || "",


};
export const handleChange = (e, values, formik) => {
  if (e.target.name === "region") {
    const { value } = e.target;
    const currentSelection = [...values.region];

    if (currentSelection.includes(value)) {
      const newSelection = currentSelection.filter((r) => r !== value);
      sessionStorage.setItem("selectedRegions", newSelection);
      formik.setFieldValue("region", newSelection);
    } else {
      sessionStorage.setItem("selectedRegions", [...currentSelection, value]);
      formik.setFieldValue("region", [...currentSelection, value]);
    }
  }
};

export const getListings = async (setListings) => {
  await fetch(
    "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => setListings(data));
};
export const fetchData = async (setRegions) => {
  try {
    const regions = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions"
    );
    const regionsData = await regions.json();
    setRegions(regionsData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const openModal = (e, setShowModal) => {
  e.preventDefault();
  setShowModal(true);
  document.body.style.overflow = "hidden";
};
export const closeModal = (e, setShowModal) => {
  e.preventDefault();
  setShowModal(false);
  document.body.style.overflow = "auto";
};

export const renderByRegion = (values,setFilteredRegions,showRegionsFilter)=>{
  setFilteredRegions(values)
  showRegionsFilter(false);
}
export const renderByPrice = (min,max,setShowPriceFilter,setMinprice,setMaxprice)=>{
  setMinprice(min?min:0);
  setMaxprice(max);
  setShowPriceFilter(false);
}
export const renderByArea = (min,max,setShowAreaFilter,setMinprice,setMaxprice)=>{
  setMinprice(min?min:0);
  setMaxprice(max);
  setShowAreaFilter(false);
}