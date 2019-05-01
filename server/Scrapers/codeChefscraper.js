//const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
//const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
//const fs = require("fs-extra"); 
var list=[] 
var submission=[]
async function myScraper(userName,lastLink)
{
      try																				
      {  
              const browser = await puppeteer.launch({headless:false});
              const page = await browser.newPage();
              var url = 'https://www.codechef.com/users/' + userName ;
              await page.goto(url);
              await page.waitFor(4000);
              var ele,$ ,arr,n ;

      		  html= await page.evaluate(() => document.body.innerHTML) ;
              $ = cheerio.load(html);
              ele = ($('.problems > tbody > tr > td:nth-child(2) > div > div ').text()).toString() ;
              arr= ele.split(' ') ;
			  n = arr[2] ;
			  flag = 0;
              var mp = new Map()
              var list=[]
              for(i=0 ; i<n ;i++)
              {
            	    html= await page.evaluate(() => document.body.innerHTML) ;
              	 	$ = cheerio.load(html);
              	 	console.log('page: ' + (i+1)) ;
              	 	var m = $('.dataTable > tbody > tr').length ;
              	 //	console.log(m); 
              	 	for(j=1 ;j<=m ;j++)
              	 	{
              	 		ele = $('.dataTable > tbody > tr:nth-child('+ j +') > td > a') ;
              	 		arr = ($(ele).attr('href')).split('/') ;

              	 		var contest,problem ;
              	 		if(arr.length == 4)
              	 		{
              	 			contest = arr[1] ;
              	 			problem = arr[3] ;
              	 		}
              	 		if(arr.length == 3)
              	 	 	{
              	 	 		contest = 'false' ;
              	 	 		problem = arr[2] ;
              	 	 	}
              	 		if(mp.has((contest,problem)))
              	 		continue ;
              	 		else 
              	 		{
              	 			list.push([contest,problem]) ;
              	 			mp.set((contest,problem),true) ;
              	 		}
              	 	} 
            	    if(i!=n-1)
          	 	  	await page.click('.problems > tbody > tr > td:nth-child(3) > a') ;
          	 	  	await page.waitFor(2000) ;

          	 	  	//break ;
              }
              console.log(list) ;

              //***************************************
              for(i=0 ; i<list.length ; i++)
              {
              		url = 'https://www.codechef.com/' ;
              	 	if(list[i][0] == 'false')
              		url = url + 'status/' + list[i][1] + ',' + userName ;
              		else 
              		url = url + list[i][0] + '/status/' + list[i][1] + ',' + userName ;
              		await page.goto(url);
              		await page.waitFor(2000) ;

              		html= await page.evaluate(() => document.body.innerHTML) ;
              	 	$ = cheerio.load(html);

              	 	n = $('.dataTable > tbody > tr').length

              	 	for(j=1 ; j<=n ; j++)
              	 	{
              	 		 arr=[]
              	 		 for(k =1 ; k<=8 ; k++)
              	 		 {
              	 		 	 if(k!=3 && k!=4)
              	 		 	 {
              	 		 	 	ele = ($('.dataTable > tbody > tr:nth-child('+ j +') > td:nth-child('+ k +')')).text() ;
              	 		 	 	arr.push(ele) ;
              	 		 	 }
							}
							console.log(arr);
              	 		 verdict = ($('.dataTable > tbody > tr:nth-child('+ j +') > td:nth-child(4) > span').attr('title')) ;
              	 		 if(verdict=='') // challenge problem
              	 		 verdict = 'accepted' ;

							link = 'https://www.codechef.com/viewsolution/' + arr[0] ;
							
							if(link == lastLink) 
							{
								flag = 1;
								break;
							}

              	 		 submission.push
              	 		 (
              	 		 	{
              	 		 		link : link ,
              	 		 		time : arr[1],
              	 		 		language : arr[4],
								verdict : verdict,
								problem : 'https://www.codechef.com/problems/'+list[i][1]
              	 		 	}
              	 		 );
              	 		 console.log(submission) ;
					   }
					   if(flag == 1)
                			break;
              		 
              } 
              await browser.close();
              return submission;
      }
      catch(e) 
      {
            console.log(e) ;
      }                                         
}
//myScraper('mridul1809');
module.exports = myScraper;
