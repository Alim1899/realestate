export const getListings = async(setListings)=>{
    await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates',{
     headers: {
       'Authorization':`Bearer ${process.env.REACT_APP_TOKEN}`,
     'accept':'application/json'
     }
    })
    .then(response=>response.json())
    .then(data=>setListings(data))
 }

  export const openModal = (e,setShowModal) => {
    e.preventDefault();
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  export const closeModal = (e,setShowModal) => {
    e.preventDefault();
    setShowModal(false);
    document.body.style.overflow = "auto";
  };