class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_user_by_credentials(params[:session][:email], params[:session][:password])
    if user
      sign_in(user)
      redirect_to user_settings_url(user)
    else
      flash[:errors] = "Invalid Log in Credentials"
      render "static_pages/homepage"
    end
  end

  def destroy
    # user = current_user
    sign_out
    # render json: user
    redirect_to new_session_url
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end

end
