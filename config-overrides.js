// create-react-app contains its own predefined configuration of webpack
// You may consult it here:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js

// 1. An option to set our own would be to invoke npm run eject,
//    which would disregard the 3rd party configuration and copy the modules and configs to the local folder
//    - This option should be avoided, since once activated there's no revert option

// 2. Another possible approach is to use https://www.npmjs.com/package/react-app-rewired
//    to override the current configuration, adding whichever required module and config.
//    - This is the preferred approach, since it does not break the original configuration

//    If advanced settings are required, evaluate the need to use https://www.npmjs.com/package/customize-cra

const TerserPlugin = require('terser-webpack-plugin');
const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

const override = (config, env) => {
    const isEnvProduction = env === 'production';

    // Variable used for enabling profiling in Production
    // passed into alias object. Uses a flag if passed into the build command
    const isEnvProductionProfile =
        isEnvProduction && process.argv.includes('--profile');

    config.optimization.minimizer[0] = new TerserPlugin({
        terserOptions: {
            parse: {
                // We want terser to parse ecma 8 code. However, we don't want it
                // to apply any minification steps that turns valid ecma 5 code
                // into invalid ecma 5 code. This is why the 'compress' and 'output'
                // sections only apply transformations that are ecma 5 safe
                // https://github.com/facebook/create-react-app/pull/4234
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebook/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                // Disabled because of an issue with Terser breaking valid code:
                // https://github.com/facebook/create-react-app/issues/5250
                // Pending further investigation:
                // https://github.com/terser-js/terser/issues/120
                inline: 2,
            },
            mangle: true,
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
                ecma: 5,
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebook/create-react-app/issues/2488
                ascii_only: true,
            },
        },
        sourceMap: false,
    });

    config = rewireAliases.aliasesOptions({
        '@modules': path.resolve(__dirname, `${paths.appSrc}/application/modules/`),
        '@global': path.resolve(__dirname, `${paths.appSrc}/application/global/`),
        '@api': path.resolve(__dirname, `${paths.appSrc}/application/commands/`),
        '@3rdparty': path.resolve(__dirname, `${paths.appSrc}/application/utils/`),
        '@presentation-components': path.resolve(__dirname, `${paths.appSrc}/presentation/components/`),
        '@presentation-actions': path.resolve(__dirname, `${paths.appSrc}/presentation/store/actions/`),
        '@presentation-reducers': path.resolve(__dirname, `${paths.appSrc}/presentation/store/reducers/`),        
    })(config, env);

    return config;
}

module.exports = override;