class Api::PostsController < ApplicationController

  def index
    @posts = Post.all.includes(:author)
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      redirect_to api_posts_url
    else
      flash[:errors] = @post.errors.full_messages
      render api_posts_url
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render api_posts_url
  end

  private

  def post_params
    params.require(:post).permit(:body, :id)
  end

end
