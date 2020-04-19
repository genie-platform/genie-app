function onSignIn(googleUser) {
  var tokenId = googleUser.getAuthResponse().id_token;

  // send the token id to backend

  // window
  //   .fetch("/api/v1/login/google", {
  //     method: "POST",
  //     body: JSON.stringify({ tokenId }),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log({ data });
  //     window.state.jwt = data.token;
  //   });
}
