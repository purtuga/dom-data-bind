const path              = require('path');
const webpack           = require('webpack');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const isProduction      = process.env.NODE_ENV === "production";

const WebpackBabelExternalsPlugin = require('webpack-babel-external-helpers-2');

console.log(`MODE: ${ isProduction ? "PRODUCTION" : "DEVELOPMENT" }`);

let config = module.exports = {
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
        port: 9598
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "node_modules")
        ]
    },
    module: {
        rules: []
    },
    plugins: []
};

//---------------------------------------
//    PRODUCTION
//---------------------------------------
if (isProduction) {
    config.module.rules.push(
        {
            test: /\.js$/,
            loader: "babel-loader"
        }
    );

    config.plugins.push(
        new WebpackBabelExternalsPlugin(/* plugin options object */),

        new UglifyJSPlugin({
            sourceMap: true,
            output: {
                comments: false
            }
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    );
}
