import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import * as actionTypes from '../../../store/actions/actionTypes';
import { theme } from '../../../theme';
import { getRandomCoverImage } from '../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.customColors.text,
    paddingBottom: '0.2em',
  },
  imageCards: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 6,
    border: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  poolIcon: {},
  poolImage: {},
  emojiPicker: {
    position: 'absolute',
    zIndex: 100,
  },
}));

const PoolDetailsForm = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [touched, setTouched] = useState({ name: false, description: false });

  let poolIcon = props.icon;
  let poolImage = props.coverImage;
  let helperTextName = '';
  let helperTextDescription = '';
  let defaultWinner = '';

  if (props.winnerDescription !== '') {
    defaultWinner = props.winnerDescription;
  }

  const onChangeIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePicker = () => {
    setAnchorEl(null);
  };

  const onChooseIcon = (emoji) => {
    props.setPool({ icon: emoji.native });
    closePicker();
  };

  const chooseCoverImage = () => {
    props.setPool({ coverImage: getRandomCoverImage() });
  };

  const validateName = () => {
    const MIN_POOL_NAME_LEN = 4;
    if (touched.name) {
      if (props.name.length > MIN_POOL_NAME_LEN) {
        helperTextName = '';
        return false;
      } else {
        helperTextName = 'Pool name too short';
        return true;
      }
    }
  };

  const validateDescription = () => {
    const MIN_POOL_DESCRIPTION_LEN = 0;
    if (touched.description) {
      if (props.description.length > MIN_POOL_DESCRIPTION_LEN) {
        helperTextDescription = '';
        return false;
      } else {
        helperTextDescription = 'Pool description too short';
        return true;
      }
    }
  };

  useEffect(() => {
    if (poolImage === '') {
      chooseCoverImage();
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <Typography className={classes.label}>Name</Typography>
          <TextField
            required
            id="pool-name"
            variant="outlined"
            fullWidth
            defaultValue={props.name}
            error={validateName()}
            helperText={helperTextName}
            onChange={(event) => {
              props.setPool({ name: event.target.value });
              setTouched({ name: true, description: touched.description });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.label}>Description</Typography>
          <TextField
            required
            multiline
            rows={4}
            id="pool-description"
            variant="outlined"
            placeholder="A few words about the pool"
            fullWidth
            error={validateDescription()}
            defaultValue={props.description}
            helperText={helperTextDescription}
            onChange={(event) => {
              props.setPool({ description: event.target.value });
              setTouched({ name: touched.name, description: true });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.label}>Challenge</Typography>
          <TextField
            required
            variant="outlined"
            fullWidth
            defaultValue={defaultWinner}
            placeholder="The player who wins the 2 week tournament!"
            helperText="Who will get the reward?"
            onChange={(event) =>
              props.setPool({ winnerDescription: event.target.value })
            }
          ></TextField>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.label}>Icon</Typography>
          <div onClick={onChangeIconClick} className={classes.imageCards}>
            <Typography
              variant="h2"
              id="pool-icon"
              className={classes.poolIcon}
            >
              {poolIcon}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.label}>Cover Image</Typography>
          <Card className={classes.imageCards} onClick={chooseCoverImage}>
            <CardMedia
              className={classes.poolImage}
              image={poolImage}
              component="img"
            ></CardMedia>
          </Card>
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Picker
          native
          title=""
          theme="dark"
          color={theme.palette.secondary.main}
          showPreview={false}
          showSkinTones={false}
          onSelect={onChooseIcon}
        />
      </Popover>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.createdPool.name,
    description: state.createdPool.description,
    icon: state.createdPool.icon,
    coverImage: state.createdPool.coverImage,
    winnerDescription: state.createdPool.winnerDescription,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPool: (poolDetails) =>
      dispatch({
        type: actionTypes.SET_POOL,
        payload: {
          name: poolDetails.name,
          description: poolDetails.description,
          icon: poolDetails.icon,
          coverImage: poolDetails.coverImage,
          winnerDescription: poolDetails.winnerDescription,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolDetailsForm);
