# Schema Information



## friendships
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
friend_id   | integer   | not null, foreign key (references users), indexed

<!-- How do I use the db for friend request? Or is it not involved here? -->

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
file_data   | string    | not null
description | string    |
author_id   | integer   | not null, foreign key (references users), indexed

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
author_id   | integer   | not null, foreign key (references users), indexed

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
user_id     | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
fname           | string    | not null
lname           | string    | not null
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
<!-- sex             | ????    | not null -->
<!-- birthday        | date    | not null -->



<!-- Questions about DB -->

<!--
  1. Note: If feel it's important later, change email to be encrypted in database.
  2. Would sex be a string type data in the db?
 -->
