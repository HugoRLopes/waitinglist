Meteor.publish('waiters', function(){
   return Waiters.find({}, {fields: {'name': 1, 'shares': 1}});
});