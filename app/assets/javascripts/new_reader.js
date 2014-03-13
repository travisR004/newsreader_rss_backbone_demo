window.NewReader = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  initialize: function() {
    window.NewReader.Data.feeds = new NewReader.Collections.Feeds();

    new NewReader.Routers.NewsRouter({
      $rootEl: $('#content')
    })

    Backbone.history.start();
  }
};

$(document).ready(function(){
  NewReader.initialize();
});
