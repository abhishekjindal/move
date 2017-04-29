var fs = require('fs');
var updater = require('jsonfile-updater');

function txt(file, data, callback){
	var str = '\n';

	for(x in data){
		str += x +':'+ data[x]+'\n';
	}

	fs.appendFile(file, str, (err) => {
		callback(err);
	});

}

function json(file, data, callback){
	updater(file).add('edited', data, (err) => {
		callback(err);
	});
}



module.exports = { 
	txt,
	json
};