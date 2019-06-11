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

  attr_reader :current_user

  before_action :logged_in?

  def logged_in?
    begin
      token = request.headers['Authorization'].split(' ')[1]
      payload = JWT.decode(token, 'super-secret-password')[0]

      @current_user = User.find(payload['id'])

      if @current_user
        return true
      else
        render json: {
          error: true,
          message: 'User does not exist'
        }
      end
    rescue
      # They are not
      render json: {
        error: true,
        message: 'Invalid Authentication'
      }
    end
  end

  def react_app
      render :file => 'public/index.html'
  end
end
