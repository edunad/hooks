'use strict';

// Karma configuration

// To pass params, start with -- first. Example :
// npm test -- --debug

module.exports = function (config) {
    let singleMode = hasArg('--single') != null;
    let specArg = hasArg('--spec');
    if (specArg != null) {
        specArg = `./tests/**/!(${specArg.replace('--spec=', '')}).spec.ts`;
    }

    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        failOnEmptyTestSuite: false,

        files: [
            './src/**/*.ts',
            './tests/**/*.ts'
        ],

        exclude: ['./src/**/*.d.ts', specArg != null ? specArg : ''],

        preprocessors: {
            './src/**/*.ts': ['webpack'],
            './tests/**/*.spec.ts': ['webpack'],
        },

        reporters: [
            'progress',
            'coverage-istanbul',
            'coveralls'
        ],

        karmaTypescriptConfig: {
            tsconfig: './tsconfig.json'
        },

        webpack: {
            mode: 'development',
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        loader: 'ts-loader?silent=true',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.ts$/,
                        exclude: /(node_modules|\.spec\.ts$)/,
                        loader: 'istanbul-instrumenter-loader',
                        enforce: 'post',
                        options: {
                            esModules: true
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.js']
            }
        },
        webpackMiddleware: {
            stats: 'errors-only',
            logLevel: 'silent'
        },

        coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            combineBrowserReports: true,
            skipFilesWithNoCoverage: true,
            reports: ['lcov']
        },

        // web server port
        port: 9876,

        autoWatch: true,
        browsers: ['Chrome_without_security'],

        singleRun: singleMode,
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--allow-file-access-from-files']
            }
        }
    })
}

function hasArg(lookout) {
    let found = null;
    process.argv.forEach((arg) => {
        if (arg.indexOf(lookout) != -1) found = arg;
    });

    return found;
}