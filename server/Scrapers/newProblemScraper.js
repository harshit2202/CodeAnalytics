const request = require("request-promise"); // request http
const cheerio = require("cheerio"); //to parse the scraped data
const beautify  = require("js-beautify"); // beautify
const puppeteer = require('puppeteer');
const fs = require("fs-extra"); 
var list = [];
async function myScraper(url)
{
      try																				
      {  
              const browser = await puppeteer.launch({headless:false});
              const page = await browser.newPage();

              var temp = url.split('.') ;
              var site = temp[1] ; 
              await page.goto(url);
              await page.waitFor(2000);
              var ele,$ ; 
              html= await page.evaluate(() => document.body.innerHTML) ;
              $ = cheerio.load(html);

              var map = new Map() ;
              map.set('graphs','graphs')
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
              map.set('data structure','data structures');
              map.set('data-structure','data structures');
              map.set('array','data structures');
              map.set('segment-tree','trees') ;
              map.set('tree','trees') ;
              map.set('dp','dp'); 
              map.set('dynamic-programming','dp');
              map.set('ad-hoc','brute force');
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
              let tags = [] ;
              if(site == 'codechef')
              {
              			  ele =($('#content-regions > section > div > aside > p:nth-last-child(5) > span '));
                          //ele = ($('.problem-tag-small  mathjax-support > a').text().replace(/\s\s+/g,'@').split("@")) ;
                          var str = ($(ele).text()).toString() ;
                          var temp_tags = str.split(", ") ;
                          for(k=0; k<temp_tags.length ; k++)
                          {
                              if(map.has(temp_tags[k])) 
                              {
                                  tags.push(map.get(temp_tags[k]))  ;                                
                              }
                          }   
              }
              else 
              {
              			var n = $('#sidebar > div:nth-last-child(6) > div:nth-last-child(1) > div').length;
              			//console.log(n) ;

              			for(i=1 ; i<n ; i++)
              			{
              				ele = $('#sidebar > div:nth-last-child(6) > div:nth-last-child(1) > div:nth-child('+i+') > span').text() ;
              				temp = []
              				temp = ele.split('\n') ;
              				var tag = temp[1].trim() ;
              				if(map.has(tag))
              				tags.push(map.get(tag)) ;
              			}
              }
              await browser.close() ;

              if(tags.length == 0)
              tags.push('miscellaneous') ;
              console.log(tags);
              return tags ;
      }
      catch(err)
      {
      	console.log(err)
      }
}
myScraper('https://codeforces.com/problemset/problem/1146/G');