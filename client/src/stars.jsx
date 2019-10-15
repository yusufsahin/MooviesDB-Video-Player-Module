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
      currentRating: ''
    }
    this.changeStars = this.changeStars.bind(this);
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

  render() {
    return (
      <div onMouseLeave={() => {this.props.toggleStars()}} className="stars">
        {console.log(this.state.currentRating)}
        <div className="star-exit-container">
          <i onClick={() => {this.props.toggleStars()}} className="star-exit fas fa-times-circle"></i>
        </div>
          {this.state.stars.map(item => <Star style={item <= this.state.currentRating ? "selected" : ""} changeStars={this.changeStars} key={item} index={item} />)}
      </div>
    )
  }
}

export default Stars;