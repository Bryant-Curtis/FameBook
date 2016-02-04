json.partial! "api/users/user", user: @user
json.posts @user.posts.sort_by(&:created_at) do |post|
  json.extract! post, :id, :body, :author_id
  json.author do
    json.name post.author.first_name + " " + post.author.last_name
  end
end
