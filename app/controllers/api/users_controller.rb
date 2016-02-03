class Api::UsersController < ApplicationController

  def index
    @users = User.all.includes(:posts)
  end

  def show
    @user = User.find(params[:id]).includes(:posts)
  end

end
