//const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
//const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
//const fs = require("fs-extra"); 
const ProblemModel = require('../models/ProblemModel');
var list=[] 
async function myScraper(url)
{
    console.log("Starting to scrape");
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
              var map = new Map() ;
              map.set('graphs','graphs');
              map.set('graph','graphs');
              map.set('dfs','graphs');
              map.set('bfs','graphs');
              map.set('maths','math');
              map.set('geometry','math');
              map.set('simple-math','math');
              map.set('math','math');
              map.set('gcd','math');
              map.set('probability','math') ;
              map.set('probabilities','math');
              map.set('combinatorics','math');
              map.set('string','strings');
              map.set('strings','strings');
              map.set('data structures','data structures');
              map.set('data-structure','data structures');
              map.set('array','data structures');
              map.set('segment-tree','trees') ;
              map.set('tree','trees') ;
              map.set('dp','dp'); 
              map.set('dynamic-programming','dp');
              map.set('ad-hoc','brute force');
              map.set('brute force','brute force');
              map.set('binary search','binary search')
              map.set('binary-search','binary search');
              map.set('hashing','hashing');
              map.set('implementation','implementation') ;
              map.set('greedy','greedy') ;
              map.set('dfs and similar','graphs') ;
              map.set('dsu','dsu') ;
              map.set('disjoint-set','dsu');
              map.set('number theory','number theory')
              map.set('number-theory','number theory') ;
              map.set('shortest path','graphs') ;   
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
                              xx=($('.problems > tbody > tr:nth-child('+position+') > td:nth-child(2) > div > a'));
                              link=$(xx).attr('href') ;
                              link = 'https://codeforces.com' + link;
                              let arr=[] ;
                              arr=(ele.text().replace(/\s\s+/g,'@').split("@")) ;
                              var tags=[] ;
                              for(k=3 ; k<arr.length-2 ; k++)
                              {
                                if(map.has(arr[k])) 
                                {
                                    tags.push(map.get(arr[k]))  ;                                
                                }
                              }
                              if(tags.length == 0)
                              tags.push('miscellaneous') ;
                              list.push
                              (
                                {
                                    'tags'  : tags ,
                                    'name'  : arr[2],
                                    'link'  : link
                                }
                              ) ;
                          }
                          
                         
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
                          //break ;
              }   
                console.log('Done !') ;
                await browser.close();
                console.log(list) ;
        //      fs.writeFile('output1.txt',a_arr, (err) =>{ 
        //           if (err) throw err; 
        //      }) 
        console.log(list.length);
        await ProblemModel.insertMany(list , function(error , docs) {
            if(error)
                console.log("error");
        });
      } 
      catch(e) 
      {
            console.log(e) ;
      }                                         
}
myScraper('https://codeforces.com/problemset');
