import React from 'react';
import "./VideoPlayerLarge.css";
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

  componentDidMount() {
    const video = document.getElementById('videoToPlay');
    video.addEventListener('ended', () => {
      this.setState({
        playing: false,
        paused: true
      })
    })
    video.addEventListener('timeupdate', () => {
      this.setState({
        currentTime: video.currentTime
      })
    })
  }


  render() {
    return (
      <div className="videoPlayerLarge">
      <div className="large-player">
        <i onClick={() => {this.props.toggleLargeVideo()}} className="exit-large-player fas fa-times"></i>
        <video autoPlay id="videoToPlay" key={this.props.selected._id}>
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
              <p className="small">1 of 20</p>
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
          {this.props.videos.map(video => <Video key={video._id} videoInfo={video} selected={this.props.selected._id === video._id} />)}
        </div>
      )}
    </div>
    )
  }
}

export default VideoPlayerLarge;