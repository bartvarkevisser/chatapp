const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	entry: { main: './src/main.js' },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		inline: true,
		hot: true,
		open: true,
		watchContentBase: true,
		watchOptions: {
			aggregateTimeout: 300, // Delay the rebuild after the first change
			poll: 1000, // Poll using interval (in ms, accepts boolean too)
		},
	},
	module: {
		rules: [{ test: /\.js?/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env'] } }],
	},
	plugins: [
		new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]), // Ignore node_modules so CPU usage with poll watching drops significantly.
	],
};
