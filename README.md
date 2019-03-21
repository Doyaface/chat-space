# README

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(255)|index:true, null: false|
|email|varchar(255)|unique: true, null: false|
|encrypted_password|varchar(255)|null: false|

### Association
- has_many :members
- has_many :groups, through: :members

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(255)|null: false|


### Association
- has_many :messeges
- has_many :members
- has_many :users, through: :members

## memberテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messegeテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|check(image!= null or body = null)|
|image|string||
|group_id|references|null: false, forex1ign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
