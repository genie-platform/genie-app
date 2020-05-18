import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GameCard from '../../UI/GameCard';

const PATH_OF_EXILE = 'Path of Exile';
const MANUAL = 'Manual';
const LOTTERY = 'Lottery';
const GODS_UNCHAINED = 'Gods Unchained';
const YOUR_GAME = 'Your Game';

function ChooseGame() {
  const [chosenGame, setChosenGame] = useState(PATH_OF_EXILE);

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <GameCard
          cardId={PATH_OF_EXILE}
          checked={chosenGame === PATH_OF_EXILE}
          setChecked={(id) => {
            setChosenGame(id);
          }}
          image="/logos/poe2.jpg"
          title={PATH_OF_EXILE}
          description="Path of Exile is a free online Action RPG set in a dark fantasy world"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={MANUAL}
          checked={chosenGame === MANUAL}
          setChecked={(id) => {
            setChosenGame(id);
          }}
          image="/logos/manual.jpg"
          title={MANUAL}
          description="Choose any game and reward the winner manualy"
        />
      </Grid>
      <Grid item xs={4}>
        <GameCard
          cardId={GODS_UNCHAINED}
          checked={chosenGame === GODS_UNCHAINED}
          setChecked={() => {}}
          disabled
          image="/logos/godsbw.jpg"
          title={GODS_UNCHAINED}
          description="Coming soon!"
        />
      </Grid>
    </Grid>
  );
}

export default ChooseGame;
