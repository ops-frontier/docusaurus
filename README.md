# Ops Frontier Docusaurus

Ops Frontier の開発においてはドキュメントをマークダウンで記述し、 Docusaurus で配信する。
このリポジトリでは、 Docusaurus のテンプレートを利用して、マークダウンのプレビューを行う仕組みを提供する。

## 1.修正開始

以下のコマンドでプルリクエストの作成を開始する。

```
npx start-pr
```

## 2. テスト

以下のコマンドでテストを実行できる。

```
cd test
npm run start
```

## 3. commit

以下のコマンドでプルリクエストの commit を行う。

```
npx add-change
```

## 4. push

以下のコマンドでプルリクエストの push を行い、RC版をリリースする。

```
npx push-pr
```

## 5. end

以下のコマンドでプルリクエストを終了して、マージする。

```
npx end-pr
```
