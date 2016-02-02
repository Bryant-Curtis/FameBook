class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :friend_id, null: false
      t.integer :self_id,   null: false

      t.timestamps          null: false
    end
    add_index :friendships, :friend_id
    add_index :friendships, :self_id
  end
end
