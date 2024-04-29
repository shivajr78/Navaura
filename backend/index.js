const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { type } = require("os");


const port = 4000;

app.use(express.json()); // the request we get from response will automatically parse into json
app.use(cors()); // using this our react.js app connect to express app at port 4000

//Database connection with mongodb
mongoose.connect("mongodb+srv://shivajr78:shiva98136@cluster0.badlxp1.mongodb.net/navaura")

//API Creation

app.get("/", (req, res) => {
    res.send("oky Express is running");
})


//Image storage engine using multer
//making storage as object
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint for images
app.use('/images', express.static('upload/images')); // 'upload/images' can directly access by 'images'
//image upload by the user is stored in upload/images folder
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    available: {
        type: Boolean,
        default: true,
    }

})

app.post("/addproduct", async (req, res) => {

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1); // collect all product in an array
        let last_product = last_product_array[0]; // taking each product from products array
        id = last_product.id + 1; // increment id for new product by incrementing id of last product
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
    })
    console.log(product)
    await product.save();
    console.log("Saved in Mongo Database");
    res.json({
        success: true,
        name: req.body.name,
    })
})


//creating api for deleting products 
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({
        id: req.body.id
    });
    console.log("Removed Successfully");
    res.json({
        success: true,
        name: req.body.name
    })
})

// creating api for getting all products 
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All product are fetched")
    res.send(products);
})


//Schema creating for user model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },

})

//Creating  endpoint for registering the user
app.post("/signup", async (req, res) => {
    //checking whether user already existing Account
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "Email address is already existed!" })
    }
    // creating empty cart 
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    //creating user 
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    // jwt authentication
    // creating data object to generate token
    const data = {
        user: {
            id: user.id
        }
    }
    //generating token              // Salt
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })
})


//Creating endpoint for user login
app.post("/login", async (req, res) => {
    //finding email in database
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        //compare password of email is same that is stored in database
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            // jwt authentication
            // creating data object to generate token
            const data = {
                user: {
                    id: user.id
                }
            }
            //generating token
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        } else {
            res.json({ success: false, error: "Password is incorrect!" })
        }
    } else {
        res.json({ success: false, error: "Email Address is incorrect!" })
    }
})

//creating middleware to fetch user

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token!" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using valid token!" })
        }
    }
}


////Creating endpoint for adding items in cart data 
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added",req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id },{cartData:userData.cartData});
    res.send("Added")
})
////Creating endpoint for removing items in cart data 
app.post("/removefromcart", fetchUser, async (req,res)=>{
    console.log("Removed",req.body.itemId)
    let userData = await Users.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id },{cartData:userData.cartData});
    res.send("Removed");
})

//creating endpoint to get cart data 

app.post("/getcart", fetchUser, async (req,res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Oky Server Running at port " + port);
    } else {
        console.log("Error : " + error);
    }
})
