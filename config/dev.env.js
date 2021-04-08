'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   EVN_CONFIG: '"prod"',
//   API_ROOT: '"生产环境接口链接"'
// })

module.exports ={
  NODE_ENV: '"development"',
  EVN_CONFIG: '"prod"',
  API_ROOT: '"http://192.168.1.13:12138"'
};

