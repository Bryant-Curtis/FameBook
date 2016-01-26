class User < ActiveRecord::Base
  validates :fname, :lname, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow: nil }




end

# Questions
# 1. Why is it that by creating a writer method we can create and set
#     a password_digest?

# Try later to add a validation to email to confirm it is in the correct format.
# How do I use the db for friend requests? Or is it not involved here?
