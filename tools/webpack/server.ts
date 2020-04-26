import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import * as parseArgs from "minimist";
import { BaseConfig, baseConfig, webpackConfig } from "./config";

const argv = parseArgs(process.argv.slice(2));
const cfg: BaseConfig = {
    ...baseConfig,
    mode: argv.production ? "production" : "development",
};

const devServerConfig = (cfg: BaseConfig): webpackDevServer.Configuration => {
    return {
        port: cfg.port,
        publicPath: cfg.publicPath,
        contentBase: cfg.srcPath,
        openPage: `main/`,
        lazy: false,
        compress: false,
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: false,
        hot: true,
        overlay: true,
        open: true,
        watchContentBase: true,
    };
};

(() => {
    const server = new webpackDevServer(
        webpack(webpackConfig(cfg)),
        devServerConfig(cfg)
    );
    server.listen(cfg.port, "localhost", (e) => {
        if (e) {
            console.error(e);
            process.exit(1);
        }
    });
})();
