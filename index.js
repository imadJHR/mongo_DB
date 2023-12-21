const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/contact?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
 const collection = client.db("contact").collection("contactlist");

 // Create documents
 const document1 = { LastName: "Ben Lahmer", FirstName: "Fares", Email: "fares@gmail.com", Age: 26 };
 const document2 = { LastName: "Kefi", FirstName: "Seif", Email: "kefi@gmail.com", Age: 15 };
 const document3 = { LastName: "Fatnassi", FirstName: "Sarra", Email: "sarra.f@gmail.com", Age: 40 };
 const document4 = { LastName: "Ben Yahia", FirstName: "Rym", Age: 4 };
 const document5 = { LastName: "Cherif", FirstName: "Sami", Age: 3 };

 // Insert documents into the "contactlist" collection
 collection.insertMany([document1, document2, document3, document4, document5], function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
 });

 // Display all contacts
 collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log("All contacts: ");
    console.log(result);
 });

 // Display a single contact's information
 collection.findOne({ LastName: "Kefi", FirstName: "Seif" }, function (err, result) {
    if (err) throw err;
    console.log("Contact Information: ");
    console.log(result);
 });

 // Display all contacts with an age > 18
 collection.find({ Age: { $gt: 18 } }).toArray(function (err, result) {
    if (err) throw err;
    console.log("Contacts with an age > 18: ");
    console.log(result);
 });

 // Display all contacts with an age > 18 and a name containing "ah"
 collection.find({ $and: [{ Age: { $gt: 18 } }, { $or: [{ LastName: /ah/ }, { FirstName: /ah/ }] }] }).toArray(function (err, result) {
    if (err) throw err;
    console.log("Contacts with an age > 18 and a name containing 'ah': ");
    console.log(result);
 });

 // Change the contact's first name from "Kefi Seif" to "Kefi Anis"
 collection.updateOne({ LastName: "Kefi", FirstName: "Seif" }, { $set: { FirstName: "Kefi Anis" } }, function (err, res) {
    if (err) throw err;
    console.log("Document updated");
 });

 // Delete contacts aged under 5
 collection.deleteMany({ Age: { $lt: 5 } }, function (err, res) {
    if (err) throw err;
    console.log("Documents deleted");
 });

 // Display all contacts after deletion
 collection.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log("All contacts after deletion: ");
    console.log(result);
 });

 // Close connection
 client.close();
});