class Friendship < ActiveRecord::Base
  validates :friend_id, :self_id, presence: true

  belongs_to :self,
    class_name: "User",
    foreign_key: :self_id,
    primary_key: :id

  belongs_to :friend,
    class_name: "User",
    foreign_key: :friend_id,
    primary_key: :id

end
