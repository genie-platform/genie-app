import React, { useState } from 'react';
import clsx from 'clsx';
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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  imageCards: {
    cursor: 'pointer',
    '&:hover': {
      background: '#ccc',
    },
  },
  fundIconCard: {
    textAlign: 'center',
  },
  fundIcon: {
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
            fullWidth
            type="number"
            helperText="The amount the user will lock"
            onChange={(event) => {
              props.setFund({ lockValue: event.target.value });
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            elevation={3}
            onClick={onChangeIconClick}
            className={clsx(classes.fundIconCard, classes.imageCards)}
          >
            <CardContent>
              <Typography
                variant="h2"
                id="fund-icon"
                className={classes.fundIcon}
              >
                {fundIcon}
              </Typography>
              <Typography>Choose Icon</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card elevation={3} className={classes.imageCards}>
            <CardMedia></CardMedia>
            <CardContent>
              <Typography>Choose Image</Typography>
            </CardContent>
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
