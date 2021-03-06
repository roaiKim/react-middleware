const webpack = require("webpack");
const env = require("./env");
const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const HTMLPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const config = {
    mode: "production",
    entry: `${env.src}/index.tsx`,
    output: {
        path: env.dist,
        filename: "static/js/[name].[chunkhash:8].js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
        modules: [env.src, "node_modules"],
        alias: {
            conf: env.conf,
            "@ant-design/icons/lib/dist$": `${env.src}/asset/ant-icons.ts`,
        },
    },
    devtool: "nosources-source-map",
    bail: true,
    optimization: {
        namedModules: true,
        runtimeChunk: "single",
        splitChunks: {
            automaticNameDelimiter: "-",
            maxAsyncRequests: 12,
        },
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                    },
                },
            }),
        ],
    },
    performance: {
        // Current bundled entry is less than 700KB
        maxEntrypointSize: 730000,
        maxAssetSize: 1000000,
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
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            plugins: () => [autoprefixer],
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                query: {
                    limit: 1024,
                    name: "static/img/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "static/font/[name].[hash:8].[ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
            useTypescriptIncrementalApi: false,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.src,
            files: "**/*.less",
            syntax: "less",
        }),
        new HTMLPlugin({
            template: `${env.src}/index.html`,
            favicon: `${env.src}/asset/favicon.ico`,
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                includeAutoGeneratedTags: false,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeTagWhitespace: true,
                useShortDoctype: true,
            },
        }),
        new webpack.ProgressPlugin({profile: env.profile}),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new BundleAnalyzerPlugin()
    ],
};

module.exports = config;
