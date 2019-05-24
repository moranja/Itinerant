class UsersController < ApplicationController
  #skip_before_action :authenticate, only: [:new, :create]

  before_action :define_selected_user

  skip_before_action  :logged_in?, only: [ :authenticate, :create ]

  def create
    user = User.new(user_params)
    user.password = params[:password]
    if user.valid?
      user.save
      render json: user, methods: [ :auth_token ]
    else
      render json: { error: true, message: 'Invalid Username or Password' }
    end
  end

  def index
    render json: User.all
  end

  def show
    user = User.find(params[:id])
    render json: user, methods: [ :itinerary_list ]
  end

  def authenticate
    user = User.find_by(username: params[:username])
    if user
      if user.authenticate(params[:password])
        render json: user, methods: [ :auth_token ]
      else
        render json: { error: true, message: 'Invalid Password' }
      end
    else
      render json: { error: true, message: 'Invalid Username' }
    end
  end

  # def update
  #   selected_user.update(user_params)
  #   render json: selected_user
  # end
  #
  # def destroy
  #   selected_user.destroy
  #   render json: selected_user
  # end
  #
  # def user_params
  #   params.permit(:name, :password)
  # end

  def define_selected_user
    if params[:id]
      @selected_user = User.find(params[:id])
    else
      @selected_user = User.new
    end
  end

  def selected_user
    @selected_user
  end

  private

    def user_params
      params.require(:user).permit(:username, :name, :password, :password_confirmation)
    end
end
