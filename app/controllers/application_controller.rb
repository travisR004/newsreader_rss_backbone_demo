class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :current_user, :loggedin?

  def current_user
    if session[:session_token]
      @current_user = User.find_by(session_token: session[:session_token])
    end
  end

  def login!
    session[:session_token] = @user.reset_session_token!
  end

  def loggedin?
    !!current_user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_logged_out
    redirect_to root_url if loggedin?
  end

  def require_logged_in
    redirect_to new_session_url unless loggedin?
  end
end
