json.extract! user, :id, :first_name, :last_name, :email, :friend_request_id
json.friendships user.friendships do |friendship|
  json.id         friendship.id
  json.friend_id  friendship.friend_id
  json.self_id    friendship.self_id
end
json.friends user.friends do |friend|
  json.extract! friend, :id, :first_name, :last_name, :email
end
json.photos user.photos do |photo|
  json.photoable_id   user.photoable_id
  json.photoable_type user.photoable_type
end
# if unneeded, take out the json.self_id row completely.
