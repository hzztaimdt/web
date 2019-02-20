import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@alifd/next';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to="/chart/basic">
          <Button type="normal">画面1</Button>
        </Link>
        <br />
        <br />
        <Link to="/chart/general">
          <Button>画面2</Button>
        </Link>
      </div>
    );
  }
}
