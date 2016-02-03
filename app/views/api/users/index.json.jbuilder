json.array! @users do |user|
  json.id         user.id
  json.first_name user.first_name
  json.last_name  user.last_name
  json.posts user.posts do |post|
    json.id         post.id
    json.body       post.body
    json.author_id  post.author_id
  end
end
