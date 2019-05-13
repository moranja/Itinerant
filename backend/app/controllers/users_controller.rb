class UsersController < ApplicationController
  #skip_before_action :authenticate, only: [:new, :create]


  #Create
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
        @user.save
        redirect_to user_path(@user)
    else
      render :new
    end
  end

  #Read
  def index
    @users = User.all
  end

  def show
  end

  #Update
  def edit
  end

  def update
  end

  #Destroy
  def destroy
  end

  private

    def user_params
      params.require(:user).permit(:username, :name, :password, :password_confirmation)
    end
end
