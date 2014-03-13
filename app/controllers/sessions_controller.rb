class SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create, :new]

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login!
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username or Password"]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  def new
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
