json.extract! post, :id, :body, :author_id, :created_at
json.author do
  json.name post.author.first_name + " " + post.author.last_name
end
