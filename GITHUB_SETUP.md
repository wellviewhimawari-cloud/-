# GitHub連携手順

## できること

このフォルダの `index.html` をGitHubに置くと、GitHub Pagesで予約フォームを公開できます。

## 公開手順

1. GitHubで新しいリポジトリを作成します。
2. `outputs/index.html` をリポジトリ直下にアップロードします。
3. GitHubの `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `Deploy from a branch` にします。
5. Branchを `main`、フォルダを `/root` にして保存します。
6. 表示されたURLを開くとフォームが使えます。

## 注意

現在の予約データは、フォームを開いているブラウザ内に保存されます。別の端末やスマホから入った予約を1か所に集めるには、Googleフォーム、Googleスプレッドシート、またはサーバー/API連携が必要です。

GitHubに予約者情報を直接保存する場合、画面にGitHubトークンを埋め込む方法は安全ではありません。必要な場合は、GitHub Actionsや別APIを経由する方式にしてください。
