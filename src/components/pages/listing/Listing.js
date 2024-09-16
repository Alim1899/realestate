import { useState } from "react";
import classes from "./Listing.module.css";
import plus from "../../../assets/icons/plus.svg";
import redplus from "../../../assets/icons/redplus.svg";
import down from "../../../assets/icons/down.svg";
import x from "../../../assets/icons/x.svg";
import Card from "../card/Card";
import Modal from "../modal/Modal";
const Listing = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div className={classes.main}>
      {showModal && <Modal closeModal={closeModal} />}
      <div className={classes.nav}>
        <div className={classes.filters}>
          <button className={classes.filter}>
            რეგიონი
            <img src={down} className={classes.filterIcon} alt="down"></img>
          </button>
          <button className={classes.filter}>
            საფასო კატეგორია
            <img src={down} className={classes.filterIcon} alt="down"></img>
          </button>
          <button className={classes.filter}>
            ფართობი
            <img src={down} className={classes.filterIcon} alt="down"></img>
          </button>
          <button className={classes.filter}>
            საძინებლების რაოდენობა
            <img src={down} className={classes.filterIcon} alt="down"></img>
          </button>
        </div>
        <div className={classes.adds}>
        <a href="add">
           <button className={classes.addListing} type="button">
            <img className={classes.navIcon} src={plus} alt="plus"></img>
            ლისტინგის დამატება
          </button>
        </a>
         
          <button
            onClick={(e) => openModal(e)}
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
        <Card
          type="ქირავდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="იყიდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="გირავდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="იყიდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="ქირავდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="გირავდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="ქირავდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
        <Card
          type="იყიდება"
          price="123000"
          location="თბილისი, ჭავჭავაძის 23ა"
          bedroom="2"
          area="55"
          postal="4500"
        />
      </div>
    </div>
  );
};

export default Listing;
