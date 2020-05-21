import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Button, Typography, Grid, Card, CardMedia } from '@material-ui/core';

import { uploadToSkynet } from '../../services/sia';
import { getImagesNameArray } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {},
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '2em 2em 0 2em',
  },
  title: {},
  grid: {
    padding: '2em',
    width: 700,
    height: 400,
  },
  imageCard: {
    width: 200,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7,
    },
  },
  image: {
    height: 100,
    borderRadius: '6px',
  },
  input: {
    display: 'none',
  },
}));

const ImagePicker = (props) => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const onFileChosen = async (event) => {
    const file = event.target.files[0];
    const image = await uploadToSkynet(file);

    setImage(image);
  };

  const onImageChosen = (name) => {
    setImage(name);
    props.onChosenImage(name);
    props.onClose();
  };

  const images = getImagesNameArray().map((name) => (
    <Grid item xs={4} key={name} onClick={() => onImageChosen(name)}>
      <Card className={classes.imageCard} elevation={0}>
        <CardMedia image={name} className={classes.image} />
      </Card>
    </Grid>
  ));

  return (
    <Popover
      className={classes.root}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <div className={classes.top}>
        <Typography variant="h6" className={classes.title}>
          Choose Cover Image
        </Typography>
        {/* <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={onFileChosen}
        />
        <label htmlFor="contained-button-file">
          <Button variant="outlined" color="primary" component="span">
            Upload
          </Button>
        </label> */}
      </div>
      <div>
        <Grid container spacing={2} className={classes.grid}>
          {images}
        </Grid>
      </div>
    </Popover>
  );
};

export default ImagePicker;
