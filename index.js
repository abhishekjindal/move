var rename = require("./lib/rename.js");
var append = require("./lib/append.js");
var timestamp = require("./lib/timestamp.js");
var async = require("async");
const fs = require('fs');

function moveAndAppendFiles(src, des){
	failures =[];
	successes = [];
	fs.readdir(src, (err, files) => {
		// read files from source one a time
		async.each(files, 
			function(file, callback_each){
				var filename = file.split('.');
				if (filename.length <= 1) {
					callback_each()
				}

				var extension = filename[filename.length-1];
				var ts = timestamp.getTimeStamp();

				// old and new paths for data to be appended
				var oldpath = src+'/'+file;
				var newFile = filename[0]+'_'+'EDITED'+'_'+ts+'.'+extension;
				var newpath = des+'/'+newFile;
				
				
				var data = {
					"old_name" : file,
					"old_path" : oldpath,
					"new_name" : newFile,
					"new_path" : newpath 
							};
				async.waterfall([
					function(callback){
						// appends data according to extension
						if(extension == 'txt'){
							append.txt(oldpath, data, function (err) {
								callback(err, oldpath, newpath);	
							});
						}
						else if(extension == 'json'){
							
							append.json(oldpath, data, function(err){
								callback(err, oldpath, newpath);
							});
						} else {
							callback_each();
						}
						
					}, function(oldpath, newpath, callback){
						// renames the files to moved folders
						rename.move(oldpath, newpath, function(err){
							callback(err);
						});
					}], function(err){
							if(err){
								failures.push(file);
							} else {
								successes.push(file);
							}

							callback_each();
						}
					)
				}, 
			function(err){
				console.log('renamed '+successes.length+' files');
				console.log('with '+failures.length+' error(s)' );
				if(failures.length > 0){
					console.log(failures);
				}
			}
		);
	});
}



moveAndAppendFiles('files/original', 'files/moved');