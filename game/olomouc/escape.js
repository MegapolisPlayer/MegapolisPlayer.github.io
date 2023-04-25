const Canvas = document.getElementById("EscapeCanvas")
const CanvasContext = Canvas.getContext("2d");
CanvasContext.font = "48px Arial";
CanvasContext.fillStyle = "#333399";

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = drawImage;

function drawImage() {
    CanvasContext.drawImage(this, 0, 0, this.width, this.height);
    CanvasContext.fillText("Útěk z Olomouckého kraje", 50, 50);
}

//Button object

class Button {
    constructor(xoffset, yoffset, width, height, fontsize, text, callbackname) {
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.width = width;
        this.height = height;
        this.fontsize = fontsize;
        this.text = text;
        this.callbackname = callbackname;
    }
    
    //id of element where to insert as string
    insert(id) {
		let NewButton = document.createElement("button");
		NewButton.setAttribute("class", "CanvasButton");
		NewButton.setAttribute("id", this.text);
		NewButton.setAttribute("onclick", this.callbackname+"()");
		NewButton.style.setProperty("width", this.width+"px");
		NewButton.style.setProperty("height", this.height+"px");
		NewButton.style.setProperty("left", this.xoffset+"px");
		NewButton.style.setProperty("top", this.yoffset+"px");
		NewButton.style.setProperty("font-size", this.fontsize+"px");
		let NewButtonText = document.createTextNode(this.text);
		NewButton.appendChild(NewButtonText);
		document.getElementById(id).appendChild(NewButton);
    }
};

//Audio player

class AudioPlayer {
	constructor() {
		this.audioTracks = [];
		this.audioTracks.push(new Audio("res/music/Stormfront.mp3"));
		this.audioTracks.push(new Audio("res/music/Faceoff.mp3"));
		this.audioTrackCounter = 0;
	}
	playNextTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[(this.audioTrackCounter) - 1].pause();
		}
		this.audioTracks[this.audioTrackCounter].play();
		this.audioTrackCounter++;
	}
	resetTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[this.audioTrackCounter - 1].pause();
			this.audioTracks[this.audioTrackCounter - 1].currentTime = 0;
			this.audioTracks[this.audioTrackCounter - 1].play();
		}
	}
};
const ap = new AudioPlayer();

function PlayButtonRegister() {
    console.log("Registered PLAY Button press!");
	CanvasContext.fillStyle = "black";
	CanvasContext.fillRect(0, 0, Canvas.width, Canvas.height);
	CanvasContext.fillStyle = "white";
	CanvasContext.fillText("Backstory", 50, 50);
	
}
function SettingsButtonRegister() {
    console.log("Registered SETTINGS Button press!");
}
function CreditsButtonRegister() {
    console.log("Registered CREDITS Button press!");
}

let mainMenuButtons = [];
mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "ap.playNextTrack"));
mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "ap.resetTrack"));
mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "PlayButtonRegister"));
mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "SettingsButtonRegister"));
mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "CreditsButtonRegister"));

for(let i = 0; i < mainMenuButtons.length; i++) {
	mainMenuButtons[i].insert("canvas_container");
}

