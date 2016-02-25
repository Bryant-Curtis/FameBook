json.partial! "api/users/user", user: @user
json.posts @user.posts.sort_by(&:created_at).reverse do |post|
  json.partial! "api/posts/post", post: post
end
# json.posts[0].created_at.year @user.posts[0].created_at.year

# json.extract! post, :id, :body, :author_id
# json.author do
#   json.name post.author.first_name + " " + post.author.last_name
# end
