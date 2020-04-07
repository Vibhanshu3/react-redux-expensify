//npm i webpack@3.1.0
//defined script
//npm i babel-core@6.25.0 babel-loader //allows babel to run from weback n loader is a plugin to teach how to convert jsx 
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return  {
        entry: './src/app.js',
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
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map', //for mapping error in original written code not in compiled code
        devServer: {
            contentBase: path.join(__dirname, 'public'), //giving loc of public folder to server //also runs bundle.js from memory to keep things faster
            historyApiFallback: true
        }
    };
}





