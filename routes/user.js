const express = require('express');
const Users = require("../models/Users");
const router = express.Router();


router.post('/user-sing-up', async (req, res, next) => {
	try {
		const {name, f_name, year, password, r_password, email} = req.body;
		let mail;
		let user;
		mail = await Users.findOne({where: {email}});
		if (r_password !== password) {
			res.json({status: 'error'})
		} else if (mail) {
			res.json({
				status: 'Error',
				message: error.message +
					'This email already exists,please write another email'
			});
			return
		}
		user = await Users.create({
			name, f_name, email, year, password: Users.passHash(password)
		});
		res.json({
			status: 'Ok',
			user
		})
	} catch (e) {
		next(e)
	}
});

router.post('/user-sing-in', async (req, res, next) => {
	try {
		const {email, password} = req.body;
		let userLogin = await Users.findOne({
			where: {email, password: Users.passHash(password)}
		});
		if (!userLogin) {
			res.json({
				status: 'Error',
				message: 'invalid Email, or Password'
			})
		}
		let token = Users.userToken(email);
		res.json({
			status: 'Ok',
			token,
			userLogin
		})
	} catch (e) {
		next(e)
	}
});

module.exports = router;
