//Variables

let OnlineApps = new Array();

OnlineApps.push({
	Name: "Escape from the Olomouc Region (old)",
	Description: "Original school version (1.00) of the game. No longer maintained.",
	Disabled: false,
	OnClick: "window.location.href='/game/escape_old'",
});
OnlineApps.push({
	Name: "Escape from the Olomouc Region",
	Description: "A game about escaping the Olomouc Region due to a Slovak rebellion. Includes minigames, achievements and support for multiple languages.",
	Disabled: true,
	OnClick: "window.location.href='/game/escape'",
});
OnlineApps.push({
	Name: "CNyIES",
	Description: "Christmas and New Year Information and Entertainment System - shows music, countdown to the New Year and some other things",
	Disabled: false,
	OnClick: "window.location.href='/apps/cnyies'",
});
OnlineApps.push({
	Name: "Railpexeso",
	Description: "Pexeso, with trains!",
	Disabled: false,
	OnClick: "window.location.href='/game/railpexeso'",
});
OnlineApps.push({
	Name: "Polish Pronunciation Program",
	Description: "Basic program for training pronunciation of nasal vowels ą and ę, among other things.",
	Disabled: false,
	OnClick: "window.location.href='/apps/polish'",
});

//ids of online apps which are featured
//currently Railpexeso and CNyIES
let FeaturedApps = [2, 3];

//Functions

function GenerateOnlineApps() {
	for(let i = 0; i < OnlineApps.length; i++) {
		let elem = document.createElement("div");
		elem.className = "gridmember";
		
		let headerelem = document.createElement("h2");
		headerelem.innerHTML = OnlineApps[i].Name;
		elem.appendChild(headerelem);
		
		let pelem = document.createElement("p");
		pelem.innerHTML = OnlineApps[i].Description;
		elem.appendChild(pelem);
		
		let buttonelem = document.createElement("button");
		buttonelem.className = "gridmemberbutton";
		buttonelem.setAttribute("onclick", OnlineApps[i].OnClick);
		buttonelem.setAttribute("ontouchend", OnlineApps[i].OnClick);
		if(OnlineApps[i].Disabled) {
			buttonelem.innerHTML = "Soon";
			buttonelem.disabled = true;
		}
		else {
			buttonelem.innerHTML = "Open";
		}
		elem.appendChild(buttonelem);
		
		document.getElementById("appsmenu").appendChild(elem);	
	}
}

function GenerateFeaturedApps() {
	let target = document.getElementById("newapps");
	FeaturedApps.forEach((val) => {
		let madeElem = document.createElement("span");
		madeElem.innerHTML = 
		"<h3>"+OnlineApps[val].Name+"</h3><p>"+OnlineApps[val].Description+"</p>";

		let btn = document.createElement("button");
		btn.innerHTML = "Open";
		btn.setAttribute("onclick", OnlineApps[val].OnClick);
		madeElem.appendChild(btn);

		madeElem.appendChild(document.createElement("br"));
		madeElem.appendChild(document.createElement("hr"));

		target.appendChild(madeElem);
	});
}
