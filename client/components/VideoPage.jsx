import { Select } from '@alifd/next';
import React, { Component } from 'react';
import JoinRoom from '../services/joinRoom';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.roomToken = props.roomToken;
    this.firstIndex = props.first || 0;
    this.state = {
      deviceInfo: [],
      currentVideo: null,
    };
  }

  componentDidMount() {
    this.start();
  }

  start = async () => {
    this.joinRoom = new JoinRoom(this.roomToken, this.room);
    await this.joinRoom.joinRoom();
    // await this.joinRoom.publish();
    this.joinRoom.autoSubscribe();
    // this.joinRoom.playVideo();
    this.selectPlay();
  };

  selectPlay() {
    const deviceInfo = this.joinRoom.getDevices();
    const videoSource = deviceInfo.reduce((arr, i) => {
      if (i.kind === 'videoinput') {
        arr.push({
          label: i.label,
          value: i.deviceId,
        });
      }
      return arr;
    }, []);
    let currentVideo = this.state.currentVideo;
    if (videoSource.length > 0) {
      currentVideo = videoSource[this.firstIndex].value;
    }
    this.setState({ deviceInfo: videoSource, currentVideo });
    this.play(currentVideo);
  }

  onChange = value =>  {
    this.setState({
      currentVideo: value,
    });
    this.play(value);
  };

  async play(deviceId) {
    const params = {
      video: { enabled: true, tag: 'video', deviceId },
    };
    if (this.localTracks) {
      await this.joinRoom.unpublish(this.localTracks);
    }
    this.localTracks = await this.joinRoom.getLocalTracks(params);
    this.joinRoom.play(this.localTracks);
    await this.joinRoom.publish(this.localTracks);
  }

  render() {
    const { deviceInfo, currentVideo } = this.state;
    return (
      <div className="dashboard-page">
        <Select
          onChange={this.onChange}
          value={currentVideo}
          dataSource={deviceInfo}
        />
        <div ref={el => (this.room = el)} />
      </div>
    );
  }
}

export default VideoPage;
