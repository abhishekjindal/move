var fs = require('fs');

function move(oldpath, newpath, callback){
		
	fs.rename(oldpath, newpath, (err) => {
		callback(err);
	});
}

module.exports = { 
	move
	};


