import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./TargetListing.module.css";
import back from "../../../assets/icons/back.svg";
import { useEffect, useState } from "react";
import Carousel from "./carousel";
import { getListing, formatDate, deleteListing } from "./assets";
import location from "../../../assets/icons/location.svg";
import area from "../../../assets/icons/area.svg";
import bed from "../../../assets/icons/bed.svg";
import postal from "../../../assets/icons/postal.svg";
import mail from "../../../assets/icons/mail.svg";
import phone from "../../../assets/icons/phone.svg";
import exit from "../../../assets/icons/x.svg";

const TargetListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getListing(setListing, id);
  }, [setListing, id]);
  return (
    listing && (
      <div className={classes.main}>
        <Link to="/">
          <img src={back} alt="back" />
        </Link>
        <div className={classes.details}>
          <div className={classes.image}>
            <img src={listing.image} alt="listingImage" />
            <span className={classes.date}>
              გამოქვეყნების თარიღი:{formatDate(listing.created_at)}
            </span>
          </div>
          <div className={classes.textDetails}>
            <div className={classes.price}>
              <h1>{listing.price.toLocaleString()}₾</h1>
            </div>

            <div className={classes.littleDetails}>
              <h2>
                <img src={location} alt="location" />
                {listing.city.name}, {listing.address}
              </h2>
              <h2>
                <img src={area} alt="area" />
                ფართი {listing.area}
              </h2>
              <h2>
                <img src={bed} alt="bed" />
                საძინებელი {listing.bedrooms}
              </h2>
              <h2>
                <img src={postal} alt="postal" />
                საფოსტო ინდექსი {listing.zip_code}
              </h2>
            </div>
            <div className={classes.description}>{listing.description}</div>
            <div className={classes.agentDetails}>
              <div className={classes.agentName}>
                <img
                  className={classes.avatar}
                  src={listing.agent.avatar}
                  alt="agentName"
                />
                <div className={classes.position}>
                  <h2 className={classes.name}>
                    {listing.agent.name} {listing.agent.surname}
                  </h2>
                  <h2>აგენტი</h2>
                </div>
              </div>
              <div className={classes.contact}>
                <h2>
                  <img src={mail} alt="mail" />
                  {listing.agent.email}
                </h2>
                <h2>
                  <img src={phone} alt="mail" />
                  {listing.agent.phone}
                </h2>
              </div>
            </div>
            <div className={classes.delete}>
              <button
                className={classes.deleteBtn}
                onClick={() => setShowModal(true)}
                type="button"
              >
                ლისტინგის წაშლა
              </button>
            </div>
          </div>
          {showModal && (
            <div className={classes.deleteListing}>
              <div className={classes.content}>
                <div className={classes.exit}>
                  <img
                    src={exit}
                    alt="exit"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <h2 className={classes.question}>გსურთ წაშალოთ ლისტინგი?</h2>
                <div className={classes.options}>
                  <button
                    className={classes.option1}
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    გაუქმება
                  </button>
                  <Link to="/">
                    <button
                      onClick={() => deleteListing(id)}
                      className={classes.option2}
                      type="button"
                    >
                      დადასტურება
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <Carousel />
      </div>
    )
  );
};

export default TargetListing;
