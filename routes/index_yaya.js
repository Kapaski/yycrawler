
/*
 * GET home page.
 */

var myUtil = require('./myUtil.js');
var $ = require('jQuery');
var m = require('moment')


exports.index_yaya = function(req, res){
var url="http://www.yayaxz.com/";
	console.log(url);
	myUtil.get(url,function(content,status){
		var ep = {}
		ep.rooturl=url
		console.log("status:="+status);
		//extract episode name and download links
		ep.dls=[]
		$(content).find(".resource-list-box, .resource-list-box-pic")
		.find('a[href*="/resource"]').each(function(d) {
			var curDl = {}
			curDl.name=$(this).text()
			//var dd=$(this).parent().parent().siblings()
			//curDl.link1=dd.find('a[class="bnt-0 resource-download-name"]:contains("迅雷")').attr('thunderhref')
			curDl.link1=$(this).attr('href')
			console.log(curDl.link1)
			ep.dls.push(curDl)
		})
		ep.now =m().format('lll')
		res.render('index',{ep:ep});
	});
};