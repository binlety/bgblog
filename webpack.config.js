const path = require('path');
const webpack = require('webpack');  // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入CleanWebpackPlugin插件

module.exports = {
    entry: path.join(__dirname, "/src/index.jsx"), // 入口文件
    output: {
        path: path.join( __dirname, "/dist"), //打包后的文件存放的地方
        filename: "js/bundle.js" //打包后输出文件的文件名
    },
    resolve:{
		alias:{
      assets:path.resolve(__dirname,'assets'),
			page:path.resolve(__dirname,'src/page'),
			component:path.resolve(__dirname,'src/component'),
			store:path.resolve(__dirname,'src/store')
		}
	},
    devtool: 'source-map',  // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
    module: {
        rules: [
            // {
            //     test: /\.css$/,   // 正则匹配以.css结尾的文件
            //     use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            // },
            // {
            //     test: /\.(less)$/,   // 正则匹配以.scss和.sass结尾的文件
            //     use: ['style-loader', 'css-loader', 'less-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
            // },
            {                             // jsx配置
                test: /(\.jsx|\.js)$/,  
                exclude: /(node_modules)/, 
                use: {                    // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: "babel-loader",
                    // options: {
                    //     presets: [
                    //         "env", "react"
                    //     ]
                    // }
                },
                exclude: /node_modules/
            },
			// {
			// 	test: /\.css$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: "style-loader",
			// 		use: 'css-loader'
			// 	})
			// },
			// {
			// 	test: /\.less$/,
			// 	use: ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: ['css-loader', 'less-loader']
			// 	})
            // },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                ],
              },
              {
                test: /\.less$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      // you can specify a publicPath here
                      // by default it uses publicPath in webpackOptions.output
                      publicPath: '../',
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader','less-loader'
                ],
              },
			 {
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'assets/[name].[ext]'
		            }
		          }
		        ]
		   },
		    {
		        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 8192,
		              name:'assets/[name].[ext]'
		            }
		          }
		        ]
		    }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例 
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        // new ExtractTextPlugin("css/[name].css"),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
          }),
        // new CleanWebpackPlugin(['dist']),  // 所要清理的文件夹名称
    ],
    devServer: {
        contentBase: "./dist", // 本地服务器所加载文件的目录
        port: "8088",   // 设置端口号为8088
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true, //不跳转
        hot: true, // 热更新
        proxy: {
          '/api': {
            target: 'http://localhost:9093/',
            pathRewrite: {'^/api' : ''},
            changeOrigin: true,     // target是域名的话，需要这个参数，
            secure: false,          // 设置支持https协议的代理
          },
        }
    }
}
// https://juejin.im/post/5bd66efcf265da0a8a6af2d2