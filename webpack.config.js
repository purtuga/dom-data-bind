const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        library: "DomDataBind",
        libraryTarget: "umd",
        filename: 'DomDataBind.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer: {
        contentBase: [
            path.resolve(__dirname, "dist"),
            path.resolve(__dirname, "dev")
        ],
        port: 9568
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "node_modules")
        ]
    }
};