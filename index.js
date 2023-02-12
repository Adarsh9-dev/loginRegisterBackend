import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//DB connection
mongoose.set('strictQuery', true);

const DB = "mongodb+srv://LoginRegister:zOIjBPUlLcAOybS1@cluster0.s1ovnif.mongodb.net/LoginRegister?retryWrites=true&w=majority";

mongoose.connect(DB)
.then(()=>console.log("Connected"))
.catch(err=>console.log(err));
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})


const User = new mongoose.model("user",userSchema);
//Router
app.get('/',(req,res)=>{
    res.send("Backend programming");
})
app.post('/login',(req,res)=>{
    res.send("You are in login Root");
})
app.post('/register',(req,res)=>{
    const {name, email, password} = req.body;
    const data = new User({
        name,
        email,
        password
    })
    console.log(data);
    data.save(err => {
        if(err) {
            res.send(err);
            res.send({message: "Some Error detected"});
        } else {
            res.send({message: "Successfully Registered"});
        }
    })
})

app.listen(9000,()=>{
    console.log("Server is started");
})