require 'debugger'
class EntriesController < ApplicationController
  def index
    feed = Feed.find(params[:feed_id])
    if feed.updated_at > 2.minutes.ago
      feed.reload
    end
      render :json => feed.entries
  end

  def show
    @entry = Entry.find(params[:id])
    feed = @entry.feed
    render :json => feed.to_json(:include => :entries)
  end

  private
  def entry_params
    params.require(:entry).permit(:guid, :link, :published_at, :title, :json, :feed_id)
  end
end
