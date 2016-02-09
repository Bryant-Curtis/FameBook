json.extract! user, :id, :first_name, :last_name, :email, :friend_request_id
json.friend_requests user.friend_requests do |friend_request|
  json.extract! friend_request, :id, :requestee_id, :requestor_id, :declined
end
json.friendships user.friendships do |friendship|
  json.extract! friendship, :id, :friend_id, :self_id
end
json.friends user.friends do |friend|
  json.extract! friend, :id, :first_name, :last_name, :email
  json.friendships friend.friendships do |friendship|
    json.extract! friendship, :id, :friend_id, :self_id
  end
end
json.photos user.photos do |photo|
  json.extract! photo, :photoable_id, :photoable_type
end
# if unneeded, take out the json.self_id row completely.
