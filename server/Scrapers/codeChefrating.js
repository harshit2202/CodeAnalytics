"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser



let timeStart;
async function usertester(user){
    let url = 'https://www.codechef.com/users/' + user; 
    let browser = await puppeteer.launch({headless:false});
 	let page = await browser.newPage();
 	console.log("Started Browser");
 	timeStart = (new Date()).getTime();
 	
 	await page.goto(url,{waituntil : 'domcontentloaded',
    	timeout:3000,
 						headless:true});



 	let timeTotal = (new Date()).getTime() - timeStart;
 	console.log("Time to fetch Page "+ fetchtime());
 	
 	data = await page.content();
 	console.log("Time to get content "+ fetchtime());

 	let rating = fetchData(data);
 	console.log(rating);	
    console.log("Total time "+ fetchtime());
    await browser.close();
    return rating;
};
usertester("yash_code_guy");
//function to fetch data form the acquired html
function fetchData(data){
 const $ = cheerio.load(data); 
    let rating = $('.rating-number').text();
    return rating;

}

function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}