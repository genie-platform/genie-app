import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Button, Typography, Grid, Card, CardMedia } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { uploadToSkynet, siaUrl } from '../../services/sia';
import { getImagesNameArray } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderRadius: '12px',
    },
  },
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
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '3em',
    width: 500,
    height: 200,
  },
  input: {
    display: 'none',
  },
  skynet: {
    width: 90,
    height: 90,
  },
}));

const ImagePicker = (props) => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);

  const onFileChosen = async (event) => {
    const file = event.target.files[0];

    setIsUploading(true);
    const imageId = await uploadToSkynet(file);
    setIsUploading(false);

    const path = `${siaUrl}/${imageId}`;

    props.onChosenImage(path);
    props.onClose();
  };

  const onImageChosen = (name) => {
    const path = `/images/${name}`;

    props.onChosenImage(path);
    props.onClose();
  };

  const images = getImagesNameArray().map((name) => (
    <Grid item xs={4} key={name} onClick={() => onImageChosen(name)}>
      <Card className={classes.imageCard} elevation={0}>
        <CardMedia image={`/images/thumbs/${name}`} className={classes.image} />
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
      {isUploading ? (
        <div className={classes.loading}>
          <img
            src="/logos/skynet.svg"
            alt="skynet"
            className={classes.skynet}
          />
          <Typography variant="h5">Uploading image to skynet...</Typography>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={classes.top}>
            <Typography variant="h6" className={classes.title}>
              Select Cover Image
            </Typography>
            <input
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
            </label>
          </div>
          <div>
            <Grid container spacing={2} className={classes.grid}>
              {images}
            </Grid>
          </div>
        </>
      )}
    </Popover>
  );
};

export default ImagePicker;
