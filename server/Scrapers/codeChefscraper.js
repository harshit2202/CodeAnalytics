"use-strict"
const cheerio = require("cheerio"); //to parse the scraped data
// const fs = require("fs-extra"); //file read write
const puppeteer = require('puppeteer'); // Headless Browser

let user = "mridul1809";
let subarr = [];
let url = 'https://www.codechef.com/users/' + user;
let timeStart;

async function myfunc(){
 	let browser = await puppeteer.launch({headless:true});
 	let page = await browser.newPage();
 	
 	timeStart = (new Date()).getTime();
 	
 	await page.goto(url,{waituntil : 'domcontentloaded',
 						timeout:300000,
 						headless:true});



 	let timeTotal = (new Date()).getTime() - timeStart;
 	console.log("Time to fetch Page "+ fetchtime());
 	
 	data = await page.content();
 	console.log("Time to get content "+ fetchtime());

 	fetchData(data);
 	console.log("DONE");
 	 	let totalpages = fetchNumberOfPages(data);
	




	for(let i=0;i<totalpages;i++){

	 	if(i != totalpages-1){
	    	page.click('.problems > tbody > tr > td:last-of-type > a');
	    }	
	    	await page.waitFor(1500);
	    	data = 	await page.content();
		
	 	
	 	console.log("CLICKED!!!" + (i+1));
	 	fetchData(data);
	}
	console.log("Total time "+ fetchtime());
 	await browser.close();

 	 	
	let jsonArr = [];
 	console.log(subarr.length);
	for(let i=0;i<subarr.length;i+=4){
		jsonArr.push({
			dateTime : subarr[i],
			questionID: subarr[i+1],
			submissionStatus:subarr[i+2],
			languageUsed: subarr[i+3]
		})
		console.log(subarr[i]+" "+subarr[i+1]+" "+subarr[i+2]+" "+subarr[i+3]+"\n");
		// fs.outputFile(user+"_codechef.txt",subarr[i]+" "+subarr[i+1]+" "+subarr[i+2]+" "+subarr[i+3]+"\n");
	}
	return jsonArr;

};

myfunc();

//function to fectch data form the acquired html
function fetchData(data){
  
 const $ = cheerio.load(data); 
	$('.dataTable > tbody > tr').each((index,row) => {
		$(row).children().each((childIndex,cell)=>{
			if($(cell).text()==""){
				subarr.push($(cell).find('span').attr('title'));
			}
			else{
				subarr.push($(cell).text());
			}
		});
	});
}

function fetchNumberOfPages(data){
	const $ = cheerio.load(data); 

	let pagestring = $('.problems > tbody > tr > td > #loader > .pageinfo',data).text();
	let totpages="";
	let i = 0;
	let spcnt=0;
	while(i<pagestring.length){
		if(spcnt==2){
			totpages+=pagestring[i];
		}
		if(pagestring[i]==" "){
			spcnt++;
		}
		i++;
	}
	return Number(totpages);
}
function fetchtime(){
	return (((new Date).getTime() - timeStart)/1000) + " seconds";
}