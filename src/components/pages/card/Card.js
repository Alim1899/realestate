import bedroom from "../../../assets/icons/bed.svg";
import location from "../../../assets/icons/location.svg";
import postal from "../../../assets/icons/postal.svg";
import area from "../../../assets/icons/area.svg";
import home from "../../../assets/photos/cardHome.jpg";
import classes from "./Card.module.css";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/card/${id}`);
  };

  return (
    <div
      className={classes.main}
      id={props.id}
      onClick={(e) => {
        handleCardClick(e.currentTarget.id);
      }}
    >
      <img
        className={classes.mainPhoto}
        src={props.src || home}
        alt="homePhoto"
      ></img>
      <h4 className={classes.saleType}>{props.type}</h4>
      <div className={classes.details}>
        <div className={classes.priceAndLocation}>
          <h4 className={classes.price}>
            {Number(props.price).toLocaleString("fr-FR") + " ₾"}
          </h4>
          <h4 className={classes.location}>
            <img
              className={classes.homeIcon}
              src={location}
              alt="location"
            ></img>
            {props.location}
          </h4>
        </div>
        <div className={classes.littleDetails}>
          <h4 className={classes.detailText}>
            <img className={classes.homeIcon} src={bedroom} alt="bedroom"></img>
            {props.bedroom}
          </h4>
          <h4 className={classes.detailText}>
            <img className={classes.homeIcon} src={area} alt="area"></img>
            {props.area}მ²
          </h4>
          <h4 className={classes.detailText}>
            <img className={classes.homeIcon} src={postal} alt="postal"></img>
            {props.postal}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
