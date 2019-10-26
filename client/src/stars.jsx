import React from 'react';
import "./css/stars.css";
import Star from "./star.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMoovie: this.props.moovie,
      selected: false,
      stars: [],
      starHover: false,
      currentRating: '',
      rated: false
    }
    this.changeStars = this.changeStars.bind(this);
    this.starHoverOn = this.starHoverOn.bind(this);
    this.starHoverOff = this.starHoverOff.bind(this);
    this.addRating = this.addRating.bind(this);
  }

  componentDidMount() {
    this.appendStars(10);
  }

  appendStars(num) {
    let array = [];
    for (let i = 1; i <= 10; i++) {
      array.push(i);
    }
    this.setState({
      stars: array
    })
  }

  changeStars(e) {
    this.setState({
      currentRating: e
    })
  }

  starHoverOn() {
    this.setState({
      starHover: true
    })
  }

  starHoverOff() {
    this.setState({
      starHover: false
    })
  }

  addRating() {
    const url = `http://localhost:3000/api/videoplayer/data/${this.state.selectedMoovie._id}/${this.state.currentRating}`;

    fetch(url)
    .then(response => response.json())
    .then((jsonResponse) => {
      this.setState({rated: this.state.currentRating})
      this.props.handleRating(jsonResponse, this.state.currentRating)})
  }

  render() {

    const fontAwesomeFaTimesCircle = {
      fontSize: "16px",
      margin: "1px"
    }

    const fontAwesomeFasStar = {
      position: "relative",
      fontSize: "27px",
      left: "10px",
      top: "11px",
      color: "rgb(100, 141, 237)"
    }
    return (
      <div onMouseLeave={() => {this.props.toggleStars()}} className="stars">
        <div onClick={() => {this.props.toggleStars()}}  className="star-exit-container">
          <FontAwesomeIcon icon={faTimesCircle} style={fontAwesomeFaTimesCircle} />
        </div>
          {this.state.stars.map(item => <Star addRating={this.addRating} starHoverOn={this.starHoverOn} starHoverOff={this.starHoverOff} style={item <= this.state.currentRating ? "selected" : ""} changeStars={this.changeStars} key={item} index={item} />)}
          {(this.state.rated || this.state.starHover) && (
            <div className="display-rating">
              <FontAwesomeIcon icon={fasStar} style={fontAwesomeFasStar} />
              <span className="current-rating-display">{this.state.rated || this.state.currentRating}</span>
              <span className="small you">You</span>
            </div>)
          }
      </div>
    )
  }


}



export default Stars;