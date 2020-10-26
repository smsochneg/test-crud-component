const path = require('path');
// const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: false,
    },
    entry: {
        'dist/index': './src/components/index.tsx',
        'dist/examples': './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    stats: {
        children: false,
    },
    module: {
        rules: [
            { test:/\.(s*)css$/, use:['style-loader','css-loader'] },
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: {
        disableHostCheck: true,
        compress: true
    }
};

// module.exports = {
//   entry: './src/index.ts',
//   output: {
//     path: path.resolve(__dirname, 'build'),
//     filename: 'bundle.js',
//   },
//   resolve: {
//     modules: [path.join(__dirname, 'src'), 'node_modules'],
//     alias: {
//       react: path.join(__dirname, 'node_modules', 'react'),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: 'style-loader',
//           },
//           {
//             loader: 'css-loader',
//           },
//         ],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebPackPlugin({
//       template: './src/index.html',
//     }),
//   ],
// };
