Meteor.subscribe('waiters');

Template.home.helpers({
    alreadyWaiter: function() {
        if(Session.get("waiterID")){
            var curUser = Waiters.findOne({_id: Session.get("waiterID")});
            if(curUser){
                return {_id: curUser._id, name: curUser.name, shares: curUser.shares, position: getPosition(curUser)};
            } else {
                return null;
            }
        };
    }
});

Template.waiters.helpers({
    waiters: function() {
        var waitersList = Waiters.find({}, {sort: {shares: -1, createdAt: 1}, limit: 10});

        return waitersList;
    }
});

Template.forms.events({
    "click #add": function(event) {
        event.preventDefault();
        var name = $('#name').val(),
            email = $('#email').val();

        Meteor.call('insertWaiter', {name: name, email: email}, function(error, result){
            if(result){
                Session.setPersistent("waiterID", result);
                console.log(result);
            }
        });
    }
});

Template.waiters.events({
    "click #delete": function(event) {
        event.preventDefault();
        Meteor.call('removeWaiter', this, function(error, result){
            if(result){
                console.log(result);
            }
        })
    }
})
