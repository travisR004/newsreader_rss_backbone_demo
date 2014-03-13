window.NewReader.Views.FeedIndexView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection,
                  "add sync change destroy remove",
                  _.debounce(this.render, 100))
  },

  template: JST["feeds/index"],

  events: {
    "click button#new-feed": "newFeedForm",
    "submit form#new-feed-form": "addFeed"
  },

  render: function(){
    var content = this.template({feeds: this.collection});
    this.$el.html(content);
    return this;
  },

  newFeedForm: function(event){
    event.preventDefault()
    $("#post-form").toggleClass("hidden-input")
  },

  addFeed: function(event){
    event.preventDefault();
    $("#post-form").toggleClass("hidden-input")
    var feed = $(event.currentTarget).serializeJSON()["feed"];
    var newFeed = new NewReader.Models.Feed(feed)
    newFeed.save({},{
      success: function(){
        NewReader.Data.feeds.add(newFeed)
        Backbone.history.navigate("", {trigger: true})
      }
    })
  }
})