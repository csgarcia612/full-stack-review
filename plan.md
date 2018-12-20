# App-name

    Quotka

## Front-end

### Routing

- /
- /add-quote

### Components

- Homepage
- Header
- Add Quote
- List
- Login
- Quote?

### Redux

- store
- reducer

  - initial state
  - reducer function
  - action creators (functions that create actions/objects)
  - action types (constant strings)

- provider

## Back-end

### Endpoints

- /api/quotes (GET, POST)
- /auth/callback
- /logout

### ToDo

- connect to database using massive
- set up .env file
- set up proxy file

### Controllers

    * quotesController

        ** getQuotes
        ** createQuote

    * authController

        * login
        * logout

## Database

- quotes

  - id
  - phrase
  - user_id

- users

  - id
  - name
  - email
  - picture
  - sub

    - auth0_id

## Npm packages

- redux
- react-redux
- react-router-dom
- body-parser
- dotenv
- express
- axios
- massive
- express-session
- http-proxy-middleware
