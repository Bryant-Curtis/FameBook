class Friendship < ActiveRecord::Base
  validates :friend_id, :self_id, presence: true
  validates :self_id,   uniqueness: { scope: :friend_id }
  validates :friend_id, uniqueness: { scope: :self_id }

  belongs_to :self,
    class_name: "User",
    foreign_key: :self_id,
    primary_key: :id

  belongs_to :friend,
    class_name: "User",
    foreign_key: :friend_id,
    primary_key: :id

end
