module.exports = {
    entry: 'src/main.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/, loader: "style!css",
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            }
        ]
    },
    devtool: 'source-map'
}
