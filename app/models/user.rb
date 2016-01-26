class User < ActiveRecord::Base
  validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def has_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_user_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil unless user && user.has_password?(password)
    user
  end

  private

  def ensure_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end




end

# Questions
# 1. Why is it that by creating a writer method we can create and set
#     a password_digest?

# Try later to add a validation to email to confirm it is in the correct format.
# How do I use the db for friend requests? Or is it not involved here?