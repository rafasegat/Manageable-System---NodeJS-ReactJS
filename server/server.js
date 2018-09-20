const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { Model } = require('objection');
const config = require('../config/config');
const webpackConfig = require('../webpack.config');
const morgan = require('morgan');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8006;  

// Configuration   
// ================================================================================================

// Setup MySQL Knex and Objection
var knex = require('knex')(isDev ? config.development : config.production);
Model.knex(knex);

// Test connection
knex.raw('select 1+1 as result').then(function () {
  console.log('Database ' + (isDev ? 'DEV' : 'PROD') + ' is running okay!');   
});

const app = express(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(morgan('dev'));

// GraphQL
const express_graphql = require('express-graphql');
const { graphql_schema } = require('./graphql/schema');
const { graphql_root } = require('./graphql/root');
const { buildSchema } = require('graphql');

app.use('/graphql', express_graphql({
  schema: graphql_schema,
  rootValue: graphql_root,
  graphiql: true
}));

// API routes
require('./routes')(app, express);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('Feedback360: >>> Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;