'use strict'

const merge = require('webpack-merge')
const appEnv = require('./app.env')

module.exports = merge(appEnv, {
  NODE_ENV: '"production"'
})
