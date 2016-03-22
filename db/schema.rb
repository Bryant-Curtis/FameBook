# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160322162013) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friend_requests", force: :cascade do |t|
    t.integer  "requestee_id",                 null: false
    t.integer  "requestor_id",                 null: false
    t.boolean  "declined",     default: false, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "friend_requests", ["requestee_id", "requestor_id"], name: "index_friend_requests_on_requestee_id_and_requestor_id", unique: true, using: :btree
  add_index "friend_requests", ["requestor_id", "requestee_id"], name: "index_friend_requests_on_requestor_id_and_requestee_id", unique: true, using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "friend_id",  null: false
    t.integer  "self_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "friendships", ["friend_id"], name: "index_friendships_on_friend_id", using: :btree
  add_index "friendships", ["self_id"], name: "index_friendships_on_self_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.integer  "photoable_id"
    t.string   "photoable_type"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "photograph_file_name"
    t.string   "photograph_content_type"
    t.integer  "photograph_file_size"
    t.datetime "photograph_updated_at"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "body",       null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name",      null: false
    t.string   "last_name",       null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.date     "birthday",        null: false
    t.string   "gender",          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
