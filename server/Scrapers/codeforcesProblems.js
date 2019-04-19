const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
const fs = require("fs-extra"); 
var list=[] 
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
              let selector = '.arrow';
              var i; 
              
              await page.waitFor(4000);
              html = await page.content();
              var $ = cheerio.load(html);
              var ele = ($('.pagination > ul > li:nth-last-child(2) > span')); 
              var n=parseInt($(ele).attr('pageindex')) ;
              //console.log(n) ; 
              i=1;           
              while(i<=n)
              {  
                        
                          await page.goto(url+"/page/"+i);
                          //console.log(i) ;
                          html= await page.evaluate(() => document.body.innerHTML) ;
                          await page.waitFor(4000);
                          var $ = cheerio.load(html) ;
                          var m = parseInt($(".problems > tbody > tr").length);
                          for(j=2 ; j<=m ; j++)
                          {
                              var position=j.toString() ;
                              ele = ($('.problems > tbody > tr:nth-child('+position+')'));
                              let arr=[] ;
                              arr=(ele.text().replace(/\s\s+/g,'@').split("@")) ;
                              var tags=[] ;
                              for(k=3 ; k<arr.length-2 ; k++)
                              {
                                  tags.push(arr[k]) ;
                              }
                              list.push
                              (
                                {
                                    'id'    : arr[1] ,
                                    'tags'  : tags ,
                                    'name'  : arr[2],
                                    'solved': arr[arr.length-2]
                                }
                              ) ;
                          }
                          console.log(list[100*(i-1)]) ;
                          await page.waitFor(2000);
                          // await page.$$eval(selector, anchors => 
                          // {
                          //       anchors.map(anchor => {
                          //       if(anchor.textContent == '→')
                          //       {
                          //           anchor.click();
                          //       }
                          //    })
                          // });
                          i++ ;
              }   
                console.log('Done !') ;
                await browser.close();
                console.log(list) ;
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
myScraper('https://codeforces.com/problemset');
