var date = new Date;

function getTimeStamp() {

	var year = date.getFullYear();
	var month = date.getMonth() + 1; // January = 0, February = 1, etc.
	var day = date.getDate();
	var hour = date.getHours();
	var seconds = date.getSeconds();

	var timestamp = year+'-'+month+'-'+day+'_'+hour+'-'+seconds;
	// console.log(timestamp);
	return timestamp;
}


module.exports = {
	getTimeStamp };