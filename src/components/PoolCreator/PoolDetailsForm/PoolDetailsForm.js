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
  root: {
    padding: '2em',
  },
  imageCards: {
    height: 150,
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 10,
    '&:hover': {
      background: '#ccc',
    },
  },
  poolImage: {
    height: '75%',
  },
  poolIcon: {
    height: '75%',
    paddingBottom: '0.2em',
  },
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
          <TextField
            required
            id="pool-name"
            label="Pool name"
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
          <TextField
            required
            multiline
            id="pool-description"
            label="Pool description"
            variant="outlined"
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
          <TextField
            required
            id="lock-value"
            label="Lock value"
            variant="outlined"
            defaultValue={props.lockValue}
            fullWidth
            type="number"
            helperText="The amount of DAI each user will lock"
            onChange={(event) => {
              props.setPool({ lockValue: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            elevation={3}
            onClick={onChangeIconClick}
            className={classes.imageCards}
          >
            <CardContent>
              <Typography
                variant="h2"
                id="pool-icon"
                className={classes.poolIcon}
              >
                {poolIcon}
              </Typography>
              <Typography>Icon</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card
            elevation={3}
            className={classes.imageCards}
            onClick={chooseCoverImage}
          >
            <CardMedia
              className={classes.poolImage}
              image={poolImage}
              component="img"
            ></CardMedia>
            <Typography>Cover Image</Typography>
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
    lockValue: state.createdPool.lockValue,
    icon: state.createdPool.icon,
    coverImage: state.createdPool.coverImage,
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
          lockValue: poolDetails.lockValue,
          icon: poolDetails.icon,
          coverImage: poolDetails.coverImage,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolDetailsForm);
