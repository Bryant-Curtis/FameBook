class Photo < ActiveRecord::Base
# These are the Paperclip line from the github ReadMe Quickstart section below!
  has_attached_file :photograph, styles: {
    profile: "152x152#",
    cover: "850x314#",
    list: "206x206#"
  }, default_url: "/api/photos/21"

  validates_attachment_content_type :photograph, content_type: /\Aimage\/.*\Z/

  belongs_to :photoable, polymorphic: true

end
