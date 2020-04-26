import * as path from "path";
import * as webpack from "webpack";
import * as TerserPlugin from "terser-webpack-plugin";
import * as ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";
import * as GitRevisionPlugin from "git-revision-webpack-plugin";
import * as EsmWebpackPlugin from "@purtuga/esm-webpack-plugin";

export enum Apps {
    MAIN = "main",
}

export const BASE_PATH = path.resolve(__dirname, "../../");
export const SRC_PATH = path.join(BASE_PATH, "./src/");
export const DIST_PATH = path.join(BASE_PATH, "./dist/");
export const TEMP_PATH = path.join(BASE_PATH, "./temp/");

export const baseConfig: BaseConfig = {
    mode: null,
    port: 8002,
    publicPath: "/",
    srcPath: SRC_PATH,
    distPath: DIST_PATH,
    tempPath: TEMP_PATH,
};

export const webpackConfig = (cfg: BaseConfig): webpack.Configuration => {
    const { mode, publicPath, srcPath, distPath } = cfg;

    const instanceRule = (app: Apps, entryName: string) => {
        return {
            test: /.ts?$/,
            include: [
                path.join(srcPath, `./${app}/`),
                path.join(srcPath, `./_common_/`),
            ],
            loader: "ts-loader",
            options: {
                instance: entryName,
                transpileOnly: true,
                projectReferences: true,
                reportFiles: ["*.ts"],
            },
        };
    };

    const terserPlugin = () => {
        return {
            cache: true,
            parallel: true,
            sourceMap: false, // No surceMaps in prod
            extractComments: false,
            terserOptions: {
                output: {
                    comments: /@copyright/i,
                },
                compress: {
                    defaults: false,
                    booleans: true,
                    conditionals: true,
                    dead_code: true,
                    drop_console: true,
                    drop_debugger: true,
                    if_return: true,
                    join_vars: true,
                    keep_fnames: /./,
                    sequences: true,
                    unused: true,
                },
                ie8: false,
                parse: {
                    html5_comments: false,
                    shebang: false,
                },
            },
        };
    };

    const tsCheckerPlugin = (app: Apps) => {
        return {
            tsconfig: path.join(srcPath, `./${app}/`),
            eslint: true,
            async: true,
            reportFiles: ["*.ts"],
            checkSyntacticErrors: true,
            measureCompilationTime: true,
            useTypescriptIncrementalApi: false,
            colors: true,
        };
    };

    const copyPluginConf = () => {
        const copyArray = Object.values(Apps).map((app) => {
            return {
                from: path.join(srcPath, `./${app}/`),
                to: path.join(distPath, `./${app}/`),
            };
        });
        cfg.mode !== "production"
            ? copyArray.push({
                from: path.join(BASE_PATH, `./data/`),
                to: path.join(distPath, `./data/`),
            })
            : null;
        return copyArray;
    };

    const gitRevisionPlugin = new GitRevisionPlugin();

    const copyrightBanner = (commitHash: string) => {
        return {
            banner: `Copyright (c) ${new Date().getFullYear()} by JaumeCalm. All rights reserved.\nRev ${commitHash}\n@copyright`,
            entryOnly: true,
        };
    };

    return {
        cache: true,
        parallelism: 5,
        devtool: "source-map",
        mode,
        entry: {
            main: path.join(srcPath, `./${Apps.MAIN}/scripts/index.ts`),
        },
        output: {
            publicPath,
            path: distPath,
            pathinfo: true,
            filename: (chunkData) => {
                switch (chunkData.chunk.name) {
                    case "main":
                        return `${Apps.MAIN}/scripts/index.js`;
                    default:
                        return null;
                }
            },
            library: "ViewerApi",
            libraryTarget: "var",
        },
        module: {
            rules: [instanceRule(Apps.MAIN, "main")],
        },
        optimization: {
            noEmitOnErrors: true,
            namedModules: true,
            namedChunks: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
            occurrenceOrder: true,
            providedExports: true,
            concatenateModules: true,
            usedExports: true,
            sideEffects: true,
            minimize: cfg.mode === "production",
            minimizer: cfg.mode === "production" ? [new TerserPlugin(terserPlugin())] : [],
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                MODE: cfg.mode,
            }),
            new ForkTsCheckerWebpackPlugin(tsCheckerPlugin(Apps.MAIN)),
            new CopyPlugin(copyPluginConf(), { ignore: ["*.ts", "*.js", "*tsconfig.json"], }),
            gitRevisionPlugin,
            new webpack.BannerPlugin(copyrightBanner(gitRevisionPlugin.commithash())),
            new EsmWebpackPlugin({
                exclude(_fileName: string, chunck: any) {
                    return chunck.name !== "chunkName";
                },
            }),
        ],
        resolve: {
            extensions: [".ts", ".js"],
        },
    };
};

export interface BaseConfig {
    mode: "development" | "production";
    port: number;
    publicPath: string;
    srcPath: string;
    distPath: string;
    tempPath: string;
}
