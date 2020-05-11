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
      {poolMetadataState.value &&
          <div>
            <div>{poolMetadataState.value.name}</div>
            <div>{poolMetadataState.value.description}</div>
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
          ? <div>Total Staked {currentPrizeState.error.message}</div>
          : <div>Current Prizepool: {currentPrizeState.value}</div>
      }
      <div>
        <button>Join the pool</button>
      </div>
    </div>
  )

}

export default PoolDashboard;
