class Api::FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.new(friendship_params)
    @user = User.find(@friendship.self_id)
    if @friendship.save
      render "/api/users/show", user: @user
    else
      render @friendship.errors.full_messages
    end
  end

  def show
    @friendship = Friendship.find(params[:id])
  end

  def destroy
    @friendship_friend = Friendship.where(
      ["friend_id = :friend_id and self_id = :self_id",
      { friend_id: params[:friendships][:friend_id],
        self_id:   params[:friendships][:self_id] }])
    @friendship_self = Friendship.where(
      ["friend_id = :friend_id and self_id = :self_id",
      { friend_id: params[:friendships][:self_id],
        self_id:   params[:friendships][:friend_id] }])
    @friendship_friend[0].destroy
    @friendship_self[0].destroy
    render json: { friend: @friendship_friend[0], self: @friendship_self[0] }
  end

  private

  def friendship_params
    params.require(:friendship).permit(:friend_id, :self_id)
  end

end
