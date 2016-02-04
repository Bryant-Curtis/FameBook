json.array! @users do |user|
  json.partial! "api/users/user", user: user
  json.posts user.posts do |post|
    json.partial! "api/posts/post", post: post
  end
end

# json.posts user.posts.sort_by(&:created_at) Don't want to do this.
# Better to change structure to have a Feed controller
# to send down the feed. Don't just give all of the posts to all of the users.
# Bad design and inefficient.
