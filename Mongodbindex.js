const mongoose = require('mongoose');
console.clear();
var dbUrl = "mongodb+srv://dbAdmin:clZhsUjfGvPOhc03@cluster1.04wek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/tutend";
//tutend/
/*
var admin_user = "db_admin";
var password = "jUzLjpzvXkPQOPnH";
var cluster = "cluster0";
var databaseName = "tutend";
*/
var admin_user = "db_admin";
var password = "jUzLjpzvXkPQOPnH";
var clusters = "cluster0";
var databaseName = "tutends";

var dburl = `mongodb+srv://${admin_user}:${password}@${clusters}.bfmjq.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

//Need to more secure in heroku variable key
//var dburl = `mongodb+srv://${admin_user}:${password}@${cluster}.bfmjq.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

//Connection mongodb atlas to node js
mongoose.connect(dburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
).then(()=>{
    console.log("Connection Done!");
}).catch((err)=>{
    console.log("Connection Failed!");
    console.log("Error :- " + err);
});


//schema for collection
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    level:{
        type:Number,
        default:0
    },
    active:Boolean,
    expire:{
        type:Number
    }
});

//Create a Collection
const user = new mongoose.model("User",userSchema);

//CRUD
//Create - C
//Added a single record
const userList = new user({
    name:"saurav",
    email:"Saurav2@pnc.com",
    level:1,
    active:true
})
/*
userList.save().then(()=>{
    console.log("Added in collections")
}).catch((err)=>{
    console.log("Failed to add in collection");
    console.log(err);
});
*/
//Added a multiple record
const userLists = ()=>{
    const userList1 = new user({
        name:"rajiv",
        email:"rajiv@pnc.com",
        level:3,
        active:true
    });
    const userList2 = new user({
        name:"satarupa",
        email:"satarupa@pnc.com",
        level:2,
        active:true
    });
    const userList3 = new user({
        name:"saurav",
        email:"saurav@pnc.com",
        level:2,
        active:false
    });
    const userList4 = new user({
        name:"vishal",
        email:"vishal@pnc.com",
        level:1,
        active:false
    });
    var userArray = [userList1,userList2,userList3,userList4];
    user.insertMany(userArray)
    .then(()=>{
        console.log("Added in collections")
    })
    .catch((err)=>{
        console.log("Failed to add in collection");
        console.log(err);
    });
}


//userLists();

//https://cloud.mongodb.com/v2/6237421b4f246977a5d6659a#metrics/replicaSet/62382cb3ce5c5841333022ef/explorer/tutend/users/find
//https://www.youtube.com/watch?v=361D7y0lSoM&list=PLwGdqUZWnOp1P9xSsJg7g3AY0CUjs-WOa&index=13


const getDocumentBylevel = async (levels)=>{
    try{
    const result = await user.find({
        level:{$gte:levels}
    });
    console.log(result);
    }
    catch(err)
    {
        console.log("Error Found! - getDocumentBylevel");
        console.log(err);
    }
}

//getDocumentBylevel(2);
//sort -> .sort({name:1}) sort with name one
const getDocumentBy_Level_n_Active = async ()=>{
    const result = await user.find({
       level:{$gte:2}
    })
    .sort({name:1});

    console.log(result);
}

//getDocumentBy_Level_n_Active();

const updateLevel3TO2 = async(_id)=>{
    try{
    const result_level = await user.updateOne(
        {_id}, //id reference which is unique
        {
            $set:{          //set - change column value
                expire:4     // column - level 
            }
        }
        );
        console.log("Result");
        console.log(result_level);
        }
        catch(err){
            console.log("Error found! - getDocumentBy_Level_n_Active");
            console.log(err);
        }

    }
updateLevel3TO2("6238952c673337f16ac87b16");
getDocumentBy_Level_n_Active();


