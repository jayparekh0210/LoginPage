const express = require("express");
const bodyParser = require("body-parser");

const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    var fn = req.body.fn;
    var ln = req.body.ln;
    var id = req.body.email
    
    var data = {members:[{
        email_address:id,
        status:"subscribed",
        merge_fields:{
            FNAME:fn,
            LNAME:ln
        }
    }]};
    var flat_data = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/cf01bf0453";
    const options = {
        method:"POST",
        auth:"jay:bc353bcaebc6455f0ed6b1bb8cd5f9c2-us21"
    }
    const request = https.request(url,options,(resp)=>{
        if(resp.statusCode === 200){
            res.sendFile(__dirname+"/Sucess.html")
        } else{
            res.sendFile(__dirname+"/Failure.html")
        }
        

    })
    request.write(flat_data);
    request.end();
})


app.post("/failure",(req,res)=>{
    res.redirect("/");
})


app.listen(3000,()=>{
    console.log("Server Started at 3000");
})