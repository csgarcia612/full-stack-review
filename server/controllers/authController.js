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
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?acess_token=${
          response.data.access_token
        }`
      );
    }

    function storeUserInfoInDatabase(response) {
      console.log("user info", response.data);
      const user = response.data;
      const db = req.app.get("db");
      return db.get_user([user.sub]).then();
    }
  }
};
