//const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
//const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
const fs = require("fs-extra");
async function myScraper(url)
{
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
    
    await page.waitFor(4000);
    html = await page.content();
    var $ = cheerio.load(html);
    var ele = ($('.pagination > ul > li:nth-last-child(2) > span'));
    //console.log($(ele).attr('pageindex')) ;  
    var n=parseInt($(ele).attr('pageindex')) ;
    i=1 ;           
    while(i<n)
    {  
            
      data = await page.content();
      const ele=$('.status-frame-datatable') ;
      await page.waitFor(4000);
      var myList=((ele.find('td').text().replace(/\s\s+/g,'@'))).split("@") ;
      for(let j=1;j<myList.length && j+7<myList.length;j+=8)
      {
        list.push({
          link : myList[j],
          time : myList[j+1],
          user : myList[j+2],
          problem : myList[j+3],
          language : myList[j+4],
          verdict : myList[j+5]
        });
      } 
      await page.$$eval(selector, anchors => 
      {
          anchors.map(anchor => {
          if(anchor.textContent == '→')
          {
              anchor.click();
          }
        })
      });
      i++ ;
      break;
    }   
    console.log('Done !') ;
            
    //await browser.close();
    //fs.writeFile('output1.txt',a_arr, (err) =>{ 
    //  if (err) throw err; 
    //}) 
    await browser.close();
    console.log(list);
    return list;
  } 
  catch(e) 
  {
    console.log(e) ;
  }                                         
}

module.exports = myScraper;
