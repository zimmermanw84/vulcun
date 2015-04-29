var models = require('./models');
var chance = require('chance').Chance();

var model = models.user,
    models = [],
    count = 500000;

function generateUser(){
    var user = {
        username: chance.first(),
        password: chance.last(),
        profile: JSON.stringify({
            email: chance.email(),
            phone: chance.phone(),
            country: chance.country()
        }),
    };
    return user;
}

for(var i = 0; i < count; i++){
    models.push(generateUser());
    console.log(i);
}

// create the rows using our generated models.
model.bulkCreate(models);

