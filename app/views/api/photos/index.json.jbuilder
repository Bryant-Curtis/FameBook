json.array! @photos do |photo|
  json.extract! photo, :id, :photoable_id, :photoable_type
end
