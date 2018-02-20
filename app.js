// Import dependencies
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');

// Import Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('build'));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

// API Routes
app.use('/api/tracker', require('./routes/tracker-routes'));
app.use('/api/currencydata', require('./routes/cmc-routes'));

app.listen(PORT, () => {
  console.log(`Live on port ${PORT} but also it's the Shrek movie`);
});
