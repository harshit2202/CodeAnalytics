//const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
//const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
//const fs = require("fs-extra"); 
const ProblemModel = require('../models/ProblemModel');
var list=[] 
async function myScraper(userName,lastLink)
{
      url = 'https://codeforces.com/submissions/' + userName ;
      console.log("Scraping");
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

        let selector = '.arrow';
        let inact_selector = '.inactive';
        list=[]
        i=0; 
        flag = 0;
        await page.waitFor(4000);
        html = await page.content();
        var $ = cheerio.load(html);
        var ele = ($('.pagination > ul > li:nth-last-child(2) > span'));
        //console.log($(ele).attr('pageindex')) ;  
        var n=parseInt($(ele).attr('pageindex')) ;
        

        if(isNaN(n))
          n = 1;

        console.log(n) ;
        i=1 ;           
        while(i<=n)
        {  
              await page.goto(url+"/page/"+i);
              //console.log(i) ;
              html= await page.evaluate(() => document.body.innerHTML) ;
              await page.waitFor(4000);
              var $ = cheerio.load(html) ;
              var m = parseInt($(".status-frame-datatable > tbody > tr").length);

              for(j=2; j<=m ; j++)
              {
                   var position=j.toString() ;
                   ele = ($('.status-frame-datatable > tbody > tr:nth-child('+position+')'));
                   let myList=[] ;
                   myList=(ele.text().replace(/\s\s+/g,'@').split("@")) ;
                   link = $('.status-frame-datatable > tbody > tr:nth-child('+position+') > td > a').attr('href');
                   link = 'https://codeforces.com' + link ;

                   ff =  $('.status-frame-datatable > tbody > tr:nth-child('+position+') > td:nth-child(4) > a').attr('href');
                   arr = ff.split('/');
                   plink = 'https://codeforces.com/problemset/problem/' + arr[2] + '/' + arr[4];
                   
                  if(plink == lastLink) 
                  {
                      flag = 1;
                      break;
                  }
                   list.push({
                              link : link,
                              time : myList[2],
                              user : myList[3],
                              problem : plink,
                              language : myList[5],
                              verdict : myList[6]
                            });
              }
              await page.waitFor(2000);
              i++ ;

              if(flag == 1)
                break;
              //break;
        }   
        console.log('Done !') ;
        // console.log(list);
        await browser.close();
        console.log(list.length);
        return list;
      } 
      catch(e) 
      {
        console.log(e) ;
      }                                         
}
//myScraper('tourist') ;


module.exports = myScraper;
