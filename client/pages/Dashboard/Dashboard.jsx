import React, { Component } from 'react';
import JoinRoom from '../../services/joinRoom';

const ROOMTOKEN =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:Ktu773HHnDTXi9Nb-g9qPSTCLq8=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMSIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoiYWRtaW4ifQ==';

export default class Dashboard extends Component {
  componentDidMount() {
    this.joinRoom = new JoinRoom(ROOMTOKEN, this.room);
    this.start();
  }
  start = async () => {
    await this.joinRoom.joinRoom();
    // await this.joinRoom.publish();
    this.joinRoom.autoSubscribe();
    // this.joinRoom.playVideo();
  }
  render() {
    return (
      <div className="dashboard-page">
        <div ref={el => (this.room = el)} />
      </div>
    );
  }
}
