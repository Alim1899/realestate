import { useState, useEffect } from "react";
import classes from "./Listing.module.css";
import plus from "../../../assets/icons/plus.svg";
import redplus from "../../../assets/icons/redplus.svg";
import x from "../../../assets/icons/x.svg";
import Card from "../card/Card";
import Modal from "../modal/Modal";
import Filters from "./Filters";
import  {openModal,closeModal,getListings} from './assets'
const Listing = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings,setListings] = useState([]);
useEffect(()=>{
  getListings(setListings);
},[])
  return (
    <div className={classes.main}>
      {showModal && <Modal closeModal={(e)=>closeModal(e,setShowModal)} />}
      <div className={classes.nav}>
       <Filters/>
        <div className={classes.adds}>
        <a href="add">
           <button className={classes.addListing} type="button">
            <img className={classes.navIcon} src={plus} alt="plus"></img>
            ლისტინგის დამატება
          </button>
        </a>
         
          <button
            onClick={(e) => openModal(e,setShowModal)}
            className={classes.addAgent}
            type="button"
          >
            <img className={classes.navIcon} src={redplus} alt="plus"></img>
            აგენტის დამატება
          </button>
        </div>
      </div>
      <div className={classes.filled}>
        <div className={classes.filledContent}>
          <div className={classes.filledFilter}>
            <h4 className={classes.filterText}>თბილისი</h4>
            <img className={classes.navIcon} src={x} alt="clear"></img>
          </div>
          <div className={classes.filledFilter}>
            <h4 className={classes.filterText}>55 მ² - 90 მ²</h4>
            <img className={classes.navIcon} src={x} alt="clear"></img>
          </div>
          <div className={classes.filledFilter}>
            <h4 className={classes.filterText}>20000₾ - 100000₾</h4>
            <img className={classes.navIcon} src={x} alt="clear"></img>
          </div>
          <div className={classes.filledFilter}>
            <h4 className={classes.filterText}>1</h4>
            <img className={classes.navIcon} src={x} alt="clear"></img>
          </div>
          <button className={classes.reset} type="reset">
            გასუფთავება
          </button>
        </div>
      </div>
      <div className={classes.cards}>
        {listings.map(el=>{
          return <Card
          key={el.id}
          id={el.id}
          type={el.is_rental?'ქირავდება':"იყიდება"}
          price={el.price||'0'}
          location={el.address||'მითითებული არ არის'}
          bedroom={el.bedrooms||'0'}
          area={el.area||'0'}
          postal={el.zip_code||'0000'}
          src={el.image}
        />
        })}
       
      </div>
    </div>
  );
};

export default Listing;
