if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


const cors = require('cors');
const path = require('path');

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// Serve static files from the "public" directory
app.use("/public", express.static("public"));

const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const pollRouter = require('./routes/poll');
const createRouter = require('./routes/create');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

//Middleware
app.use(cors());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/poll', pollRouter);
app.use('/create', createRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
