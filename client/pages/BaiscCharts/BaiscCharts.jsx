import React, { Component } from 'react';
import VideoPage from '../../components/VideoPage';

const ROOMTOKEN =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:wUzGawC1opOcMn9UYf8CtiZlBJo=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMiIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoidXNlciJ9';
export default class BaiscCharts extends Component {
  render() {
    return (
      <VideoPage roomToken={ROOMTOKEN} first={1} />
    );
  }
}
