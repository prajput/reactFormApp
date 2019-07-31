const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      rules: [
        { test: /\.html$/i, use: 'html-loader' },
              { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ , 
                query: {presets: [
                          ["env", {"targets": {"browsers": ["last 2 versions","IE >= 11"]},"useBuiltIns": true}]
                          , 'react']
                        ,plugins: ['transform-class-properties']
        }},{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		  },{
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: [
			  {
				loader: 'file-loader',
				options: {
				  limit: 8192
				}
			  }
			]
		  },{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}