window.NewReader.Collections.Entries = Backbone.Collection.extend({
  url: function() {
    return this.feed.url() + "/entries";
  },

  model: NewReader.Models.Entry,

  getOrFetch: function (id) {
     var model;
     var entries = this;

     if (model = this.get(id)) {
       model.fetch();
       return model;
     } else {
       model = new NewReader.Models.Entry({ id: id });
       model.fetch({
         success: function () { feeds.add(model) }
       });
       return model;
     }
   }
})