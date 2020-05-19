import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import GameCard from '../../UI/GameCard';

const PATH_OF_EXILE = 'Path of Exile';
const MANUAL = 'Manual';
const LOTTERY = 'Lottery';
const GODS_UNCHAINED = 'Gods Unchained';
const YOUR_GAME = 'Your Game';

const ChooseGame = (props) => {
  const [chosenGame, setChosenGame] = useState(PATH_OF_EXILE);

  useEffect(() => {
    onChooseGame(chosenGame);
  }, []);

  const onChooseGame = (game) => {
    setChosenGame(game);
    props.setPool({ game: game });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <GameCard
          cardId={PATH_OF_EXILE}
          checked={chosenGame === PATH_OF_EXILE}
          onClick={() => onChooseGame(PATH_OF_EXILE)}
          image="/logos/poe2.jpg"
          title={PATH_OF_EXILE}
          description="Path of Exile is a free online Action RPG set in a dark fantasy world"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={MANUAL}
          checked={chosenGame === MANUAL}
          onClick={() => onChooseGame(MANUAL)}
          image="/logos/manual.jpg"
          title={MANUAL}
          description="Choose any game and reward the winner manualy"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={GODS_UNCHAINED}
          checked={chosenGame === GODS_UNCHAINED}
          onClick={() => {}}
          disabled
          image="/logos/godsbw.jpg"
          title={GODS_UNCHAINED}
          description="Coming soon!"
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.createdPool.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPool: (poolDetails) =>
      dispatch({
        type: actionTypes.SET_POOL,
        payload: {
          game: poolDetails.game,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGame);
