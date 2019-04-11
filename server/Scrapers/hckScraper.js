const puppeteer = require('puppeteer');
const fs = require("fs-extra"); 
const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
let subarr = [];
async function myScraper(url)
{
      try
      {  
              const browser = await puppeteer.launch({headless:false});
              const page = await browser.newPage();
              try
              {
              	 await page.goto(url);
              }
              catch(e)
              {
              	console.log(e) ;
              	browser.exit() ;
              }
              let list = [];
              var i=2 ;
              let verdict=[]
              while(true)
              {  
              	 		 await page.waitFor(4000);
              	 		 html = await page.content();
              	 		 var $ = cheerio.load(html);
              			  $('.scroll-content tr').each((i,el)=>{

              			  	const item = ($(el).text()).replace(/\s\s+/g,'@').split("@")  ;
              			  	const ver = ($(el).find('i').attr('title')) ;
              			  	subarr.push(item) ;
              			  	verdict.push(ver) ;
              			  	//console.log(ver) ;
              			  });

	                      var x='#l'+(i) ;
	                      try
	                      {
	                      	 await page.click(x);
	                      } 
	                      catch(e)
	                      {
	                          console.log("DONE!!") ;
	                          break ;
	                      }
	                 // console.log(a_arr) ; 
	                     i=i+1 ;
              }
               for(let j=0;j<subarr.length;j++)
                {
                      fs.appendFile("file.txt",subarr[j][1]+" "+subarr[j][2]+" "+subarr[j][3]+" "+subarr[j][4]+" " + subarr[j][5]+" "+subarr[j][6] + " "+subarr[j][8] +"\n");
                } 
            //  await browser.close();
        //      fs.writeFile('output1.txt',a_arr, (err) =>{ 
        //           if (err) throw err; 
        //      }) 
              await browser.close();
      } 
      catch(e) 
      {
            console.log(e) ;
      }                                         
}
myScraper('https://www.hackerearth.com/submissions/sy56910');

