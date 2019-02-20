import React, { Component } from 'react';
import VideoPage from '../../components/VideoPage';

export default class BaiscCharts extends Component {
  constructor(props) {
    super(props);
    const roomToken = this.props.match.params.token;
    console.log(this.props);
    this.state = {
      roomToken,
    };
  }
  render() {
    const roomToken = this.state.roomToken;
    return roomToken ? <VideoPage roomToken={roomToken} /> : <p>您无权进入房间</p>;
  }
}
