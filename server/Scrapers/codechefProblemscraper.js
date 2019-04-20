"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
// const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser
const ProblemModel = require('../models/ProblemModel');


let jsonArr = [];
let timeStart;
async function codeChefProblemscraper(user){ 

    console.log("Starting to scrape");
    
	let url ;
	let browser = await puppeteer.launch({headless:false});
 	let page = await browser.newPage();
 	
 	timeStart = (new Date()).getTime();
 	
 	// await page.goto(url,{waituntil : 'domcontentloaded',
 	// 					timeout:300000,
 	// 					headless:true});



 	// let timeTotal = (new Date()).getTime() - timeStart;
 	// console.log("Time to fetch Page "+ fetchtime());
 	
 	// data = await page.content();
 	// console.log("Time to get content "+ fetchtime());

 //	fetchData(data,"school");
 	//console.log("DONE");
        diff = ["school","easy","medium","hard"];
        
            // currselector = "problem-"+diff[i-1];
            // console.log(currselector); 
            
            for(i=0;i<3;i++){
                url = 'https://www.codechef.com/problems/'+diff[i]; 
                await page.goto(url) ;
                data = await page.content();
                const $ = cheerio.load(data); 
                //selector = '#problem-' + diff[i] + ' > li > a[href = "/problems/' + diff[i+1] + '/"]';
                await page.waitFor(4000);
               // await page.click(selector);	
                
                fetchData(data,diff[i+1]);
                await page.waitFor(4000);
            }
          
	console.log("Total time "+ fetchtime());
 	await browser.close();
    console.log(jsonArr.length) ;
    console.log(jsonArr[1000]) ;
    await ProblemModel.insertMany(jsonArr,function(error,docs) {
        if(error)
            console.log("error");
    });
	//return jsonArr;
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
            name: probname,
            link: link,     
        })     
    });
}

function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}


//export default codechefProblemscraper;