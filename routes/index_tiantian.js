
/*
 * GET home page.
 */

var myUtil = require('./myUtil.js');
var $ = require('jQuery');
var m = require('moment')

exports.index_tiantian = function(req, res){
	req.setEncoding('utf8')

var url="http://www.ttmeiju.com/";
	console.log(url);
	myUtil.get(url,function(content,status){
		
		var ep = {}
		ep.rooturl=url
		console.log("status:="+status);
		//extract episode name and download links
		ep.dls=[]
		$(content).find("table.seedtable tr")
			.each(function(i,d) {
			
			var curDl = {}
			curDl.name=$(this).find('td').eq(1).text()
			
			console.log(curDl)
			ep.dls.push(curDl)
			
		})
		
		ep.now =m().format('lll')
		res.render('index',{ep:ep});
	});
};