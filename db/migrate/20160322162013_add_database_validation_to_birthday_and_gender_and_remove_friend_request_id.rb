class AddDatabaseValidationToBirthdayAndGenderAndRemoveFriendRequestId < ActiveRecord::Migration
  def change
    change_column :users, :birthday, :date, null: false
    change_column :users, :gender, :string, null: false

    remove_column :users, :friend_request_id, :integer
  end
end
