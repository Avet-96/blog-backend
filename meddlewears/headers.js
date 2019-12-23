function headers(req, res, next) {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		//res.setHeader('Access-Control-Allow-Credentials', true);
		next()
	} catch (e) {
		next(e)
	}
}
module.exports =headers;
