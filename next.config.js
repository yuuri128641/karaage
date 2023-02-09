/** @type {import('next').NextConfig} */
/*
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/


module.exports = {
  /*webpack: config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    })
    return config
  },*/
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  }, 
}