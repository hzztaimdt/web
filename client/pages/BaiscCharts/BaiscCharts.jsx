import React, { Component } from 'react';
import JoinRoom from '../../services/joinRoom';

const ROOMTOKEN =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:wUzGawC1opOcMn9UYf8CtiZlBJo=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMiIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoidXNlciJ9';
export default class BaiscCharts extends Component {
  componentDidMount() {
    this.joinRoom = new JoinRoom(ROOMTOKEN, this.room);
    this.start();
  }
  start = async () => {
    await this.joinRoom.joinRoom();
    this.joinRoom.playScreen();
  }
  render() {
    return (
      <div>
        <div ref={el => (this.room = el)} />
      </div>
    );
  }
}
