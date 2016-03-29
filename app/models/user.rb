class User < ActiveRecord::Base
  validates :first_name, :last_name, :email, :password_digest, :session_token, :birthday, :gender, presence: true
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

  has_many :photos, as: :photoable

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

  def birthday_month=(month)
    @birthday_month = month.to_i
  end

  def birthday_year=(year)
    @birthday_year = year.to_i
  end

  def build_birthday
    if @birthday_date != 0 && @birthday_date != nil
      birthday = Date.new(@birthday_year, @birthday_month, @birthday_date).to_s
      self.birthday = birthday
    end
  end

  # Every time "User.new" or other models are instantiated and keys are pushed into the instance,
  # the "=" method is called for that key. So when the password is passed to @user, the password=
  # method in the model (here) is called where we can BCrypt the password and set it to the user.

  # setting @password allows calling :password in the validation which calls the reader method

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

# To do Later

# 1. Add a validation to email to confirm it is in the correct format.
# 2. Increase the validations on password to also check for one number and one letter.
