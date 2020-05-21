import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';
import GameCard from '../../UI/GameCard';

import { GAMES } from '../../../utils/constants';

const ChooseGame = (props) => {
  const [chosenGame, setChosenGame] = useState(GAMES.PATH_OF_EXILE);

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
          cardId={GAMES.PATH_OF_EXILE}
          checked={chosenGame === GAMES.PATH_OF_EXILE}
          onClick={() => onChooseGame(GAMES.PATH_OF_EXILE)}
          image="/logos/poe2.jpg"
          title={GAMES.PATH_OF_EXILE}
          description="Path of Exile is a free online Action RPG set in a dark fantasy world"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={GAMES.MANUAL}
          checked={chosenGame === GAMES.MANUAL}
          onClick={() => onChooseGame(GAMES.MANUAL)}
          image="/logos/manual.svg"
          title={GAMES.MANUAL}
          description="Choose any game and reward the winner manualy"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={GAMES.GODS_UNCHAINED}
          checked={chosenGame === GAMES.GODS_UNCHAINED}
          onClick={() => {}}
          disabled
          image="/logos/godsbw.jpg"
          title={GAMES.GODS_UNCHAINED}
          description="Coming soon"
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
