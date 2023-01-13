const { Category, Product, User } = require('../../db');
const axios = require('axios');
const {apiArray} = require('./productfix');
const {userArray} =require('./userfix');
const bcrypt = require("bcrypt");
const { ADMIN_PASS } = process.env;


const storeAllProducts = async () =>{
    try{
        for (let i = 0; i < apiArray.length; i++) {
            let nuevo = await Product.create(apiArray[i]);
            let nuevaCat = await Category.findOne({where:{name: apiArray[i].categories}});
            await nuevo.addCategory(nuevaCat);
        }
        console.log('Products correctly stored into the DB');
    }catch(error){
        console.log(error)
    }
}

const storeAllCategories = async () =>{
    try{
        const apiUrl = await axios.get('https://dummyjson.com/products/categories');
        const apiInfo = await apiUrl.data.map((e, index) => {
            return {
                id: index,
                name: e,
            }
        });
        await Category.bulkCreate(apiInfo);
        console.log('Categories correctly stored into the DB');
    }catch(error){
        console.log(error)
    }
}
const createNewAdminUser = async () => {
    const salt = await bcrypt.genSalt(10);
    try{
        const myUser = {
            name: "super",
            surname: "admin",
            password: await bcrypt.hash(ADMIN_PASS, salt),
            email: "super@gmail.com",
            adress: "noimporta 123",
            isAdmin: true,
            origin: "passwdUser"
        };
        const [_user, created] = await User.findOrCreate({
            where: { email: myUser.email}, 
            defaults:{
                ...myUser,
            }
        });
        console.log("Admin User created")
    }catch(error){
        console.log(error);
    }
}
const storeAllUsers = async ()=>{
    try{
        await User.bulkCreate(userArray)
        console.log('Users correctly stored into the DB');
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    storeAllCategories,
    storeAllProducts,
    storeAllUsers,
    createNewAdminUser
}