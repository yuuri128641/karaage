# next-styled-components-template

## Requirements
* Node.js 18.x
* Yarn v1.x

## Installation

### Node.js

Node.js v18.xをマシンへインストールします。
次のいずれかの方法でのインストールをおすすめします。

* [公式インストーラー](https://nodejs.org/dist/latest-v14.x/)
* [nodenv](https://github.com/nodenv/nodenv)
* [nodebrew](https://github.com/hokaccha/nodebrew)
* [nvm](https://github.com/nvm-sh/nvm)

### Yarn

Node.jsのパッケージマネージャー Yarn (v1.x) をインストールします。
環境によってインストール方法が異なります。

> https://yarnpkg.com/lang/ja/docs/install/

```shell script
# for macOS
$ brew install yarn

# for Windows (with Chocolatey)
$ choco install yarn
```

なお、 `npm install -g yarn` でインストールされたYarnはパッケージの整合性チェックが脆弱なため、必ず推奨される方法でインストールしてください。

### NPM Packages

Nextアプリの実行に必要なnpmパッケージをインストールします。

```shell script
$ yarn install
```

## Development

開発サーバーを起動するには、次のコマンドを実行します。

```shell script
$ yarn dev
```

http://localhost:3000 で開発サーバーが起動します。

## Build

Nextアプリをビルドします。
そして、ビルドされたNextアプリを起動します。

```shell script
$ yarn build
```

## storybook

開発サーバーを起動するには、次のコマンドを実行します。

```shell script
$ yarn storybook
```

http://localhost:3000 で開発サーバーが起動します。

## Directory
基本的に src を編集

```
├── dist/（納品ファイルがここに生成される）
│
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