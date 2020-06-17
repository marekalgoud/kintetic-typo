const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(frag|vert|glsl)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader',
                    'glslify-loader'
                  ]
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
              { from: 'public/fonts', to: 'fonts' },
              { from: 'public/favicon.ico' },
              { from: 'public/manifest.json' },
              { from: 'public/robots.txt' },
            ],
            options: {
              concurrency: 100,
            },
        })
    ]
};