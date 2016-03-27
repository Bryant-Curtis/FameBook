class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_user_by_credentials(params[:session][:email], params[:session][:password])
    if user
      sign_in(user)
      redirect_to "#/users/#{user.id}"
    else
      flash[:errors] = "Invalid Log in Credentials"
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end

end
