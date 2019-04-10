"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser

let user = "zaszxz";
let subarr = [];
let url = 'https://www.codechef.com/users/' + user;
let timeStart;
async function usertester(){
 	let browser = await puppeteer.launch({headless:true});
 	let page = await browser.newPage();
 	console.log("Started Browser");
 	timeStart = (new Date()).getTime();
 	
 	await page.goto(url,{waituntil : 'domcontentloaded',
 						timeout:300000,
 						headless:true});



 	let timeTotal = (new Date()).getTime() - timeStart;
 	console.log("Time to fetch Page "+ fetchtime());
 	
 	data = await page.content();
 	console.log("Time to get content "+ fetchtime());

 	let result = fetchData(data);
 	console.log("DONE");	
    console.log("Total time "+ fetchtime());
    await browser.close();
    console.log(result);
    if(result)
        return true;
    else
        return false; 	
};
usertester();
//function to fetch data form the acquired html
function fetchData(data){
 const $ = cheerio.load(data); 
    if($('.err-message').text()=="Could not find page you requested for.")
        return false;
    else 
        return true;    
}

function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}