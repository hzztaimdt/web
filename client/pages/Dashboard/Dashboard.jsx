import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@alifd/next';

const ROOMTOKEN_1 =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:wUzGawC1opOcMn9UYf8CtiZlBJo=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMiIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoidXNlciJ9';

const ROOMTOKEN_2 =
  'SvZYRC7pTwUz7O-nA0OJFY6-XjtOd4oTzIJTiMq6:Ktu773HHnDTXi9Nb-g9qPSTCLq8=:eyJhcHBJZCI6ImR6bnQ2eHBiciIsInJvb21OYW1lIjoiZmVuZyIsInVzZXJJZCI6IjAwMSIsImV4cGlyZUF0IjoxNTU2NTk0ODQ2LCJwZXJtaXNzaW9uIjoiYWRtaW4ifQ==';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Link to={`/role/${ROOMTOKEN_1}`}>
          <Button type="normal">身份1</Button>
        </Link>
        <br />
        <br />
        <Link to={`/role/${ROOMTOKEN_2}`}>
          <Button type="normal">身份2</Button>
        </Link>
      </div>
    );
  }
}
