json.array! @users do |user|
  json.id         user.id
  json.first_name user.first_name
  json.last_name  user.last_name
  json.posts user.posts do |post|
    json.extract! post, :id, :body, :author_id
    json.author do
      json.name post.author.first_name + " " + post.author.last_name
    end
  end
end
