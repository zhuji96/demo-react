const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const os = require("os");
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const ENTRY_PATH = resolve(__dirname, "src", "index.js");

module.exports = {
    entry: {
        app: [ENTRY_PATH]
    },
    output: {
        filename: "[name].[hash:8].js",
        path: resolve(__dirname, "build")
    },
    mode: "development",
    devServer: {
        contentBase: "build",
        open: true,
        port: 5000,
        hot: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     include: resolve(__dirname, "src"),
            //     loader: "eslint-loader"
            // },
            {
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: "ts-loader"
                    },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "thread-loader",
                                options: {
                                    workers: os.cpus().length
                                }
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        "@babel/preset-react",
                                        [
                                            "@babel/preset-env",
                                            {
                                                modules: false,
                                                useBuiltIns: "false",
                                                corejs: 2
                                            }
                                        ]
                                    ],
                                    plugins: [
                                        "@babel/plugin-transform-runtime",
                                        "@babel/plugin-syntax-dynamic-import",
                                        [
                                            "import",
                                            {
                                                libraryName: "antd",
                                                libraryDirectory: "es",
                                                style: "css"
                                            }
                                        ]
                                    ],
                                    cacheDirectory: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            { loader: "style-loader" },
                            {
                                loader: "css-loader",
                                options: {
                                    importLoaders: 1
                                }
                            }
                            // {
                            //     loader: "postcss-loader"
                            // }
                        ]
                    },
                    {
                        test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
                        loader: "url-loader",
                        options: {
                            limit: 8 * 1024,
                            name: "[name].[hash:8].[ext]"
                        }
                    },
                    {
                        exclude: /\.(js|json|less|css|jsx|html)$/,
                        loader: "file-loader",
                        options: {
                            outputPath: "media",
                            name: "[name].[hash].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "src", "index.html")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        // new HardSourceWebpackPlugin()
    ]
};
