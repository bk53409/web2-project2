const dotenv = require('dotenv');
const express = require('express');

const app = express();
const http = require('http');
const path = require('path');
const router = require('./routes/index');
const sqlInjectionRouter = require('./routes/sqlinjection');
const csrfRouter = require('./routes/csrf');
const csrfVulnerableRouter = require('./routes/csrfVulnerable');
const csrfProtectedRouter = require('./routes/csrfProtected');

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const config = {};

const port = process.env.PORT || 3000;

if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use('/', router);
app.use('/sqlinjection', sqlInjectionRouter);
app.use('/csrf', csrfRouter);
app.use('/csrfVulnerable', csrfVulnerableRouter);
app.use('/csrfProtected', csrfProtectedRouter);

http.createServer(app)
  .listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
    console.log(process.env.NODE_ENV);
  });
