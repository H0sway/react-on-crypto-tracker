// Import dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors =  require('cors');
require('dotenv').config();

// Import Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(express.static('build'));


// Auth0 Stuff
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:currencies', 'create:currency', 'update:currency', 'delete:currency' ]);

// API Routes
app.use('/api/tracker', require('./routes/tracker-routes'));
app.use('/api/currencydata', require('./routes/cmc-routes'));
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(PORT, () => {
  console.log(`Live on port ${PORT} but also it's the Shrek movie`);
});
