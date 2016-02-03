json.extract! @user, :first_name, :last_name, :email
json.posts @user.posts do |post|
  json.extract! post, :id, :body, :author_id
  json.author do
    json.name post.author.first_name + " " + post.author.last_name
  end
end
