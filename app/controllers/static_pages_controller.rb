class StaticPagesController < ApplicationController

  def root
  end

  def homepage
    @user = User.new
  end

end
