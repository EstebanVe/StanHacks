import mongoose from "mongoose";

// Connect to the mongodb database, if it fails, throw an error
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Import Schema from mongoose package
const { Schema } = mongoose;

// Create a user Schema that determines the information that each user needs
const userSchema = new Schema({
username: { type: String, required: true },
name: { type: String, required: true},
email: { type: String, unique: true },
phoneNumber: { type: Number, required: true, unique: true },
specialID: { type: String, unique: true}
});

// const reportShema = new Schema({
//   user: {type: User, required: true},
//   dangerLevel: {type: Number, required: true},
//   title: {type: String, required: true},
//   comment: {type: String, required: true},
//   dateTime: {type: String, required: true}
// })

// Create a model from the userSchema that will populate the database
const User = mongoose.model('User', userSchema);

// Create
// const newUser = new User({ username: 'janedoe', name: 'Jane Doe', email: 'jane.doe@example.com', phoneNumber: 2092816866});
// newUser.save();

// Read
// User.find({}); // Gets all users
// User.findById('someUserId'); // Gets a user by ID

// Update
// User.findByIdAndUpdate('someUserId', { age: 31 });

// Delete
// User.findByIdAndDelete('someUserId');

insertUser("john_doe45", "John Doe", "john.doe@gmail.com", 5551234567, "14bfe7cd-443a-4932-bdf0-9c8331fa05b5");
insertUser("susan_smith", "Susan Smith", "susan.smith@example.com", 5559876543, "");
insertUser("mike_jones92", "Mike Jones", "mike.jones@outlook.com", 5552233456, "f1d5ac5e-53a4-4b75-a249-d9a22c10a29e");
insertUser("emily_clark89", "Emily Clark", "emily.clark@yahoo.com", 5555567890, "");
insertUser("robert_taylor", "Robert Taylor", "robert.taylor@gmail.com", 5557788990, "b1bb760a-e825-4d53-95b3-18a4b7d38e22");
insertUser("lisa_king21", "Lisa King", "lisa.king@aol.com", 5552345678, "4f9b460e-1db8-4ad5-8f5d-e0a90640f745");
insertUser("tom_harris", "Tom Harris", "tom.harris@hotmail.com", 5553456789, "");
insertUser("nina_adams", "Nina Adams", "nina.adams@icloud.com", 5556789012, "5e740b2f-470a-497f-b02a-07c8c35c96f2");
insertUser("david_lee56", "David Lee", "david.lee@gmail.com", 5555678901, "");
insertUser("julia_white", "Julia White", "julia.white@outlook.com", 5558901234, "22db48f9-c0da-4c82-8e55-42625b8b8da4");

// deleteUser("john.doe@gmail.com");

function insertUser(inputUsername, inputName, intputEmail, inputPhoneNumber, inputSpecialID){
  const newUser = User({username: inputUsername, name: inputName, email: intputEmail, phoneNumber: inputPhoneNumber, specialID: inputSpecialID});

  newUser.save().then( () => {
    console.log("user succefully inputed");
  }).catch( () => {
    console.log(`${newUser.name} already exists in the database`);
  });
}

// function deleteUser(findEmail){
//   User.findOneAndDelete({ email: findEmail})
//       .then( () => {
//         console.log("User successfully deleted");
//       })
//       .catch( () => {
//         console.log("Something went wrong. The email inputed likely hasn't been used.");
//       });
// }