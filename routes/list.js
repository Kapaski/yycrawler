var myUtil = require('./myUtil.js');
var $ = require('jQuery');
var u = require('url')
var mo = require('moment')

exports.list = function(req, res){
	var url_parts = u.parse(req.url,true);
	var qs = url_parts.query.link;
	var url="http://www.yayaxz.com"+qs;
	console.log(url);
	myUtil.get(url,function(content,status){
		var ep = {}
		var max=0
		console.log("status:="+status);
		//extract episode name and download links
		ep.name=$(content).find("title").text()

		//calculate current season number
		ep.dls=[]
		$(content).find('dd[data-format="MP4"]').each(function(){
			var x=$(this).attr('data-season');
			max=max<x?x:max
		})
		var m = max.toString()
		$(content).find('dd[data-format="MP4"][data-season="'+m+'"]').each(function() {
			var detail = {}
			detail.type=$(this).find('a.type').text()
			detail.name=$(this).find('a').eq(1).text()
			detail.link1=$(this).find('span a').eq(2).attr('thunderhref')
			detail.link2=$(this).find('span a').eq(1).attr('href')
			detail.link3=$(this).find('span a').eq(0).attr('href')

			ep.dls.push(detail)
		})
		$(content).find('dd[data-format="DVD"][data-season="0"]').each(function() {
			var detail = {}
			detail.type=$(this).find('a.type').text()
			detail.name=$(this).find('a').eq(1).text()
			detail.link1=$(this).find('span a[data-download-type="-1"]').eq(0).attr('thunderhref')
			detail.link2=$(this).find('span a').eq(1).attr('href')
			detail.link3=$(this).find('span a').eq(0).attr('href')

			ep.dls.push(detail)
		})
		$(content).find('dd[data-format="720P"][data-season="0"]').each(function() {
			var detail = {}
			detail.type=$(this).find('a.type').text()
			detail.name=$(this).find('a').eq(1).text()
			detail.link1=$(this).find('span a[data-download-type="-1"]').eq(0).attr('thunderhref')
			detail.link2=$(this).find('span a').eq(1).attr('href')
			detail.link3=$(this).find('span a').eq(0).attr('href')

			ep.dls.push(detail)
		})
		$(content).find('dd[data-format="1080P"][data-season="0"]').each(function() {
			var detail = {}
			detail.type=$(this).find('a.type').text()
			detail.name=$(this).find('a').eq(1).text()
			detail.link1=$(this).find('span a[data-download-type="-1"]')[0].getAttribute('thunderhref')
			detail.link2=$(this).find('span a').eq(1).attr('href')
			detail.link3=$(this).find('span a').eq(0).attr('href')

			ep.dls.push(detail)
		})
		ep.now=mo().format('lll')
		//console.log(ep)
 		res.render('list',{ep:ep});
	});
};
