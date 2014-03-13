window.NewReader.Routers.NewsRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "index",
    "feeds/:id": "showFeed",
    "feeds/:feed_id/entries/:id": "showEntry"
  },

  index: function(){
    var indexView = new NewReader.Views.FeedIndexView({
      collection: NewReader.Data.feeds
    });

    NewReader.Data.feeds.fetch();
    this._swapView(indexView);
  },

  showFeed: function(id){
    var feed = NewReader.Data.feeds.getOrFetch(id);
    var showView = new NewReader.Views.FeedShowView({
      model: feed
    });
    this._swapView(showView);
  },

  showEntry: function(feed_id, id){
    var feed = NewReader.Data.feeds.getOrFetch(feed_id);
    var entry = feed.entries().get(id);
    var entryView = new NewReader.Views.EntryShowView({
      feed: feed,
      entryId: id
    })

    this._swapView(entryView);
  },

  _swapView: function(view){
    this.currentView && this.currentView.remove();

    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})