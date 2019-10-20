import React from 'react';
import "./css/VideoPlayerLarge.css";
import Video from "./Video.jsx";

class VideoPlayerLarge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true,
      playing: true,
      paused: false,
      currentTime: 0
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

    return (
      <div className="videoPlayerLarge">
      <div className="large-player">
        <i onClick={() => {this.props.toggleLargeVideo()}} className="exit-large-player fas fa-times"></i>
        <video onClick={() => {this.playPause()}} autoPlay onEnded={() => {this.setState({playing: false, paused: true})}} onTimeUpdate={() => {this.setState({currentTime: document.getElementById('videoToPlay').currentTime})}} id="videoToPlay" key={this.props.selectedIdx}>
          <source src={this.props.selected.video_url} type="video/mp4"></source>
        </video>
        {!this.state.showSidebar && (
          <i onClick={() => {this.toggleSideBar()}} className="show-sidebar fas fa-info-circle"></i>
        )}
        <div onClick={this.playPause} className="play-pause">
          {this.state.playing ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
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
          <i onClick={() => {this.toggleSideBar()}} className="toggle-sidebar far fa-arrow-alt-circle-right"></i>
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