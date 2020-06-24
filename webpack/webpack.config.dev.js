const webpack = require("webpack");
const env = require("./env");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");

const config = {
    devServer: {
        port: 3000
    },
    mode: "development",
    entry: ["webpack-dev-server/client?http://0.0.0.0:3000", "webpack/hot/dev-server", `${env.src}/index.tsx`],
    output: {
        filename: "static/js/[name].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: [env.src, "node_modules"],
        /* alias: {
            conf: env.conf,
            "@ant-design/icons/lib/dist$": `${env.src}/asset/ant-icons.ts`,
        }, */
    },
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            automaticNameDelimiter: "-",
            maxAsyncRequests: 10,
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: env.src,
                loader: "ts-loader",
                options: {
                    configFile: env.tsConfig,
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [TSImportPlugin({libraryName: "antd", libraryDirectory: "es", style: true})],
                    }),
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                query: {
                    limit: 1024,
                    name: "static/img/[name].[hash:8].[ext]", // resources from different folder can have same file name, use hash to differentiate
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "static/font/[name].[hash:8].[ext]", // resources from different folder can have same file name, use hash to differentiate
                },
            },
        ],
    },
    plugins: [
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.src,
            files: "**/*.less",
            syntax: "less",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            eslint: env.eslintConfig,
        }),
        new HTMLPlugin({
            template: `${env.src}/index.html`,
            // favicon: `${env.conf}/favicon.ico`,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
};

module.exports = config;
