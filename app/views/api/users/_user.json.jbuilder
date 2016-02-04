json.extract! user, :id, :first_name, :last_name, :email, :friend_request_id
json.friends user.friends do |friend|
  json.extract! friend, :id, :first_name, :last_name, :email
end
