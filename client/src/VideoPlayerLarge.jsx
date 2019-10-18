import React from 'react';
import "./VideoPlayerLarge.css"

class VideoPlayerLarge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: true
    }
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    this.setState({
      showSidebar: !this.state.showSidebar
    })
  }


  render() {
    return (
      <div className="videoPlayerLarge">
      {console.log(this.props.selected.video_url)}
      <div className="large-player">
        <i onClick={() => {this.props.toggleLargeVideo()}} className="exit-large-player fas fa-times"></i>
        <video autoPlay muted id="videoToPlay" key={this.props.selected._id}>
          <source src={this.props.selected.video_url} type="video/mp4"></source>
        </video>
        {!this.state.showSidebar && (
          <i onClick={() => {this.toggleSideBar()}} class="show-sidebar fas fa-info-circle"></i>
        )}
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
        </div>
      )}
    </div>
    )
  }
}

export default VideoPlayerLarge;