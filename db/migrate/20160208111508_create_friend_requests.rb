class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :requestee_id,  null: false
      t.integer :requestor_id,  null: false
      t.boolean :declined,      null: false, default: false

      t.timestamps null: false
    end
    add_index :friend_requests, [:requestee_id, :requestor_id], unique: true
    add_index :friend_requests, [:requestor_id, :requestee_id], unique: true
  end
end
