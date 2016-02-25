class Api::PhotosController < ApplicationController

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      @user = User.find_by(params[:photoable_id])
      render "api/users/show", user: @user
    else
      @photo.errors.full_messages
    end
  end

  def index
    @photos = Photos.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

  private

  def photo_params
    params.require(:photo).permit(:id, :photoable_id, :photoable_type)
  end

end
