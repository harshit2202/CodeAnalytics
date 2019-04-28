const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
const fs = require("fs-extra"); 
var list=[] 
async function myScraper()
{
      try
      {  
              const browser = await puppeteer.launch({headless:false});
              const page = await browser.newPage();
              var list=[] ;
              var ele,$ ;
              var diff = ['school','easy','medium','hard'] ;
             // let Tags=['fft','matrix-expo','gcd','sqrt-decomp','bit','game-theory','probability','hashing','strings','bfs','data-structure','string','array','simple-math','number-theory','tree','dfs','geometry','combinatorics','implementation','graph','binary-search','math','sorting','maths','segment-tree','greedy','ad-hoc','dp','dynamic-programming']
              var map = new Map() ;
              map.set('graph','graph');
              map.set('dfs','graph');
              map.set('bfs','graph');
              map.set('maths','math');
              map.set('geometry','math');
              map.set('simple-math','math');
              map.set('math','math');
              map.set('gcd','math');
              map.set('probability','math') ;
              map.set('combinatorics','math');
              map.set('string','strings');
              map.set('strings','strings');
              map.set('data-structure','data-structure');
              map.set('array','data-structure');
              map.set('segment-tree','trees') ;
              map.set('tree','trees') ;
              map.set('dp','dp');
              map.set('dynamic-programming','dp');
              map.set('ad-hoc','brute force');
              map.set('binary-search','binary-search');
              map.set('hashing','hashing');
              map.set('implementation','implementation') ;
              map.set('greedy','greedy') ;

              for(i=0 ; i<diff.length ; i++)
              {
                    url = 'https://www.codechef.com/problems/' + diff[i] ;
                    await page.goto(url);
                    await page.waitFor(4000);
                    html= await page.evaluate(() => document.body.innerHTML) ;
                    $ = cheerio.load(html);
                    var len = parseInt($('.dataTable > tbody > tr').length)  ;
                    console.log(len) ;

                    for(j=1;j<=len;j++)
                    {
                          var position=j.toString() ;
                          html= await page.evaluate(() => document.body.innerHTML) ;
                          $ = cheerio.load(html);
             
                          var name,link ;
                          name = $('.dataTable > tbody > tr:nth-child('+position+') > td > .problemname > a > b').text() ;
                          link = $('.dataTable > tbody > tr:nth-child('+position+') > td > .problemname > a').attr('href') ;
                          link = 'https://www.codechef.com' + link ;
                          console.log(name) ;
                          console.log(link) ;
                          ele =($('.dataTable > tbody > tr:nth-child('+position+') > td > div > a'));
                          url= 'https://www.codechef.com' +  $(ele).attr('href') ;
                          await page.goto(url) ;
                          await page.waitFor(2000);

                          html= await page.evaluate(() => document.body.innerHTML) ;
                          $ = cheerio.load(html);
         
         //               await page.waitFor(2000) ;
                          ele =($('#content-regions > section > div > aside > p:nth-last-child(5) > span '));
                          //ele = ($('.problem-tag-small  mathjax-support > a').text().replace(/\s\s+/g,'@').split("@")) ;
                          var str = ($(ele).text()).toString() ;
                          var temp_tags = str.split(", ") ;
                          let tags = [] ;
                          for(k=0; k<temp_tags.length ; k++)
                          {
                              if(map.has(temp_tags[k])) 
                              {
                                  tags.push(map.get(temp_tags[k]))  ;                                
                              }
                          }  
                          if(tags.length == 0)
                          tags.push('miscellaneous') ;
                          console.log(tags) ;

                          list.push
                          (
                            {
                                name : name,
                                link : link,
                                tags : tags,
                                difficulty : diff[i]  
                            }
                          ) ; 
                          await page.goBack();
                          await page.waitFor(2000);

                          //if(j==2) break ;
                   } 
              }
              await browser.close();
              console.log(list.length) ;
              return list ;
      } 
      catch(e) 
      {
            console.log(e) ;
      }                                         
}
myScraper();
