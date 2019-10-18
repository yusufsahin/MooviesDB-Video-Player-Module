import React from 'react';
import "./stars.css";
import Star from "./star.jsx"

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      stars: [],
      starAmount: 10,
      starHover: false,
      currentRating: ''
    }
    this.changeStars = this.changeStars.bind(this);
    this.starHoverOn = this.starHoverOn.bind(this);
    this.starHoverOff = this.starHoverOff.bind(this);
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

  render() {
    return (
      <div onMouseLeave={() => {this.props.toggleStars()}} className="stars">
        <div className="star-exit-container">
          <i onClick={() => {this.props.toggleStars()}} className="star-exit fas fa-times-circle"></i>
        </div>
          {this.state.stars.map(item => <Star starHoverOn={this.starHoverOn} starHoverOff={this.starHoverOff} style={item <= this.state.currentRating ? "selected" : ""} changeStars={this.changeStars} key={item} index={item} />)}
          {this.state.starHover && (
            <div className="display-rating">
              <i className="fas fa-star"></i>
              <span className="current-rating-display">{this.state.currentRating}</span>
              <span className="small you">You</span>
            </div>)
          }

      </div>
    )
  }


}



export default Stars;