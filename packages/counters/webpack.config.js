// webpack.config.js
import path from 'path';

export default {
    // Set the mode to 'production' for optimization
    mode: 'production',

    // This defines the name of the global variable (e.g., window.MyLibrary)


    // 1. Where Webpack starts reading your application code
    entry: './src/multi_radix_counter/Counters.js',

    // 2. Where Webpack should output the final, bundled file
    output: {
        // __dirname is not available in Node ESM, use path.resolve instead
        path: path.resolve(process.cwd(), 'dist'),
        library: 'CountersLibrary',
        filename: 'multi.radix.counter.js',
        libraryTarget: 'umd',
        libraryExport: 'default', // Instructs Webpack to pull the 'default' property
        globalObject: 'this'      // Ensures the UMD wrapper finds the global scope
    },

    // Add a simple loader for .js files (optional, but often needed)
    module: {
        rules: [
            {
                test: /\.js$/,
                // Exclude node_modules from processing
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel to transpile if needed
                },
            },
        ],
    },
    // Resolve extensions to allow importing without them
    resolve: {
        extensions: ['.js', '.json', '.mjs']
    }
};