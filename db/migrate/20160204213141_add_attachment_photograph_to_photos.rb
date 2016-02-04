class AddAttachmentPhotographToPhotos < ActiveRecord::Migration
  def self.up
    change_table :photos do |t|
      t.attachment :photograph
    end
  end

  def self.down
    remove_attachment :photos, :photograph
  end
end
