class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to "#/users/#{@user.id}"
    else
      flash[:errors] = @user.errors.full_messages
      render "sessions/new"
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
      :password,
      :birthday_month,
      :birthday_date,
      :birthday_year,
      :gender
    )
  end

end
