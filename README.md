# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(255)|null: false|
|email|varchar(255)|null: false|
|encrypted_password|varchar(255)|null: false|

### Association
- has_many :members
- has_many :groups, through: :members

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|varchar(255)|null: false|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|foreign_key: true|

### Association
- has_many :messeges
- has_many :members
- has_many :users, through: :members

## memberテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messegeテーブル
|Column|Type|Options|
|------|----|-------|
|bodt|text|null: false|
|image|string||
|group_id|integer|null: false, forex1ign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
