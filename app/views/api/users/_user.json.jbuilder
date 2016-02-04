json.extract! user, :id, :first_name, :last_name, :email, :friend_request_id
json.friendships user.friendships do |friendship|
  json.friend_id friendship.friend_id
  json.self_id   friendship.self_id
end
json.friends user.friends do |friend|
  json.extract! friend, :id, :first_name, :last_name, :email
end

# if unneeded, take out the json.self_id row completely.
