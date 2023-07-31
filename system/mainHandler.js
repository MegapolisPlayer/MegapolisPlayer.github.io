//Variables

//YEAR.UPDATE.VERSION.PATCH
let WebsiteVersion = "23.1.0.1";
//YEAR 23 UPDATE 1 VERSION 0 (INDEV) PATCH 1

let WebsiteURL =  new URL(window.location.href);

let CopyrightYear = "2022-2023";

//General stuff

function ErrorLog(errormsg) {
	console.error("WEBCODE ", errormsg);
	//alert is blocking
	alert("An error occured in the internal JavaScript code.\nMessage: "+errormsg+"\nCheck the JS console for more details.\nClick OK to refresh website.\n");
	location.reload();
}

function GetURLParam(param) {
	return WebsiteURL.searchParams.get(param);
}

function DetectIE() {
	//bypass if people *really* need to use IE
	if(GetURLParam("noieban") == 1) { return false; }
	let msie = window.navigator.userAgent.indexOf('MSIE ');
	let trident = window.navigator.userAgent.indexOf('Trident/');
	if (msie > 0 || trident > 0) {
		//msie set if IE10 or lower, trident if IE11

		let ieversion = "";
		if(msie > 0) {
			ieversion = window.navigator.userAgent.substring(msie + 5, window.navigator.userAgent.indexOf(';', msie + 5));
		}
		else {
			ieversion = 11;
		}
		console.error("Internet Explorer is not supported by this website.\nReported IE Version: "+String(ieversion));		
		
		document.body.innerHTML = "";
		document.body.style = "position: fixed;";
		infotext = document.createElement("p");
		infotext.id = "DontUseInternetExplorerPlease";
		infotext.innerHTML = 
		`Internet Explorer is not supported by this website.<br>
		Please use another (better) browser.<br>
		The website will show this message otherwise.<br>
		Version of IE reported: `+ieversion+`<br>Your user agent: `+window.navigator.userAgent+`<br>If you cannot switch to another brower, add ?noieban=1 after the end of the URL and reload.<br>`;
		document.body.appendChild(infotext);

		alert("No version of Internet Explorer is supported.\nPlease use another (better) browser.\n");
		return true;
	}
	return false;
}

//Cookie framework

function CookieWrite(key, value) {
	document.cookie = key+"="+value+";SameSite=lax;path=/;";
}

function CookieRead(key) {
	if(document.cookie.indexOf(key) == -1) {
		return -1;	
	}
	if(document.cookie.indexOf(";", document.cookie.indexOf(key) + key.length) == -1) {
		//no semicolon - only cookie!
		return document.cookie.substring(document.cookie.indexOf(key) + key.length + 1, document.cookie.length);
	}
	return document.cookie.substring(document.cookie.indexOf(key) + key.length + 1, document.cookie.indexOf(";", document.cookie.indexOf(key) + key.length));
}

function CookieBanner() {
	if(CookieRead("cookiebanner") == 1) {
		return;
	}
	
	//blur
	document.getElementById("bodywrapper").style = "filter: blur(10px); position: fixed;";
	document.getElementById("credits").style = "filter: blur(10px); display: none;";

	//create div
	popupElement = document.createElement("div");
	popupElement.id = "cookies";
	//weird formula - calculate half of remainder from div size - padding size - border size 
	popupElement.style = `
		position: fixed;
		background-color: #00007d;
		font-size: clamp(10px, 1.5vw, 20px);
		top: calc(((100% - min(70vw, 70vh)) / 2) - clamp(5px, 0.5vw, 10px) - 5px);
		left: calc(((100% - min(70vw, 70vh)) / 2) - clamp(5px, 0.5vw, 10px) - 5px);
		width: min(70vw, 70vh);
		height: min(70vw, 70vh);
		padding: clamp(5px, 0.5vw, 10px);
		border: 5px solid #ffffff;
	`;

	//create text
	titleBar = document.createElement("h");
	titleBar.innerHTML = "Cookies & You";
	popupElement.appendChild(titleBar);
	
	mainText = document.createElement("p");
	mainText.innerHTML = `
	This website uses necessary cookies for the full functionality of the website.
	The functionality which would not work without cookies includes (but is not limited to):
	<ul>
	<li>Saving whether or not this banner was accepted</li>
	<li>Saving which online apps on this website were used or not</li>
	<li>Saving preferences</li>
	<li>And more...</li>
	</ul>
	We do not use cookies for any tracking nor do we collect any peronsally identifiable data. There should not be any third-party tracking cookies.
	`;
	mainText.style = `
		padding-left: clamp(2px, 0.2vw, 5px); margin: 0;
		font-size: clamp(10px, min(1.5vw, 1.5vh), 15px);
	`;
	popupElement.appendChild(mainText);
	
	buttonUnderstand = document.createElement("button");
	buttonUnderstand.innerHTML = "I understand, continue.";
	buttonUnderstand.style = `
		position: fixed;
		bottom: calc(((100% - min(70vw, 70vh)) / 2) - clamp(5px, 0.5vw, 10px) - 5px);
		right: calc(((100% - min(70vw, 70vh)) / 2) - clamp(5px, 0.5vw, 10px) - 5px);
		font-size: clamp(10px, min(1.5vw, 1.5vh), 15px);
	`;
	buttonUnderstand.addEventListener("click", (event) => {
		CookieWrite("cookiebanner", 1);
		document.getElementById("cookies").remove();
		//unblur
		document.getElementById("bodywrapper").style = "";
		document.getElementById("credits").style = "";
	});
	
	popupElement.appendChild(buttonUnderstand);
	
	//append
	document.body.appendChild(popupElement);
}

//Dropdown buttons

function DropdownSetToIdle(element) {
	element.MartinWebInternalIsClicked = false;
	//button change
	btnElement = element.getElementsByTagName("button")[0];
	btnElement.style = "background-color: #ffffff; color: #00007d;";
	//img change
	imgElement = btnElement.getElementsByClassName("headerimage")[0];
	imgElement.src = "/assets/icons/dropdownB.png";
	imgElement.style = "transform: scaleY(1);";
	//make menu invisible
	conElement = element.getElementsByClassName("headerdropc")[0];
	conElement.style = "display: none;";
}
function DropdownSetToActive(element) {
	element.MartinWebInternalIsClicked = true;
	//button change
	btnElement = element.getElementsByTagName("button")[0];
	btnElement.style = "background-color: #00007d; color: #ffffff;";
	//img change
	imgElement = btnElement.getElementsByClassName("headerimage")[0];
	imgElement.src = "/assets/icons/dropdownW.png";
	imgElement.style = "transform: scaleY(-1);";
	//make menu visible
	conElement = element.getElementsByClassName("headerdropc")[0];
	conElement.style = "display: block;";
}

function DropdownInit(id) {
	elementToSetup = document.getElementById(id);
	//internal added field
	elementToSetup.MartinWebInternalIsClicked = false;
	
	elementToSetup.addEventListener("click", (event) => {
		if(event.currentTarget.MartinWebInternalIsClicked == false) {
			//close all others
			dropdowns = document.querySelectorAll(".headerdrop");
			for(let i = 0; i < dropdowns.length; i++) {
				if(dropdowns[i] != event.currentTarget) {
					DropdownSetToIdle(dropdowns[i]);
				}
			}
			//open ours
			DropdownSetToActive(event.currentTarget);
		}
		else {
			//close ours
			DropdownSetToIdle(event.currentTarget);
		}
	});
	elementToSetup.addEventListener("mouseenter", (event) => {
		DropdownSetToActive(event.currentTarget);
	});
	elementToSetup.addEventListener("mouseleave", (event) => {
		DropdownSetToIdle(event.currentTarget);
	});
}

//Menus

function Settings() {
	
}

function PrivacyPolicy() {
	
}

//Init

function InitWebpage() {
	//check for Internet Explorer
	if(DetectIE()) { return; }
	//populate variable fields
	copyrightyearfields = document.querySelectorAll(".copyrightyear");
	for(let i = 0; i < copyrightyearfields.length; i++) {
		copyrightyearfields[i].innerHTML = CopyrightYear;
	}
	webversionfields = document.querySelectorAll(".websiteversion");
	for(let i = 0; i < webversionfields.length; i++) {
		webversionfields[i].innerHTML = WebsiteVersion;
	}
	//setup dropdowns
	dropdowns = document.querySelectorAll(".headerdrop");
	if(dropdowns.length != 0) {
		for(let i = 0; i < dropdowns.length; i++) {
			DropdownInit(dropdowns[i].id);
		}
	}
	//cookies
	CookieBanner();
}
