const chalk = require("chalk");
const webpack = require("webpack");
const env = require("./env");
const webpackConfig = require("./webpack.config.dev");
const DevServer = require("webpack-dev-server");

function devServer(compiler) {
    return new DevServer(compiler, {
        contentBase: env.static,
        historyApiFallback: true,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        stats: {
            colors: true,
        },
        /* proxy: [
            {
                context: ["/ajax", "/qr"],
                target: "https://www.ceshi9527.com",
                secure: false,
                changeOrigin: true,
            },
        ], */
    });
}

function start() {
    console.info(chalk`{white.bold [env]} conf=${env.conf}`);

    const compiler = webpack(webpackConfig);
    const server = devServer(compiler);
    server.listen(3000, "0.0.0.0", error => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green http://localhost:3000/} \n`);
        return null;
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
    });
}

start();
