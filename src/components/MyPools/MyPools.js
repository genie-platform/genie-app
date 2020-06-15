import React from 'react';
import { useDepositState } from '../../services/thegraph';

const MyPools = (props) => {
  const deposits = useDepositState();

  console.log(deposits);

  return <div></div>;
};

export default MyPools;
