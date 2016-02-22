class Api::FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.new(friendship_params)

    # @friend_request = FriendRequest.where(
    #   ["requestee_id = :self_id and requestor_id = :friend_id",
    #   { friend_id: params[:friendship][:friend_id],
    #     self_id: params[:friendship][:self_id] }])
    # @friend_request[0].destroy if @friend_request

    if @friendship.save
      @user = User.find(@friendship.friend_id)
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
      { friend_id: params[:friendship][:friend_id],
        self_id:   params[:friendship][:self_id] }])
    @friendship_self = Friendship.where(
      ["friend_id = :friend_id and self_id = :self_id",
      { friend_id: params[:friendship][:self_id],
        self_id:   params[:friendship][:friend_id] }])
    @friendship_friend[0].destroy
    @friendship_self[0].destroy
    @user = User.find(params[:friendship][:self_id])
    render "/api/users/show", user: @user
    # render json: { friend: @friendship_friend[0], self: @friendship_self[0] }
  end

  private

  def friendship_params
    params.require(:friendship).permit(:friend_id, :self_id)
  end

end
