const chalk = require("chalk");
const webpack = require("webpack");
const fs = require("fs-extra");
const env = require("./env");
const webpackConfig = require("./webpack.config.build");

function cleanup() {
    console.info(chalk`{green.bold [task]} {white.bold cleanup build/dist}`);
    fs.emptyDirSync(env.dist);
}

function build() {
    cleanup();

    console.info(chalk`{white.bold [env]} conf=${env.conf}`);
    console.info(chalk`{green.bold [task]} {white.bold webpack}`);

    const compiler = webpack(webpackConfig);
    compiler.run();
}

build();
