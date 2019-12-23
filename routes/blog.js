const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Blog = require('../models/Blog');



router.post('/add-comet', async (req, res, next) => {
	try {
		const {description, token, email} = req.body;
		let isToken = Users.findOne({where: {token: Users.userToken(email) === token}});
		if (!isToken) {
			res.json({
				status: 'Error',
				message: 'you can not leave a comment'
			});
			return
		}
		let comment = Blog.create({description});
		let user = Users.findOne({where:{email}});
		res.json({
			status: 'Ok',
			comment,
			user
		})
	} catch (e) {
		next(e)
	}
});

module.exports = router;
