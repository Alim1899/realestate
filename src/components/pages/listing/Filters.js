import classes from './Listing.module.css'
import down from "../../../assets/icons/down.svg";

const Filters = () => {
  return (
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
  )
}

export default Filters
