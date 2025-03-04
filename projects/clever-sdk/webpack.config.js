import path from 'path';

export default {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        extensionAlias: {
            '.js': ['.js', '.ts', '.tsx']
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve('dist'),
        library: '@lingames/clever-sdk',
        libraryTarget: 'commonjs2'
    }
};