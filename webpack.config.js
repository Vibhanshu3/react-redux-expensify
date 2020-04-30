//npm i webpack@3.1.0
//defined script
//npm i babel-core@6.25.0 babel-loader //allows babel to run from weback n loader is a plugin to teach how to convert jsx 
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 
const webpack = require('webpack');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'development') {
     require('dotenv').config({path: '.env.development'})
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return  {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public'), //for abs path
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY' : JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABSE_URL' : JSON.stringify(process.env.FIREBASE_DATABSE_URL),
                'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGE_SENDER_ID' : JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID),
                'process.env.FIREBASE_APP_ID' : JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID),

            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //for mapping error in original written code not in compiled code
        devServer: {
            contentBase: path.join(__dirname, 'public'), //giving loc of public folder to server //also runs bundle.js from memory to keep things faster
            historyApiFallback: true
        }
    };
}





