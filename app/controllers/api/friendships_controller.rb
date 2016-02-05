class Api::FriendshipsController < ApplicationController

  def create

  end

  def destroy
    @friendship_friend = Friendship.where(
      ["friend_id = :friend_id and self_id = :self_id",
      {friend_id: params[:friendships][:friend_id],
      self_id: params[:friendships][:self_id]}])
    @friendship_self = Friendship.where(
      ["friend_id = :friend_id and self_id = :self_id",
      {friend_id: params[:friendships][:self_id],
      self_id: params[:friendships][:friend_id]}])
    @friendship_friend[0].destroy
    @friendship_self[0].destroy
    render json: { friend: @friendship_friend[0], self: @friendship_self[0] }
  end
end
