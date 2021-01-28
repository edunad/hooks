'use strict';

const dts = require('dts-bundle');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const pckg = require("./package.json");

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = (compiler) => {
    compiler.hooks.done.tap('DtsBundle', () => {
        dts.bundle({
            name: pckg.name,
            main: './src/index.d.ts',
            out: '../.bin/index.d.ts',

            removeSource: true,
            outputAsModuleFolder: true
        });
    });
};

// SETUP
let config = {
    devtool: 'source-map',

    entry: {
        'index': './src/index.ts',
    },

    // Config for our build files
    output: {
        path: path.resolve(__dirname, './.bin'),
        filename: 'index.js',

        library: pckg.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: ['node_modules'],

        symlinks: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader?configFile=tsconfig.webpack.json'
                }],
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    },

    plugins: [
        new DtsBundlePlugin(),
        new CopyPlugin({
            patterns: [
                { from: './package.json', to: './' },
                { from: './README.md', to: './' },
                { from: './LICENSE', to: './' }
            ]
        }),
    ]
};


module.exports = (env, argv) => {
    const production = argv.mode === 'production';
    if (production) config.devtool = false;
    
    return config;
};