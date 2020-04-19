import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  login: {
    maxWidth: "500px",
    minWidth: "250px",
    width: "30vw",
    height: "60vh",
    position: "relative",
    top: "10vh",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "1em",
    display: "flex",
    flexFlow: "column",
  },
  content: {
    top: "10%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
  },
  titleArea: {},
  text: {
    fontFamily: theme.fonts.primary,
    textAlign: "center",
    backgroundImage: theme.customGradients.primaryDark,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  divider: {
    margin: "5% 0",
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.login}>
        <div className={classes.content}>
          <div className={classes.titleArea}>
            <Typography className={classes.text} variant="h3">
              Genie
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.text}>
              is a plaftorm for game developers to reward their players
            </Typography>
          </div>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
      </Card>
    </div>
  );
}
