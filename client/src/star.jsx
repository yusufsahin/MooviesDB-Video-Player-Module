import React from 'react';
import "./css/stars.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';



const Star = (props) => (
  <a className="star-rating-a" onClick={() => {props.addRating()}} onMouseEnter={() => {
      props.starHoverOn()
      props.changeStars.bind(this)(props.index)
    }} onMouseLeave={() => {props.starHoverOff()}}>
    {props.style === "selected" ? <FontAwesomeIcon icon={fasStar} style={{color: 'rgb(70, 114, 214)', margin: '1px', fontSize: "16px"}} /> : <FontAwesomeIcon icon={farStar} style={{color: "rgb(192, 192, 192)",margin: '1px', fontSize: "16px"}} />}
  </a>
)

export default Star;
