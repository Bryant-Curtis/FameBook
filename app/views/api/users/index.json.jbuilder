json.array! @users do |user|
  json.partial! "api/users/user", user: user
  json.posts user.posts do |post| # json.posts user.posts.sort_by(&:created_at) Don't want to do this.
    json.extract! post, :id, :body, :author_id # Better to change structure to have a Feed controller
    json.author do # to send down the feed. Don't just give all of the posts to all of the users.
      json.name post.author.first_name + " " + post.author.last_name # Bad design and inefficient.
    end
  end
end
