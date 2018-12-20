const axios = require("axios");

module.exports = {
  login: (req, res) => {
    const { code } = req.query;
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: `http://${req.headers.host}/callback`
    };

    function tradeCodeForAccessToken() {
      return axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        payload
      );
    }

    function tradeAccessTokenForUserInfo(response) {
      return axios.get(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${
          response.data.access_token
        }`
      );
    }

    function storeUserInfoInDatabase(response) {
      console.log("response.data", response.data);
      const user = response.data;
      const db = req.app.get("db");
      return db.get_user([user.sub]).then(users => {
        if (users.length) {
          req.session.user = {
            auth0_id: users[0].auth_id,
            name: users[0].name,
            picture: users[0].picture,
            email: users[0].email
          };
          res.redirect("/");
        } else {
          return db
            .create_user([user.name, user.email, user.picture, user.sub])
            .then(newUsers => {
              req.session.user = newUsers[0];
              res.redirect("/");
            });
        }
      });
    }
    tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoInDatabase)
      .catch(err => {
        console.log("Error in login route", err);
        res.status(500).send("Something bad happened on the server.");
      });
  },
  getUser: (req, res) => {
    res.json({ user: req.session.user });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.send();
  }
};
