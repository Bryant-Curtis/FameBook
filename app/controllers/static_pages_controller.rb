class StaticPagesController < ApplicationController

  def homepage
    @user = User.new
  end

end
