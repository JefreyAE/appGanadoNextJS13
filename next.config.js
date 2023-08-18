/** @type {import('next').NextConfig} */

const webpack = require('webpack');


const nextConfig = {
    webpack: (config) => {
        config.plugins.push(
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
          })
        );
    
        return config;
      },
}

module.exports = nextConfig
