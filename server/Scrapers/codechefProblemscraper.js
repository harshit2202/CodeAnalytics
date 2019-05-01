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
              let Tags=['gcd','probability','strings','bfs','data-structure','string','array','simple-math','number-theory','tree','dfs','geometry','combinatorics','implementation','graph','binary-search','math','maths','segment-tree','greedy','ad-hoc','dynamic-programming']
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
              map.set('data structures','data structures');
              map.set('data-structure','data structures');
              map.set('array','data structures');
              map.set('segment-tree','trees') ;
              map.set('tree','trees') ; 
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

              var tag_map = new Map() ;
              for(i=0 ; i<Tags.length ; i++)
              {
                  link = 'https://www.codechef.com/tags/problems/' + Tags[i] ;
                  await page.goto(link) ;
                  await page.waitFor(4000) ;
                  html= await page.evaluate(() => document.body.innerHTML) ;
                  $ = cheerio.load(html);
                  let m,n,tag ;
                  tag = map.get(Tags[i]) 
                  n = $('#problems > div').length;
                  for(j=1 ; j<=n ; j++)
                  {
                          ele = $('#problems > div:nth-child('+ j +')')
                          id = $(ele).attr('id') ;
                          tags = [] ;
                          if(tag_map.has(id))
                          {
                                tags = tag_map.get(id) ;
                                if(tags.includes(tag) == false)
                                {
                                    tags.push(tag) ;
                                    tag_map.set(id,tags) ;
                                  //  console.log(tags);
                                }
                          }
                          else 
                          tag_map.set(id,[tag]) 
                  }  
              }
              //console.log(tag_map.get('TYPING')) ;
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
                          var name,link ;
                          name = $('.dataTable > tbody > tr:nth-child('+position+') > td > .problemname > a > b').text() ;
                          link = $('.dataTable > tbody > tr:nth-child('+position+') > td > .problemname > a').attr('href') ;
                          id = $('.dataTable > tbody > tr:nth-child('+position+') > td:nth-child(2) > a').text() ;
                          link = 'https://www.codechef.com' + link ;
                          let tags=[]  ;
                          if(tag_map.has(id)==false)
                          tags.push('miscellaneous') ;
                          else 
                          tags = tag_map.get(id)
                          list.push
                          (
                            {
                                name : name,
                                link : link,
                                tags : tags,
                                difficulty : diff[i]  
                            }
                          ) ; 
                   } 
                   //break ;
              }
              await browser.close();
              console.log(list) ;
              return list ;
      } 
      catch(e) 
      {
            console.log(e) ;
      }                                         
}
myScraper();
