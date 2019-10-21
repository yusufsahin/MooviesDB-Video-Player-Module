import React from 'react';
import "./css/Video.css";

const Video = (props) => (
  <div onClick={() => {
    props.changeVideo(props.index);
    props.switchVideo();
    }} style={props.selected ? {backgroundColor: 'rgb(71, 71, 71)'} : {backgroundColor: 'rgb(29, 29, 29)'}} className="video-list-item">
    <div className="video-list-image">
      <img src={props.videoInfo.thumbnail_url} />
    </div>
    <div className="video-list-item-text">
      <p>{props.videoInfo.title} ({props.videoInfo.date})</p>
      <p className="time">00:{props.videoInfo.running_time < 10 ? '0' + props.videoInfo.running_time : props.videoInfo.running_time}</p>
    </div>
  </div>
)



export default Video;