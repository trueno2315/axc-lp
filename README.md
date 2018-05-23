# axc-lp

#起動
nodemon node-test
※データベースをインストールし、テーブルを用意しないと
ログインや登録機能は動きません

=============================================================
事前準備

#mysqlのインストール
brew install mysql

#mysqlの起動
mysql.server start

#sqlクライアントのインストール
https://www.sequelpro.com/

#DBを作る
create db db_name

#usersテーブルの作成
CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `wallet` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `id_image` blob,
  `created_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
