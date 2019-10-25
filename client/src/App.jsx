import React, { Component } from "react";
import "./css/App.css";
import Stars from "./stars.jsx"
import VideoPlayerLarge from "./VideoPlayerLarge.jsx"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selected: '',
      showStars: false,
      showLarge: false,
      rated: false,
      selectedIdx: ''
    }
    this.toggleStars = this.toggleStars.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.toggleLargeVideo = this.toggleLargeVideo.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }

  toggleStars() {
    this.setState({
      showStars: !this.state.showStars
    })
  }

  componentDidMount() {
    let id = (Number(window.location.href.slice(22,25)) >= 100) && (Number(window.location.href.slice(22,25)) <= 199) ? window.location.href.slice(22,25) : '100';
    console.log(window.location.href.slice(22,25));
    fetch(`http://localhost:3000/api/videoplayer/data/${id}`)
      .then(response => response.json())
      .then((jsonResponse1) => {
        fetch('http://localhost:3000/api/videoplayer/data')
        .then(response => response.json())
        .then(jsonResponse => this.setState({
          videos: jsonResponse1.concat(jsonResponse.slice(1)),
          selected: jsonResponse1[0],
          selectedIdx: 0
        }));
      });
  }

  handleRating(newState, rating) {
    this.setState({
      videos: newState,
      selected: this.state.selected,
      rated: rating
    })
  }

  toggleLargeVideo() {
    this.setState({
      showLarge: !this.state.showLarge
    })
  }

  changeVideo(idx) {
    this.setState({
      selected: this.state.videos[idx],
      selectedIdx: idx
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.showLarge && (
          <VideoPlayerLarge selectedIdx={this.state.selectedIdx} changeVideo={this.changeVideo} toggleLargeVideo={this.toggleLargeVideo} selected={this.state.selected} videos={this.state.videos} />
        )}
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
              {this.state.showStars && <Stars handleRating={this.handleRating} moovie={this.state.selected} toggleStars={this.toggleStars}/>}
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
          <i onClick={() => {this.toggleLargeVideo()}}className=" playButton far fa-play-circle"></i>
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