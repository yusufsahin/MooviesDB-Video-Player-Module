import React from 'react';
import "./stars.css";
//70,114,214
const Star = (props) => (
  <a className="star-rating-a" onClick={() => {props.addRating()}} onMouseEnter={() => {
      props.starHoverOn()
      props.changeStars.bind(this)(props.index)
    }} onMouseLeave={() => {props.starHoverOff()}}>
    {props.style === "selected" ? <i style={{color: 'rgb(70, 114, 214)'}} className="star-rating star-rating fas fa-star"></i> : <i className="star-rating far fa-star"></i>}
  </a>
)

export default Star;