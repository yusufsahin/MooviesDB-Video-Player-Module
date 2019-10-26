import React, { Component } from "react";
import "./css/App.css";
import Stars from "./stars.jsx"
import VideoPlayerLarge from "./VideoPlayerLarge.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';



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
    let id = (Number(window.location.href.slice(23)) >= 100) && (Number(window.location.href.slice(23)) <= 199) ? window.location.href.slice(23) : '100';
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

    const fontAwesomeFarStar = {
      position: "relative",
      top: "7px",
      display: "inline",
      fontSize: "28px",
      color: "rgb(133, 133, 133)"
    }

    const fontAwesomeFasStar = {
      position: "relative",
      top: "-3px",
      color: "rgb(232, 183, 6)",
      display: "inline",
      fontSize: "28px"
    }

    const fontAwesomeFaBookmark = {
      fontSize: "55px",
      position: "absolute",
      top: "15px",
      left: "20px",
      zIndex: 1,
      color: "rgb(119, 119, 119)"
    }

    const fontAwesomeFaPlayCircle = {
      position: "absolute",
      top: "135px",
      left: "230px",
      zIndex: 1,
      fontSize: "55px"
    }


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
          <FontAwesomeIcon style={fontAwesomeFaBookmark} icon={faBookmark} />
          <div className="header-top-line">
            <span className="title white">{this.state.selected.title}</span>
            <span className="year grey">({this.state.selected.date})</span>
            <div className="ratings-container">
              <div className="ratings-container-left">
                <FontAwesomeIcon style={fontAwesomeFasStar} icon={fasStar}/>
                <div className="rcl2">
                  <h2 className="average white">{this.state.selected.averageRating}<span className="outOf grey small">/10</span></h2>
                  <p className="totalRatings small grey">{this.state.selected.ratings}</p>
                </div>
              </div>
              <div onClick={this.toggleStars} className="ratings-container-right">
                <FontAwesomeIcon style={fontAwesomeFarStar} icon={farStar}/>
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
        <div onClick={() => {this.toggleLargeVideo()}} className="video-thumbnail-main">
          <video key={this.state.selected.video_url}>
            <source src={this.state.selected.video_url} type="video/mp4"/>
          </video>
          <FontAwesomeIcon onClick={() => {this.toggleLargeVideo()}} style={fontAwesomeFaPlayCircle} icon={faPlayCircle} />
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