json.extract! post, :id, :body, :author_id
json.author do
  json.name post.author.first_name + " " + post.author.last_name
end
