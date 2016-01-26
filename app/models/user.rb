class User < ActiveRecord::Base
  validates :fname, :lname, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow: nil }


end

# How do I use the db for friend requests? Or is it not involved here?
