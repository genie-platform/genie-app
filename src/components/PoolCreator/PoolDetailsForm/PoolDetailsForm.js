import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import 'emoji-mart/css/emoji-mart.css';
import { Picker as EmojiPicker } from 'emoji-mart';

import * as actionTypes from '../../../store/actions/actionTypes';
import { theme } from '../../../theme';
import { getRandomCoverImage } from '../../../utils/utils';
import ImagePicker from '../../UI/ImagePicker';
import { GAMES } from '../../../utils/constants';

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
  },
  poolIcon: {
    width: 150,
    height: 150,
    border: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  imagePicker: {
    width: 500,
    height: 400,
  },
  emojiPicker: {
    position: 'absolute',
    zIndex: 100,
  },
}));

const PoolDetailsForm = (props) => {
  const classes = useStyles();
  const [emojiMallAnchorElement, setEmojiMallAnchorElement] = useState(null);
  const [imagePickerAnchor, setImagePickerAnchor] = useState(null);
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
    setEmojiMallAnchorElement(event.currentTarget);
  };

  const closeEmojiPicker = () => {
    setEmojiMallAnchorElement(null);
  };

  const onChooseIcon = (emoji) => {
    props.setPool({ icon: emoji.native });
    closeEmojiPicker();
  };

  const clickCoverImage = (event) => {
    if (event) {
      setImagePickerAnchor(event.currentTarget);
    } else {
      chooseCoverImage(getRandomCoverImage());
    }
  };

  const chooseCoverImage = (image) => {
    props.setPool({ coverImage: image });
  };

  const closeCoverImagePicker = () => {
    setImagePickerAnchor(null);
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
      clickCoverImage();
    }
  }, []);

  const isEmojyPickerOpen = Boolean(emojiMallAnchorElement);
  const emojiPickerPopoverId = isEmojyPickerOpen ? 'simple-popover' : undefined;

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={10}>
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

        <Grid item xs={10}>
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

        {props.game !== GAMES.PATH_OF_EXILE && (
          <Grid item xs={10}>
            <Typography className={classes.label}>Challenge</Typography>
            <TextField
              required
              variant="outlined"
              fullWidth
              defaultValue={defaultWinner}
              placeholder="Who will get the reward?"
              onChange={(event) =>
                props.setPool({ winnerDescription: event.target.value })
              }
            />
          </Grid>
        )}

        <Grid item xs={3}>
          <Typography className={classes.label}>Icon</Typography>
          <div
            onClick={onChangeIconClick}
            className={clsx(classes.imageCards, classes.poolIcon)}
          >
            <Typography variant="h2" id="pool-icon">
              {poolIcon}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.label}>Cover Image</Typography>
          <Card className={classes.imageCards} onClick={clickCoverImage}>
            <CardMedia
              className={classes.poolImage}
              image={poolImage}
              component="img"
            ></CardMedia>
          </Card>
        </Grid>
      </Grid>

      {/* This is the emoji pick popover */}
      <Popover
        id={emojiPickerPopoverId}
        open={isEmojyPickerOpen}
        anchorEl={emojiMallAnchorElement}
        onClose={closeEmojiPicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <EmojiPicker
          native
          title=""
          theme="dark"
          color={theme.palette.secondary.main}
          showPreview={false}
          showSkinTones={false}
          onSelect={onChooseIcon}
        />
      </Popover>
      <ImagePicker
        className={classes.imagePicker}
        anchorEl={imagePickerAnchor}
        open={Boolean(imagePickerAnchor)}
        onChosenImage={chooseCoverImage}
        onClose={closeCoverImagePicker}
      />
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
    game: state.createdPool.game,
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
