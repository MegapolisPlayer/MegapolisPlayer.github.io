let OnlineApps = new Array();

OnlineApps.push({
	Name: "Escape from the Olomouc Region",
	Description: "A game about escaping the Olomouc Region due to a Slovak rebellion. Includes minigames, achievements and support for multiple languages.",
	Disabled: false,
	OnClick: "window.location.href='/game/escape'",
});

OnlineApps.push({
	Name: "RozvrhInfo",
	Description: "Informs when and where is the next class and sends notifications accordingly. Works only for some schools for now.",
	Disabled: false,
	OnClick: "window.location.href='/apps/rozvrhinfo'",
});

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
