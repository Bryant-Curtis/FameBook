class User < ActiveRecord::Base
  validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_token, :build_birthday

  has_many :posts,
    class_name: "Post",
    foreign_key: :author_id,
    primary_key: :id

  has_many :friendships,
    class_name: "Friendship",
    foreign_key: :self_id,
    primary_key: :id

  has_many :friends,
    through: :friendships,
    source:  :friend

  has_many :received_friend_requests,
    class_name: "FriendRequest",
    foreign_key: :requestee_id,
    primary_key: :id

  has_many :sent_friend_requests,
    class_name: "FriendRequest",
    foreign_key: :requestor_id,
    primary_key: :id

  has_many :photos,
    class_name: "Photo",
    foreign_key: :photoable_id,
    primary_key: :id

  has_one :cover_photo,
    class_name: "Photo",
    foreign_key: :photoable_id,
    primary_key: :id

  has_one :profile_photo,
    class_name: "Photo",
    foreign_key: :photoable_id,
    primary_key: :id

  # CAN I MAKE THESE ATTR_ACCESSORS?

  def birthday_date=(date)
    @birthday_date = date.to_i
  end

  def birthday_year=(year)
    @birthday_year = year.to_i
  end

  def birthday_month=(month)
    @birthday_month = month.to_i
  end

  def build_birthday
    if @birthday_year != nil
      birthday = Date.new(@birthday_year, @birthday_month, @birthday_date).to_s
      self.birthday = birthday
    end
  end

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
