class FriendRequestsController < ApplicationController
  rescue ActiveRecord::RecordNotUnique

  def create
    @friend_request = FriendRequest.new(friend_request_params)
    @user = User.find(params[:friend_request][:requestee_id])
    if @friend_request.save
      render "api/users/show", user: @user
    else
      @friend_request.errors.full_messages
    end
  end

  def show

  end

  def destroy

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
