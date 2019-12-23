const Sequelize = require("sequelize");
const sequelize = require("../helpers/sequelize");
const {JWT_HASH} = require("../config");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
class Users extends Sequelize.Model {
	static passHash(pass) {
		return md5(md5(pass + JWT_HASH));
	}

	static userToken(email){
		return  jwt.sign({ foo: email }, JWT_HASH);
	}

}

Users.init({
	id: {
		type: Sequelize.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},

	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: 'Invalid Name'
			}
		}

	},
	f_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isAlpha: {
				msg: "Invalid First Name"
			}
		}
	},
	year: {
		type: Sequelize.STRING,
		allowNull: false,


		validate: {
			isNumeric: {
				msg: 'enter number'
			},
			max: 100,
			min: 18,
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Invalid Email'
			}
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: 8
			}
		}
	}
}, {
	sequelize,
	modelName: 'users',
	timestamps: false
});

Users.sync();

module.exports = Users;
