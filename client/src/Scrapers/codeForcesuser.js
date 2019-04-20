"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser



let timeStart;
async function usertester(user){
    let url = 'http://codeforces.com/profile/' + user; 
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
usertester("mridul1809");
//function to fetch data form the acquired html
function fetchData(data){
 const $ = cheerio.load(data); 
    if($('.user-rank').length)
        return true;
    else 
        return false;    
}

function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}