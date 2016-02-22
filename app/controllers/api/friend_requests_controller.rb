class Api::FriendRequestsController < ApplicationController
  # rescue ActiveRecord::RecordNotUnique

  def create
    @friend_request = FriendRequest.new(friend_request_params)
    if @friend_request.save
      @user = User.find(params[:friend_request][:requestee_id])
      render "api/users/show", user: @user
    else
      @friend_request.errors.full_messages
    end
  end

  def show
  end

  def update
    @friend_request = FriendRequest.find(params[:id])
    if @friend_request.update(friend_request_params)
      @user = User.find(params[:friend_request][:requestee_id])
      debugger
      render "api/users/show", user: @user
    else
      @friend_request.errors.full_messages
    end
  end

  def destroy
    @friend_request = FriendRequest.find(params[:id])
    @friend_request.destroy
    @user = User.find(@friend_request.requestee_id)
    render "api/users/show", user: @user
  end

  private

  def friend_request_params
    params.require(:friend_request).permit(
      :requestee_id,
      :requestor_id,
      :declined
    )
  end
end
