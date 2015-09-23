Template.waiters.helpers({
    alreadyWaiter: function() {

    },
    waiters: function() {
        return Waiters.find({});
    }
});

Template.forms.events({
    "click #add": function(event) {
        event.preventDefault();
        var name = $('#name').val(),
            email = $('#email').val();

        newWaiter = Waiters.insert({
            name: name,
            email: email,
            shares: 0,
            createdAt: Date.now()
        }, function(error, result) {
            if (result) {
                Session.setPersistent("waitersID", result);
                console.log(result);
            }
        });
    }
});

Template.waiters.events({
    "click #delete": function(event) {
        event.preventDefault();
        newWaiter = Waiters.remove({
            _id: this._id
        }, function(error, result) {
            if (result) {
                // var test = Session.setPersistent("waitersID", result);
                console.log(result);
            } else {
                console.log(error);
            }
        });
    }
})
