module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:import/typescript", "plugin:jsx-a11y/recommended", "plugin:react/recommended", "plugin:react-hooks/recommended", "prettier", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    // import React は不要
    "@typescript-eslint/no-explicit-any": 0,
    // 一時的に無効化。いずれ有効化予定
    "no-use-before-define": 0,
    // styled-componentsの型定義とぶつかるため切っている
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "react/jsx-filename-extension": ["error", {
      extensions: [".jsx", ".tsx"]
    }],
    "react/jsx-props-no-spreading": ["off"],
    quotes: ["error", "double"]
  },
  overrides: [{
    files: ["**/*.tsx"],
    rules: {
      "react/prop-types": "off"
    }
  }]
};