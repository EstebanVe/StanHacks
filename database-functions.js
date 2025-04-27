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

// Create a report Schema that determines the information each report needs
const reportSchema = new Schema({
  email: {type: String, required: true},
  dangerLevel: {type: Number, required: true},
  title: {type: String, required: true, unique: true},
  report: {type: String, required: true},
  dateTime: {type: String, required: true}
})

// Create models from the Schemas that will populate the database
const User = mongoose.model('User', userSchema);
const Report = mongoose.model('Report', reportSchema);


// Populate the database with users
createUser("john_doe45", "John Doe", "john.doe@gmail.com", 5551234567, "14bfe7cd-443a-4932-bdf0-9c8331fa05b5");
createUser("susan_smith", "Susan Smith", "susan.smith@example.com", 5559876543, "");
createUser("mike_jones92", "Mike Jones", "mike.jones@outlook.com", 5552233456, "f1d5ac5e-53a4-4b75-a249-d9a22c10a29e");
createUser("emily_clark89", "Emily Clark", "emily.clark@yahoo.com", 5555567890, "");
createUser("robert_taylor", "Robert Taylor", "robert.taylor@gmail.com", 5557788990, "b1bb760a-e825-4d53-95b3-18a4b7d38e22");
createUser("lisa_king21", "Lisa King", "lisa.king@aol.com", 5552345678, "");
createUser("tom_harris", "Tom Harris", "tom.harris@hotmail.com", 5553456789, "4f9b460e-1db8-4ad5-8f5d-e0a90640f745");
createUser("nina_adams", "Nina Adams", "nina.adams@icloud.com", 5556789012, "5e740b2f-470a-497f-b02a-07c8c35c96f2");
createUser("david_lee56", "David Lee", "david.lee@gmail.com", 5555678901, "");
createUser("julia_white", "Julia White", "julia.white@outlook.com", 5558901234, "22db48f9-c0da-4c82-8e55-42625b8b8da4");

// Test find and delete functionalities
findUser("john.doe@gmail.com");
deleteUser("john.doe@gmail.com");

// // User model functionalities
// Function used to create a new User
function createUser(inputUsername, inputName, intputEmail, inputPhoneNumber, inputSpecialID){
  User.create({username: inputUsername, name: inputName, email: intputEmail, phoneNumber: inputPhoneNumber, specialID: inputSpecialID})
  .then( () => {
    console.log("User succefully inserted into the database");
  })
  .catch( () => {
    console.log(`${inputName} already exists in the database`);
  });
}

// Function used to find a User
function findUser(findEmail){
  User.findOne({email: findEmail}).then( () => {
      console.log('Successfully retrieved the user')
  })
  .catch( () => {
      console.log(`Something went wrong. A user whose email is ${findEmail} does not exist`)
  });
}

// Function used to delete a User
function deleteUser(findEmail){
  User.findOneAndDelete({ email: findEmail})
      .then( (retrievedUser) => {
        console.log("User successfully deleted");
        return retrievedUser;
      })
      .catch( () => {
        console.log("Something went wrong. The email inputed likely hasn't been used.");
      });
}





// Testing Report model functionalities
createReport("john.doe@gmail.com", 4, "Security Breach", "Unauthorized access detected in the restricted area. Immediate attention needed.", "2025-04-27T14:45:32.123Z");
createReport("susan.smith@example.com", 0, "Suspicious Activity Report", "A suspicious individual was seen near the south entrance at around 2 PM.", "2025-04-27T14:45:32.123Z");
createReport("mike.jones@outlook.com", 3, "Fire Alarm Triggered", "Fire alarm was triggered on the 3rd floor. No visible signs of smoke or fire.", "2025-04-27T14:45:32.123Z");
createReport("emily.clark@yahoo.com", 0, "Minor Theft Report", "A wallet was reported missing from the staff break room.", "2025-04-27T14:45:32.123Z");
createReport("robert.taylor@gmail.com", 5, "Vandalism in Parking Lot", "A vehicle was damaged and graffiti was found on the wall in the parking lot.", "2025-04-27T14:45:32.123Z");
createReport("lisa.king@aol.com", 0, "Suspicious Package Found", "A suspicious package was found near the main entrance. Authorities have been alerted.", "2025-04-27T14:45:32.123Z");
createReport("tom.harris@hotmail.com", 3, "Power Outage", "A power outage occurred in the building. Backup generators are working fine.", "2025-04-27T14:45:32.123Z");
createReport("nina.adams@icloud.com", 4, "Flood in Basement", "Heavy rain has caused flooding in the basement. The area is being evacuated.", "2025-04-27T14:45:32.123Z");
createReport("david.lee@gmail.com", 0, "Broken Window", "A window in the conference room was found broken. No injuries reported.", "2025-04-27T14:45:32.123Z");
createReport("julia.white@outlook.com", 5, "Active Shooter Alert", "An active shooter has been reported on the premises. Emergency responders are on the scene.", "2025-04-27T14:45:32.123Z");

// Test find and delete functionalities
findReport("Broken Window");
deleteReport("Broken Window");


// // Report model functionalities
// Function used to create a new Report
function createReport(inputEmail, inputDangerLevel, inputTitle, inputReport, inputDateTime){
  Report.create({email: inputEmail, dangerLevel: inputDangerLevel, title: inputTitle, report: inputReport, dateTime: inputDateTime})
  .then( () => {
    console.log("Report succefully inserted into the database");
  })
  .catch( (err) => {
    console.log(err)
    console.log(`A reoprt titled \'${inputTitle}\' already exists in the database`);
  });
}

// Function used to find a User
function findReport(findTitle){
  Report.findOne({title: findTitle})
  .then( () => {
      console.log('Successfully retrieved the title');
  })
  .catch( () => {
      console.log("Something went wrong. This report does not exist");
  });
}

// Function used to delete a User
function deleteReport(findTitle){
  Report.findOneAndDelete({ title: findTitle})
      .then( (retrievedReport) => {
        console.log("Report successfully deleted");
        return retrievedReport;
      })
      .catch( () => {
        console.log("Something went wrong. A report with the inserted title does not exist.");
      });
}
