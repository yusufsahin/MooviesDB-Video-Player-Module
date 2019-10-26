import React from 'react';
import "./css/VideoPlayerLarge.css";
import Video from "./Video.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronRight, faInfoCircle, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

class VideoPlayerLarge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      playing: true,
      paused: false,
      currentTime: 0,
      showNext: false
    }
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.playPause = this.playPause.bind(this);
    this.switchVideo = this.switchVideo.bind(this);
  }

  toggleSideBar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }

  playPause() {
    const video = document.getElementById('videoToPlay');
    if (this.state.playing) {
      video.pause();
      this.setState({
        playing: false,
        paused: true
      })
    } else if (this.state.paused) {
      video.play();
      this.setState({
        playing: true,
        paused: false
      })
    }
  }

  switchVideo() {
    const video = document.getElementById('videoToPlay');
    this.setState({
      playing: true,
      paused: false,
    })
    video.addEventListener('ended', () => {
      this.setState({
        playing: false,
        paused: true
      })
    })
  }

  render() {

    const fontAwesomeFaTimes = {
      color: "white",
      position: "absolute",
      top: "15px",
      left: "15px",
      fontSize: "20px",
      zIndex: 20
    }

    const fontAwesomeFaInfoCircle = {
      color: "white",
      position: "absolute",
      top: "15px",
      right: "15px",
      fontSize: "20px",
      zIndex: 12
    }
    return (
      <div className="videoPlayerLarge">
        {!this.state.showSidebar && (
          <div className="top-header">
            <p>{this.props.selected.title} ({this.props.selected.date})</p>
            <p>{this.props.selectedIdx + 1} of {this.props.videos.length}</p>
          </div>
        )}
      <div className="large-player">
        <FontAwesomeIcon className="exit-large-player" onClick={() => {this.props.toggleLargeVideo()}} icon={faTimes} style={fontAwesomeFaTimes}/>
        <video onMouseOver={() => {this.setState({showNext: true})}} onMouseOut={() => {this.setState({showNext: false})}} onClick={() => {this.playPause()}} autoPlay onEnded={() => {this.setState({playing: false, paused: true})}} onTimeUpdate={() => {this.setState({currentTime: document.getElementById('videoToPlay').currentTime})}} id="videoToPlay" key={this.props.selectedIdx}>
          <source src={this.props.selected.video_url} type="video/mp4"></source>
        </video>
        {this.state.showNext && (
          <div onMouseEnter={() => {this.setState({showNext: true})}} onMouseOut={() => {this.setState({showNext: false})}} onClick={() => {this.props.selectedIdx === 26 ? this.props.changeVideo(0): this.props.changeVideo(this.props.selectedIdx + 1)}} className="nextVideo" style={!this.state.showSidebar ? {right: '0px'} : {right: '325px'}}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>

          )}
          <div>
            {!this.state.showSidebar && (
              <FontAwesomeIcon className="show-sidebar" onClick={() => {this.toggleSideBar()}} style={fontAwesomeFaInfoCircle} icon={faInfoCircle}/>
            )}
          </div>
        <div onClick={this.playPause} className="play-pause">
          {this.state.playing ? (
            <FontAwesomeIcon className="pause" icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
          <p>00:{Math.round(this.state.currentTime) < 10 ? '0' + Math.round(this.state.currentTime) : Math.round(this.state.currentTime)}/ 00:{this.props.selected.running_time < 10 ? '0' + this.props.selected.running_time : this.props.selected.running_time }</p>
        </div>
      </div>
      {this.state.showSidebar && (
        <div className="video-list">
          <div className="related-videos">
            <div>
              <h2>Related Videos</h2>
              <p className="small">{this.props.selectedIdx + 1} of {this.props.videos.length}</p>
            </div>
            <FontAwesomeIcon onClick={() => {this.toggleSideBar()}} icon={faArrowAltCircleRight} className="toggle-sidebar" />
          </div>
          <div className="now-playing">
            <div>
              <img src={this.props.selected.thumbnail_url}></img>
            </div>
            <div className="info">
              <p className="title">{this.props.selected.title} ({this.props.selected.date})</p>
              <p className="blue">GET TICKETS <span className="blue small">Now Playing</span></p>
            </div>
          </div>
          <div className="description-box">
            <p>{this.props.selected.title} (00:{this.props.selected.running_time < 10 ? '0' + this.props.selected.running_time :  this.props.selected.running_time})</p>
            <p className="description">{this.props.selected.description}</p>
          </div>
      {this.props.videos.map((video, idx) => {
        return <Video switchVideo={this.switchVideo} index={idx} changeVideo={this.props.changeVideo} key={idx} videoInfo={video} selected={idx === this.props.selectedIdx} />})}
        </div>
      )}
    </div>
    )
  }
}

export default VideoPlayerLarge;