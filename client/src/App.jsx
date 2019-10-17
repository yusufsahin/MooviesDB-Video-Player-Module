import React, { Component } from "react";
import "./App.css";
import Stars from "./stars.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selected: '',
      showStars: false,
      showLarge: false
    }
    this.toggleStars = this.toggleStars.bind(this);
  }

  toggleStars() {
    this.setState({
      showStars: !this.state.showStars
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/videoplayer/data')
      .then(response => response.json())
      .then(jsonResponse => this.setState({
        videos: jsonResponse,
        selected: jsonResponse[3]
      }));
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <div className="logo">
            <h1>mooviesDB</h1>
          </div>
        </div>
        <div className="videoPlayerSmall">
          <span className="plus">+</span>
          <i className="bookmark fas fa-bookmark"></i>
          <div className="header-top-line">
            <span className="title white">{this.state.selected.title}</span>
            <span className="year grey">({this.state.selected.date})</span>
            <div className="ratings-container">
              <div className="ratings-container-left">
                <i className="fas fa-star"></i>
                <div className="rcl2">
                  <h2 className="average white">{this.state.selected.averageRating}<span className="outOf grey small">/10</span></h2>
                  <p className="totalRatings small grey">{this.state.selected.ratings}</p>
                </div>
              </div>
              <div onClick={this.toggleStars} className="ratings-container-right">
                <i className="far fa-star"></i>
                <p className="rateThis white small">Rate This</p>
              </div>
              {this.state.showStars && <Stars toggleStars={this.toggleStars}/>}
            </div>
          </div>
          <div className="header-bottom-line">
            <span className="content-rating">R</span>
            <span className="runtime">{this.state.selected.running_time} seconds</span>
            <span className="genres">Pasture, Cows, Hacking</span>
            <span className="release-date">{this.state.selected.date} (USA)</span>
          </div>
        </div>
        <div className="photo-thumbnail-main">
          <img src={this.state.selected.thumbnail_url}></img>
        </div>
        <p className="photo-thumbnail-title">{this.state.selected.title}</p>
        <div className="video-thumbnail-main">
          <video key={this.state.selected.video_url}>
            <source src={this.state.selected.video_url} type="video/mp4"/>
          </video>
          <i className=" playButton far fa-play-circle"></i>
          <div className="video-footer">
            <div>
              <span className="video-footer-running-time">0:{Number(this.state.selected.running_time) < 10 ? '0' + this.state.selected.running_time : this.state.selected.running_time}</span>
              <span>Trailer</span>
            </div>
            <div>
              <span className="video-footer-total-videos">29 VIDEOS</span>
              <span>189 IMAGES</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;