var webpack = require('webpack');



module.exports = require('./webpack.config.js');

delete module.exports.entry.test


module.exports.output.library = 'MarkdownX';
module.exports.output.libraryTarget = 'umd';
