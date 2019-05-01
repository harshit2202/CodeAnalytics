const puppeteer = require('puppeteer');
const fs = require('fs') 
const cheerio = require("cheerio"); //to parse the scraped data
async function myScraper(userName)
{
      try
      {  
              const browser = await puppeteer.launch({headless:true});
              const page = await browser.newPage();
              await page.goto('https://codeforces.com/contests/with/' + userName);
              await page.waitFor(1000) ;
              var ele,$,n,m ;
              html= await page.evaluate(() => document.body.innerHTML) ;
              $ = cheerio.load(html);

              n = $('.datatable > div:nth-child(6) > table > tbody > tr').length ;
              console.log(n) ;

              var ratingsList = [];
              for(i=1 ; i<=n ; i++)
              {
                   ele = $('.datatable > div:nth-child(6) > table > tbody > tr:nth-last-child('+ i +') > td:nth-child(6)').text().replace(/\s\s+/g,'@').split("@") ;
                   ratingsList.push(ele[1])
              }
              await browser.close() ;
              console.log(ratingsList)
              return ratingsList
      }
      catch(e)
      {
        console.log(e) ;
      }
}
//myScraper('tourist')

module.exports = myScraper;