class Api::PhotosController < ApplicationController

  def index
    @photos = Photos.all
  end

  def show
    @photo = Photo.find(params[:id])
  end

end
