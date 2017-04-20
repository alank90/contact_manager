/*Wrapping script in IIFE Anonymous function to make sure no conflicts with other JS libraries. jQuery will be exposed via $ within the function.*/
(function ($) {

    var contacts = [
        { name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
        { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
        { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
        { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
    ];

} (jQuery));

/* ============ Backbone.js Below This Line ===============*/
//  Model Declaration
var Contact = Backbone.Model.extend  ({
    defaults: {
        photo: "/img/placeholder.png"
    }
});

//  Collection Declaration
var Directory = Backbone.Collection.extend({
    model: Contact
});

/* ===== Views Declaration. Both Individual Model and Collection Views. ======= */
//   View for each indivual Model.
var ContactView = Backbone.View.extend ({
    tagName: "article",
    className: "contact-container",
    template: $("#contactTemplate").html(),

    render: function() {
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJson()));
        return this;
    }
});

// Note This is a comment.
//View for Collection
var DirectoryView = Backbone.View.extend ({
    el: $("#contacts"),

    initialize: function () {
        this.collection = new Directory(contacts);
        this.render();
    },

    render: function () {
        var that = this;
        console.log("This is that: " + that);
        _.each(this.collection.models, function (item) {
            that.renderContact(item);
        }, this);
    },

    renderContact: function (item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.append(contactView.render().el);
    }
});

