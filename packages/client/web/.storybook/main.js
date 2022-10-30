const path = require("path");

module.exports = {
  "stories": [
    "../components/**/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-css-modules",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "webpackFinal": async (config, { configType }) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });

    return config;
  }
}