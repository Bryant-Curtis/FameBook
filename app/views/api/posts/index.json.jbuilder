json.array! @posts.sort_by(&:created_at) do |post|
  json.partial! "api/posts/post", post: post
end
