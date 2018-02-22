// Import dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors =  require('cors');

// Import Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(express.static('build'));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

// Auth0 Stuff
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://reactcryptotracker.auth0.com/.well-known/jwks.json",
  }),
  audience: 'https://react-crypto-tracker.com',
  issuer: 'https://reactcryptotracker.auth0.com',
  algorithm: ['RS256'],
})

// API Routes
app.use('/api/tracker', authCheck, require('./routes/tracker-routes'));
app.use('/api/currencydata', require('./routes/cmc-routes'));

app.listen(PORT, () => {
  console.log(`Live on port ${PORT} but also it's the Shrek movie`);
});
