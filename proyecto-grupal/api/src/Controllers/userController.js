
const { User } = require('../db.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;
const { deliverMail, mailDetails } = require('./nodemailerController');

const getAllUsers = async (_req, res, next) => {
    try{
        const users = await User.findAll({attributes: {exclude: ['password']}});
        if(users.length){
            const finalUsers = users.filter(e => e.email !== "super@gmail.com")
            res.status(200).json(finalUsers);
        }else{
            res.status(400).json({ msg: "Error, no users found"});
        }
    }catch(error){
        next(error)
    }
}

const createNewUser = async (req, res, next) => {
    const { body } = req;
    const salt = await bcrypt.genSalt(10);
    try{
        const myUser = {
            name: body.name,
            surname: body.surname,
            password: body.password ? await bcrypt.hash(body.password, salt) : '',
            email: body.email,
            adress: body.adress,
            origin: body.origin,
            subId: body.subId ? body.subId : null
        };
        const [_user, created] = await User.findOrCreate({
            where: { email: myUser.email}, 
            defaults:{
                ...myUser,
            }
        });
        if(created === true){
            res.status(200).json({ msg : 'User stored correctly' });
        }else{
            res.status(400).json({ msg: "Error, the User already exist"});
        }
    }catch(error){
        next(error);
    }
}

const swapStatus = async (req, res, next) =>{
    try{
        const user0 = await User.findOne({ where : {email : req.body.email }});
        if(user0){
            const updated = await User.update(
                {active: !user0.active},
                {where: {email: req.body.email}}
            );
            if(updated[0]===1){
                userStatus = !user0.active;
                res.status(200).json({msg: `User is active: ${userStatus}`})
            }
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }        
    }catch(error){
        next(error)
    }
}

const swapType = async(req, res, next) =>{
    try{
        const user = await User.findOne({ where : {id : req.params.id }});
        if(user){
            const updated = await User.update(
                {isAdmin: !user.isAdmin},
                {where: {id: req.params.id}}
            );
            if(updated[0]===1){
                userStatus = !user.isAdmin;
                res.status(200).json({msg: `User is admin: ${userStatus}`})
            }
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }  
    }catch(error){
        next(error);
    }
}

const userLogin = async(req, res, next) =>{
    try{
        const user = await User.findOne({ where : {email : req.body.email, active: true }});
        if(user){
			    if(user.origin === 'passwdUser'){
                const validatePassword = await bcrypt.compare(req.body.password,user.password);
                if(validatePassword){
                    let payload = { "id": user.id, "email": user.email, "isAdmin": user.isAdmin, "name": user.name};
                    let token = jwt.sign(payload,JWT_KEY,{expiresIn: "1h"})
                    let info = {...payload, token}
                    res.status(200).json(info);
                }else{
                    res.status(400).json({msg: "Password Incorrect"});
                }
            }else{
                let payload = { "id": user.id, "email": user.email, "isAdmin": user.isAdmin, "name": user.name};
                let token = jwt.sign(payload,JWT_KEY,{expiresIn: "1h"})
                let info = {...payload, token}
                res.status(200).json(info);
            }
        }else{
            res.status(400).json({msg: "User does not exist"});
        }
    }catch(error){
        next(error)
    }
}

const userAuth = async (req, res, next) =>{
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        console.log(authHeader);
        console.log(token);
        if(token == null){
            return res.status(400).send("token required");
        }
        jwt.verify(token, JWT_KEY, (error, user)=>{
            if(error){
                return res.status(401).send("invalid token");
            }
            console.log(user);
            req.user = user;
            next();
        })
    }catch(error){
        next(error);
    }    
}


const resetPw = async (req, res, next)=>{
    try{
        const user = await User.findOne({where: {email:  req.body.email}});
        if(user){
            let subject = "Password reset";
            let text = "";
            let email = user.email;
            const secret = JWT_KEY + user.password;
            const token = jwt.sign({email: email, id: user.id},secret,{expiresIn:"5m"})
            let html = `<p>Click <a href="http://localhost:3000/passConfirm/${email}/${token}">here</a> to reset your password</p><br><p>Please ignore this email if you didnt request a password reset<p>`
            let result = await deliverMail(email, subject, text, html)
            console.log(result)
            if(result){
                res.status(200).send({token: token, mail: email})
            }else{
                res.status(400).send({msg: "Something failed"})
            }
        }else{
            res.status(400).json({msg: "User not found"})
        }
    }catch(error){
        next(error)
    }
}

const getUser = async (req, res, next) =>{
    try{
        console.log('email',req.params.email)
        const user0 = await User.findOne({ where : {email : req.params.email }});
        if(user0){
          res.status(200).json(user0)
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }        
    }catch(error){
        next(error)
    }
}


const confirmReset = async (req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const {password, email} = req.body;
        let newPassword = await bcrypt.hash(password, salt)
        const user = await User.findOne({where: {email:  email}});
        if(user){
            const updated = await User.update(
                {password: newPassword},
                {where: {email: email}}
            )
            if(updated[0]===1){
                res.status(200).json({msg: "Password saved"});
            }
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }       
    }catch(error){
        next(error)
    }
}

const getSocialUser = async (req, res, next) =>{
    try{
        const user0 = await User.findOne({ where : {subId : req.params.sub }});
        if(user0){
          res.status(200).json(user0)
        }else{
            res.status(400).json({msg: "Social user not found in the DB"});
        }        
    }catch(error){
        next(error)
    }
}

const getUserProfile = async (req, res, next) =>{
    try{
        const user0 = await User.findOne({ where : {id : req.params.id }});
        if(user0){
          res.status(200).json(user0)
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }        
    }catch(error){
        next(error)
    }
}

const updateUserProfile = async(req, res, next) =>{
	try{
			const { body } = req;
			const user = await User.findOne({ where : {id : req.params.id }});
			if(user){
					const updated = await User.update(
							{
								name: body.name,
            		surname: body.surname,
            		email: body.email,
            		adress: body.adress,
							},
							{where: {id: req.params.id}}
					);
					if(updated[0]===1){
							userStatus = !user.isAdmin;
							res.status(200).json({msg: `User is admin: ${userStatus}`})
					}
			}else{
					res.status(400).json({msg: "User not found in the DB"});
			}  
	}catch(error){
			next(error);
	}
}

module.exports = {createNewUser, swapStatus, getAllUsers, swapType, userLogin, userAuth, resetPw, 
	confirmReset, getSocialUser, getUser, getUserProfile, updateUserProfile}

