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
  fundImage: {
    height: '75%',
  },
  fundIcon: {
    height: '75%',
    paddingBottom: '0.2em',
  },
  emojiPicker: {
    position: 'absolute',
    zIndex: 100,
  },
}));

const FundDetailsForm = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  let fundIcon = props.icon;
  let fundImage = props.coverImage;

  const onChangeIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePicker = () => {
    setAnchorEl(null);
  };

  const onChooseIcon = (emoji) => {
    props.setFund({ icon: emoji.native });
    closePicker();
  };

  const chooseCoverImage = () => {
    props.setFund({ coverImage: getRandomCoverImage() });
  };

  useEffect(() => {
    if (fundImage === '') {
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
            id="fund-name"
            label="Fund name"
            variant="outlined"
            fullWidth
            defaultValue={props.name}
            onChange={(event) => props.setFund({ name: event.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="fund-description"
            label="Fund description"
            variant="outlined"
            fullWidth
            defaultValue={props.description}
            onChange={(event) => {
              props.setFund({ description: event.target.value });
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
              props.setFund({ lockValue: event.target.value });
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
                id="fund-icon"
                className={classes.fundIcon}
              >
                {fundIcon}
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
              className={classes.fundImage}
              image={fundImage}
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
    name: state.createdFund.name,
    description: state.createdFund.description,
    lockValue: state.createdFund.lockValue,
    icon: state.createdFund.icon,
    coverImage: state.createdFund.coverImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFund: (fundDetails) =>
      dispatch({
        type: actionTypes.SET_FUND,
        payload: {
          name: fundDetails.name,
          description: fundDetails.description,
          lockValue: fundDetails.lockValue,
          icon: fundDetails.icon,
          coverImage: fundDetails.coverImage,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundDetailsForm);
