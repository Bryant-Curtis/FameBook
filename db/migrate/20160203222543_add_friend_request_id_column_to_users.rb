class AddFriendRequestIdColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :friend_request_id, :integer
  end
end
