const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
const fs = require("fs-extra"); 
async function myScraper()
{
      try																				
      {  
              const browser = await puppeteer.launch({headless:false});
              const page = await browser.newPage();
              var url = 'https://codeforces.com/contests'  ;
              await page.goto(url);
              await page.waitFor(2000);
              var ele,$,n,m  ;
              html= await page.evaluate(() => document.body.innerHTML) ;
              $ = cheerio.load(html);
         	  n = $('.pagination > ul > li:nth-last-child(2) > span > a').text() ;
         	  console.log(n) ;
              // ele = $('.datatable > div:nth-child(6) > table > tbody > tr:nth-child(2)').text() ;
              // console.log(ele) ;
              var contests = []
              for(i=1;i<=n;i++)
              {
	              	 url = 'https://codeforces.com/contests/page/' + i ;
	              	 await page.goto(url);
	             	 await page.waitFor(1000);
	             	 html= await page.evaluate(() => document.body.innerHTML) ;
	                 $ = cheerio.load(html);
	                 m =  $('.contests-table > .datatable > div:nth-child(6) > table > tbody > tr').length ;
	                 //console.log(m) ;
	                 for(j=2 ; j<=m ; j++)
	                 {
	                 	ele = $('.contests-table > .datatable > div:nth-child(6) > table > tbody > tr:nth-child('+ j +')').attr('data-contestid') ;
	                 	contests.push('https://codeforces.com/contest/' + ele) ;
	                 }	
	                 //console.log(contests) ;
	                 break;
              }

              var averageTimeList = [] ;
              for(i=0 ; i<contests.length ; i++)
              {
              		 await page.goto(contests[i]);
	             	 await page.waitFor(500);
	             	 html= await page.evaluate(() => document.body.innerHTML) ;
	                 $ = cheerio.load(html);
	             	 var num = $('.problems > tbody > tr').length ;
	             	 console.log(num) ;
	             	 var problemIds = [] ; 

	             	 for(j=2 ; j<=num ;j++ )
	             	 {
	             	 	ele = $('.problems > tbody > tr:nth-child('+ j +') > td:nth-child(1) > a').text() ;
	             	 	var temp = ele.split('\n') ;
	             	 	problemIds.push(temp[1].trim()) ;
	             	 }
	             	 ///console.log(problemIds);
	             	 await page.goto(contests[i]+'/standings/page/1');
		             await page.waitFor(500);
		             html= await page.evaluate(() => document.body.innerHTML) ;
		             $ = cheerio.load(html);

	             	 n = $('.custom-links-pagination > nobr').length ;
	             	 //console.log(n);
	             	 timeListAllUser = [] ;
	             	 for(j=1 ; j<=n && j<=15 ; j++)
	             	 {
		             	 await page.goto(contests[i]+'/standings/page/'+j);
		             	 await page.waitFor(500);
		             	 html= await page.evaluate(() => document.body.innerHTML) ;
		                 $ = cheerio.load(html);
		                 
		                 m = $('.standings > tbody > tr').length ;
		                 //console.log(m) ;
		                 for(k=2 ; k<m ; k++)
		                 {
		                 	  var userJson = {} ;	
		                 	  for(x=1 ; x<num ; x++)
		                 	  {
		                 	  		var time=0 ;
		                 	  		var probId ;
		                 	  		probId = problemIds[num-x-1] ;

		                 	  		ele = $('.standings > tbody > tr:nth-child('+ k +') > td:nth-last-child('+ x +') > span:nth-child(2)').text().split(':') ;
		                 	  		//console.log(ele) ;
		                 	  		var time ;
		                 	  		if(ele.length == 1)
		                 	  		{
		                 	  			userJson[probId] = 9999 ;
		                 	  		}	
		                 	  		else
		                 	  		{
		                 	  			time = 60*parseInt(ele[0])+parseInt(ele[1]) ;
		                 	  			userJson[probId] = time ;
		                 	  		}
		                 	   //		console.log(time) ;
		                 	  }
		                 	  //console.log(userJson) ;
		                 	  sortedTimeList = sortProperties(userJson) ;
		                 	  //console.log(sortedTimeList) ;

		                 	  var actualTimeList = [] ;
		                 	  actualTimeList.push(sortedTimeList[0]) ;
		                 	  for(x=1 ; x<sortedTimeList.length ; x++)
		                 	  {
		                 	  		if(sortedTimeList[x][1] == 9999) 
		                 	  		{
		                 	  			actualTimeList[x] = sortedTimeList[x] ;
		                 	  		}
		                 	  		else 
		                 	  		actualTimeList.push([sortedTimeList[x][0],sortedTimeList[x][1] - sortedTimeList[x-1][1] ] );
		                 	  		//actualTimeList[x][1] = sortedTimeList[x][1] - sortedTimeList[x-1][1] ;
		                 	  }

		                 	 // console.log(actualTimeList) ;
		                 	  timeListAllUser.push(actualTimeList) ;
		                 }
		                 //ele = $('.standings > tbody > tr')
	             	 }

	             	 // Calculate Average Time **********************
	             	 var totalSolved = new Map() ;
	             	 var totalTime = new Map() ;
	             	 for(j=0 ; j < timeListAllUser.length ; j++)
	             	 {
	             	 	let userList = timeListAllUser[j] ;
	             	 	for(k=0 ; k< userList.length ; k++)
	             	 	{
	             	 		if(userList[k][1]!=9999)
	             	 		{
	             	 		
	             	 			if(totalSolved.has(userList[k][0]))
	             	 			{
	             	 				totalSolved.set(userList[k][0] , totalSolved.get(userList[k][0]) + 1) ;
	             	 				totalTime.set(userList[k][0] , totalTime.get(userList[k][0]) + userList[k][1]) ;

	             	 				//console.log(totalSolved.get(userList[k][0]));
	             	 			}
	             	 			else
	             	 			{
	             	 				totalSolved.set(userList[k][0] , 1 ) ;
	             	 				totalTime.set(userList[k][0] ,  userList[k][1] ) ;
	             	 			}
	             	 		}
	             	 	}
	             	 }
	             	 
	             	 // push in list 
	             	 for(j=0 ; j< problemIds.length ; j++)
	             	 {
	             	 	link = contests[i] + '/problem/'+problemIds[j] ;
	             	 	if(totalSolved.get(problemIds[j])!=0)
	             	 	{
	             	 		var avg_time = Math.floor((totalTime.get(problemIds[j]))/(totalSolved.get(problemIds[j]))) ;
	             	 		averageTimeList.push
	             	 		 (
	             	 		 	{
	             	 		 		time : avg_time,
	             	 		 		link : link
	             	 		 	}
	             	 		);
	             	 	}
	             	 	else
	             	 	{
	             	 		averageTimeList.push
	             	 		 (
	             	 		 	{
	             	 		 		time : 120,
	             	 		 		link : link
	             	 		 	}
	             	 		);
	             	 	}
	             	 }
              }
              await browser.close() ;
              console.log(averageTimeList) ;
      }
      catch(err)
      {
      	console.log(err) ;
      }
}

function sortProperties(obj)
{
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); 

	sortable.sort(function(a, b)
	{
	  return a[1]-b[1]; 
	});
	return sortable; 
}

myScraper();