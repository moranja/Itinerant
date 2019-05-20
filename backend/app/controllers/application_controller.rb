class ApplicationController < ActionController::Base
  # before_action :authenticate
  # before_action :set_user
  skip_before_action :verify_authenticity_token #???
  # def authenticate
  #   if(session[:current_user_id]==nil || User.find_by(id: session[:current_user_id])==nil)
  #     redirect_to '/sessions/new'
  #   end
  # end
  #
  # def set_user
  #   @user = User.find_by(id: session[:current_user_id])
  # end
end
