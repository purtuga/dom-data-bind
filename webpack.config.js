const path = require('path');

module.exports = {
    entry: './src/DomDataBind.js',
    output: {
        library: "DomDataBind",
        libraryTarget: "umd",
        filename: 'DomDataBind.js',
        path: path.resolve(__dirname, 'dist')
    }
};