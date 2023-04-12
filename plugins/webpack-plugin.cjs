/* eslint-disable */
const { ProvidePlugin } = require('webpack');

function webpackPlugin(context, options) {
    return {
        name: 'webpack-plugin',
        configureWebpack(config) {
            return {
                module: {
                    rules: [
                        {
                            test: /\.m?js/,
                            resolve: {
                                fullySpecified: false,
                            },
                        },
                    ],
                },
                plugins: [
                    new ProvidePlugin({
                        process: require.resolve('process/browser'),
                    }),
                ],
                resolve: {
                    fallback: {
                        buffer: require.resolve('buffer'),
                        stream: false,
                        path: false,
                        process: false,
                    }
                },
            };
        },
    };
}

module.exports = {
    webpackPlugin,
};
