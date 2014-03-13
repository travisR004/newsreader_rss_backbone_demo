window.NewReader.Views.FeedShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model,
                  "add sync change destroy remove",
                  _.debounce(this.render, 100))
  },
  template: JST["feeds/show"],

  events: {
    "click button#refresh": "refresh"
  },

  refresh: function(){
    this.model.fetch();
  },

  render: function(){
    var content = this.template({feed: this.model});
    this.$el.html(content);
    return this;
  }
})