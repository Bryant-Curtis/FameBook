class Photo < ActiveRecord::Base
# These are the Paperclip line from the github ReadMe Quickstart section below!
  has_attached_file :photograph, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :photograph, content_type: /\Aimage\/.*\Z/

  belongs_to :user,
    class_name: "User",
    foreign_key: :photoable_id,
    primary_key: :id
end
