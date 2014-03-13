class FeedsController < ApplicationController
  before_action :require_logged_in

  def index
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => Feed.all.to_json(:include => :entries) }
    end
  end

  def show
    @feed = Feed.find(params[:id])
    @feed.reload
    render :json => @feed.to_json(:include => :entries)
  end

  def create
    feed = Feed.find_or_create_by_url(feed_params[:url])
    if feed
      feed.reload
      render :json => feed
    else
      render :json => { error: "invalid url" }, status: :unprocessable_entity
    end
  end

  private
  def feed_params
    params.require(:feed).permit(:title, :url)
  end
end
