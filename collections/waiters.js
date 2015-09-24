Waiters = new Mongo.Collection("waiters");

Meteor.methods({
    insertWaiter: function(waiter) {
        newWaiter = Waiters.insert({
            name: waiter.name,
            email: waiter.email,
            shares: 0,
            createdAt: Date.now()
        });

        return newWaiter;
    },
    removeWaiter: function(waiter){
        removedWaiter = Waiters.remove({
            _id: waiter._id
        })

        return removedWaiter;
    },
    newWaiterShare: function(waiter) {
        waiter = Waiters.update({_id: waiter._id}, {$inc: {shares: 1}});
        return waiter;
    }
})

getPosition = function(waiter){
    var countGreatestScores = Waiters.find({"shares": {"$gt": waiter.shares}}).count();
    var countEqualScores = Waiters.find({"shares": waiter.shares}).count();

    position = countGreatestScores + 1;

    if(countEqualScores > 1){
        countGreatestDates = Waiters.find({"shares": waiter.shares, "createdAt": {"$lt": waiter.createdAt}}).count();
        position = position + countGreatestDates;
        console.log(waiter);
    };

    return position;
}