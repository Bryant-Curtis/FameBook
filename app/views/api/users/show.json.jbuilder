json.extract! @user, :first_name, :last_name, :email
json.posts @user.posts do |post|
  json.id         post.id
  json.body       post.body
  json.author_id  post.author_id
end
