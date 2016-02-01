class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render "static_pages/homepage"
    end
  end

  def settings
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password
    )
  end

end
