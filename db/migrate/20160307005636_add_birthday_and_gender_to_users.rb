class AddBirthdayAndGenderToUsers < ActiveRecord::Migration
  def change
    add_column :users, :birthday, :date
    add_column :users, :gender, :string
  end
end
