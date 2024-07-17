import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://navaurapro:navaurapro478@cluster0.gtqojgo.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}