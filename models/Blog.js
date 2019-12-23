const Sequelize = require("sequelize");
const sequelize = require("../helpers/sequelize");

class Blog extends Sequelize.Model{

}

Blog.init({
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
	description:{
		type:Sequelize.STRING,
		allowNull:true
	}
},{
	sequelize,
	modelName: 'Blog',
	timestamps: false
});

Blog.sync();

module.exports = Blog;
