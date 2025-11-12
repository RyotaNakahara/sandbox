# Laravel モダン環境メモ

## バックエンド
- Laravel 12（`composer create-project laravel/laravel laravel-app`）
- Laravel Sail（`./vendor/bin/sail`）で Docker コンテナ化  
  - PHP 8.4 / Nginx / MySQL / Redis / Mailpit / Meilisearch / Selenium
- Laravel Breeze（Inertia + API 認証ベース）
- Laravel Sanctum（SPA / モバイル向けトークン認証）
- Pest（`./vendor/bin/pest`）によるテスト実行
- SQLite（`:memory:`）を用いたテスト用データベース設定

## フロントエンド
- Inertia.js + React 18 + TypeScript 構成
- Vite 7 / `@vitejs/plugin-react` 4 系
- Tailwind CSS + @tailwindcss/forms
- Axios（API クライアント）

## 開発環境
- Dev Containers（`.devcontainer/`）で VS Code などから統一環境を再現
- npm / Vite でのビルド: `npm install` → `npm run dev` or `npm run build`
- Laravel Sail 経由でのアプリ起動: `./vendor/bin/sail up -d`

