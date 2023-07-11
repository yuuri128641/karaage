# KARAAGE

annris PORTFORIO
https://www.annris.com/

## Requirements
* Node.js 18.x
* Yarn v1.x

## Getting Started

### NPM Packages

```shell script
$ yarn install
```

### Development

```shell script
$ yarn dev
```

http://localhost:3000 で開発サーバーが起動します。

### Build

```shell script
$ yarn build
```

### storybook

```shell script
$ yarn storybook
```

## Directory
基本的に src を編集

```
├── node_modules/
│   └── パッケージ各種
│
├── .storybook/
│   └── storybookの設定
│
├── .next/
│
├── public/（そのまま公開するファイル）
│   └── favicon.png
│
├── src/（ビルド前のソース）
│   ├── components/（コンポーネント）
│   │    └── atoms
│   │    └── molecules
│   │    └── organisms
│   ├── pages/（ページ）
│   ├── stories/
│   ├── styles/
│   └── utils/
│
├── .git/
├── .gitignore
├── package.json
└── README.md
```

## Technology

- TypeScript
- Next.js
- styled-components
- Vercel
  