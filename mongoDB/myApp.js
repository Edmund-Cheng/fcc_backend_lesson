require('dotenv').config();
const mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Model
// - prepare Schema 
const Schema = mongoose.Schema;
var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// - create a model 
var Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  var TomC = new Person({name: 'Tom Chan', age: 40, favoriteFoods: ['Apple','banana']});  
  TomC.save(function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });  
};

// Create Many Records with model.create()
var arrayOfPeople = [
  {name: 'John', age: 50, favoriteFoods: ["Pineapple"]},
  {name: 'May', age: 60, favoriteFoods: ['Fish']},
  {name: 'Bob', age: 70, favoriteFoods: ['Chicken','milk']}
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find person by _id
  Person.findById({_id: personId}, function(err, foundPerson) {
    if (err) return console.log(err);
    // Add footToAdd to person's favorite food by Array.push()
    foundPerson.favoriteFoods.push(foodToAdd);
    // Manually mark the field favoriteFoods - a Mixed type is modified to avoid the db cannot find it as modified
    foundPerson.markModified('favoriteFoods');
    // Save() the updated Person    
    foundPerson.save(function (err, data) {
      if (err) return console.log(err);
      done(null, data);
    }); 
  })
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  // findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

// Delete One Document Using model.findByIdAndRemove
// one of the methods findByIdAndRemove() or findOneAndRemove().
const removeById = (personId, done) => {
  /*
  Person.findByIdAndRemove({_id: personId}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
  */
  Person.findOneAndRemove({_id: personId}, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
  
};

//Delete Many Documents with model.remove()
// .remove() delete all documents fulfil the criteria
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  // Store the find query into a variable for late use
  Person.find({ favoriteFoods: foodToSearch })
        // Sort an array
        // Here: 1 for ascending	order and -1 for descending order.
        .sort({ name: 1 })
        // Limit an array's size
        .limit(2)
        // Hide certain property from the result:
        // Here: 0 means false and thus hide name property; 1 means true so age property will show.
        .select({ age: 0 })
        // exec this query with Callback
        .exec(function(err, data) {
          if (err) return console.log(err);
          done(null, data);
        });
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
