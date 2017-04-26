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



/* ============ Backbone.js Below This Line =============== */
//  Model Declaration
var Contact = Backbone.Model.extend({
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

        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});

// Note This is a comment.
//View for Collection
var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {
            this.collection = new Directory(contacts);

            this.render();
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("type"));  /*Pluck an attribute from each model
            in the collection. _.uniq produces a duplicate-free version of the plucked array*/
        },

        createSelect: function () {
            /* Here we use a jQuery instance function to create a <select> element and as the
            second parameter use an object to pass attributes for that element. Note: element
            must not have any attributes assigned to it initially. */
            var select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

              _.each(this.getTypes(), function (item) {
                  var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });

            return select;
        },

        /*Add UI Events. The events attribute accepts an object of key:value pairs where each key specifies the type of event and a selector to bind the event handler to.*/
        events: {
            "change #filter select": "setFilter"
        },

        //Set filter property and fire change event
        setFilter: function (e)  {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //filter the view
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type") === filterType;
                    });

                this.collection.reset(filtered);

                contactsRouter.navigate("filter/" + filterType);
            }
        }

});

//Instantiate the DirectoryView
var directory = new DirectoryView();

} (jQuery));
