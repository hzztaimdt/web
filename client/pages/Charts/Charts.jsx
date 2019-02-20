import React, { Component } from 'react';
import './Charts.scss';

import VideoPage from '../../components/VideoPage';

const ROOMTOKEN =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:Ktu773HHnDTXi9Nb-g9qPSTCLq8=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMSIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoiYWRtaW4ifQ==';

export default class Charts extends Component {
  render() {
    return (
      <VideoPage roomToken={ROOMTOKEN} />
    );
  }
}
