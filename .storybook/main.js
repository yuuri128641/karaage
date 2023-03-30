const path = require('path');
module.exports = {
  typescript : { reactDocgen: false },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "staticDirs": ["../public"],
  "typescript": { reactDocgen: false }, // nodeのverが高くてうまく動かない時に入れる
  webpackFinal: async (config) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "@/components": path.resolve(__dirname, "../src/components"),
        "@/styles": path.resolve(__dirname, "../src/styles"),
        "@/utils": path.resolve(__dirname, "../src/utils"),
      };

    return {
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                'next-i18next': 'react-i18next',
            },
        },
    };
  },
}