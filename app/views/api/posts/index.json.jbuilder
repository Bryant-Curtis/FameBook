json.array! @posts do |post|
  json.extract! post, :body, :id
  json.author do
    json.name post.author.first_name + " " + post.author.last_name
  end
end
