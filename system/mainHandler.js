//General stuff

function ErrorLog(errormsg) {
	console.error("WEBCODE ", errormsg);
	//alert is blocking
	alert("An error occured in the internal JavaScript code.\nCheck the JS console for more details.\nClick OK to refresh website.\n");
	location.reload();
}

//Cookie framework

//Dropdown buttons

function DropdownInit(id) {
	elementToSetup = document.getElementById(id).getElementsByTagName("button")[0];

	elementToSetup.addEventListener("mouseenter", (event) => {
		element = event.target.getElementsByClassName('headerdroparrow')[0];
		element.src = 'assets/icons/dropdownW.png';
		element.style = 'transform: scaleY(-1);';
	});
	elementToSetup.addEventListener("mouseleave", (event) => {
		element = event.target.getElementsByClassName('headerdroparrow')[0];
		element.src = 'assets/icons/dropdownB.png';
		element.style = 'transform: scaleY(1);';
	});
}

//Init

function InitWebpage() {
	//setup dropdowns
	dropdowns = document.querySelectorAll(".headerdrop");
	if(dropdowns.length != 0) {
		for(let i = 0; i < dropdowns.length; i++) {
			DropdownInit(dropdowns[i].id);
		}
	}
}
