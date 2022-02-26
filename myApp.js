require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;
const { model } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  age: Number,
  favoriteFoods: [String],
});

const Person = model("Person", personSchema);

console.log(Person);
//let Person;

const createAndSavePerson = (done) => {
  function saveData(done) {
    const person = new Person({
      name: "Marga",
      age: 20,
      favoriteFoods: ["avocado", "cucumber", "miso soup"],
    });
    person.save(function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  }
  saveData(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });

  //saveData(done);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, function (err, data) {
    if (err) return console.log(err);
  }).then(function (doc) {
    doc.favoriteFoods.push(foodToAdd);
    doc.save(function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec(function(err, data){
    if (err)return console.log(err);
    console.log(data);
    done(null, data);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

