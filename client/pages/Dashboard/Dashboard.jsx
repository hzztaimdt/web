import { Select } from '@alifd/next';
import React, { Component } from 'react';
import JoinRoom from '../../services/joinRoom';
import * as QNRTC from 'pili-rtc-web';

const ROOMTOKEN =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:Ktu773HHnDTXi9Nb-g9qPSTCLq8=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMSIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoiYWRtaW4ifQ==';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceInfo: [],
      currentVideo: null,
    };
  }

  componentDidMount() {
    this.joinRoom = new JoinRoom(ROOMTOKEN, this.room);
    this.start();
  }

  start = async () => {
    await this.joinRoom.joinRoom();
    const deviceInfo = this.joinRoom.getDevices();
    const videoSource = deviceInfo.reduce((arr, i) => {
      if (i.kind === 'videoinput') {
        arr.push({
          label: i.label.slice(0, i.label.length - 12),
          value: i.deviceId,
        });
      }
      return arr;
    }, []);
    let currentVideo = this.state.currentVideo;
    if (videoSource.length > 0) {
      currentVideo = videoSource[0].value;
    }
    this.setState({ deviceInfo: videoSource, currentVideo });
    this.play(currentVideo);
    // await this.joinRoom.publish();
    // this.joinRoom.autoSubscribe();
    // this.joinRoom.playVideo();
  };

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
    const localTracks = await this.joinRoom.getLocalTracks(params);
    this.joinRoom.play(localTracks);
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
