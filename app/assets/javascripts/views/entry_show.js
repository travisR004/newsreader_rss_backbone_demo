window.NewReader.Views.EntryShowView = Backbone.View.extend({
  initialize: function(options) {
    this.feed = options.feed;
    this.entryId = options.entryId;
    this.listenTo(this.feed,
                  "add sync change destroy remove",
                  this.render)
  },

  template: JST["entries/show"],

  render: function(){
    this.model = this.feed.entries().get(this.entryId);
    var content = this.template({feed: this.feed, entry: this.model });
    this.$el.html(content);
    return this;
  }
})