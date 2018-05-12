const path = require('path')
const webpack = require('webpack')
module.exports = {
    //input
    entry: './src/',

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                exclude: /node_modules/
            },
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[local]'
                        }
                    }
                ]
            }

        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
    //server
}