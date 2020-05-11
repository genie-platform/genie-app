import React from 'react';
import {useAsync} from 'react-use';

import { getTotalStaked, getCurrentPrize, fetchPoolMetadata } from '../../ethereum/pool';

const PoolDashboard = ({ match: { params: { poolAddress }}}) => {
  const totalStakedState = useAsync(async () => {
    return getTotalStaked(poolAddress)
  }, [poolAddress]);

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress)
  }, [poolAddress]);

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress)
  }, [poolAddress]);

  console.log({ poolMetadataState })

  return (
    <div>
      Dashboard

      {poolMetadataState.loading
        ? <div>Loading...</div>
        : poolMetadataState.error
          ? <div>Total: {poolMetadataState.error.message}</div>
          : <div><div>Name: {poolMetadataState.value.name}</div>
            <div>Desc: {poolMetadataState.value.description}</div>
            </div>
      }
      {totalStakedState.loading
        ? <div>Loading...</div>
        : totalStakedState.error
          ? <div>Total: {totalStakedState.error.message}</div>
          : <div>Total staked: {totalStakedState.value}</div>
      }
      {currentPrizeState.loading
        ? <div>Loading...</div>
        : currentPrizeState.error
          ? <div>Total: {currentPrizeState.error.message}</div>
          : <div>Current Prize: {currentPrizeState.value}</div>
      }
    </div>
  )

}

export default PoolDashboard;
