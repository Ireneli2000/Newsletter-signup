const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const request = require("request");

client.setConfig({apiKey:"0038a2da4af8e6934e1aeff884a41027", server:"us18"});
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.post("/",function(req,res){
  const subscribingUser = {firstName: req.body.fName, lastName: req.body.lName, email: req.body.email};
  const run = async () => {
    try{
      const response = await client.lists.addListMember("59bdb7f162", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
  // var firstName = req.body.fName;
  // var lastName = req.body.lName;
  // var email = req.body.email;
  // console.log(firstName,lastName, email);
});

app.post("/failure", function(req,res){
  res.redirect("/");
});



app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});


//0038a2da4af8e6934e1aeff884a41027-us18
//audience id:59bdb7f162
