class UsersController < ApplicationController
  before_action :require_logged_out

  def create
    @user = User.create(user_params)
    if @user.save
      redirect_to "/"
    else
      flash.now[:errors] = @user.errors.full_messages
      render "new"
    end
  end

  def new
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
