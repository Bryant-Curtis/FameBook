class FriendRequest < ActiveRecord::Base
  validates :requestee_id, :requestor_id, presence: true
  validates :requestee_id, uniqueness: { scope: :requestor_id }
  validates :requestor_id, uniqueness: { scope: :requestee_id }

  belongs_to :requestee,
    class_name:  "User",
    foreign_key: :requestee_id,
    primary_key: :id
end
