json.extract! user, :id, :first_name, :last_name, :email, :birthday, :gender
json.received_friend_requests user.received_friend_requests do |received_friend_request|
  json.extract! received_friend_request, :id, :requestee_id, :requestor_id, :declined
end
json.sent_friend_requests user.sent_friend_requests do |sent_friend_request|
  json.extract! sent_friend_request, :id, :requestee_id, :requestor_id, :declined
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
  json.extract! photo, :id, :photoable_id, :photoable_type
  json.url photo.photograph.url
end
# if unneeded, take out the json.self_id row completely.
