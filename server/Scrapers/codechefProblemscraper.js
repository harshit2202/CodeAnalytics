"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
// const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser


let jsonArr = [];
let timeStart;
async function codeChefProblemscraper(user){ 
    
	let url = 'https://www.codechef.com/problems/school';
	let browser = await puppeteer.launch({headless:false});
 	let page = await browser.newPage();
 	
 	timeStart = (new Date()).getTime();
 	
 	await page.goto(url,{waituntil : 'domcontentloaded',
 						timeout:300000,
 						headless:true});



 	let timeTotal = (new Date()).getTime() - timeStart;
 	console.log("Time to fetch Page "+ fetchtime());
 	
 	data = await page.content();
 	console.log("Time to get content "+ fetchtime());

 	fetchData(data,"school");
 	console.log("DONE");
        diff = ["school","easy","medium","hard"];
        
        const $ = cheerio.load(data); 
            // currselector = "problem-"+diff[i-1];
            // console.log(currselector); 
            
            for(i=0;i<3;i++){
                selector = '#problem-' + diff[i] + ' > li > a[href = "/problems/' + diff[i+1] + '/"]';
                page.click(selector);	
                await page.waitFor('#problem-' + diff[i+1]);
                data = 	await page.content();
                fetchData(data,diff[i+1]);
            }
          
	console.log("Total time "+ fetchtime());
 	await browser.close();
	// console.log(jsonArr);
	return jsonArr;

};

codeChefProblemscraper();

//function to fectch data form the acquired html
function fetchData(data,diff){
 link = "";
 probname = "";
 tag="";
 const $ = cheerio.load(data);     
    tag =  diff;
	$('.problemname').each((index,row) => {
        link = $(row).children('a').attr('href');
        link = "https://www.codechef.com/problems";
        probname = $(row).children('a').children('b').text();  
        // console.log(tag + " "+ link+" "+ probname);
        jsonArr.push({
            difficulty: tag,
            probname: probname,
            link: link,     
        })     
    });
   
}

function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}


export default codechefProblemscraper;