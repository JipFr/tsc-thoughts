
function getNewId(): number {
	let largest = -1;
	for(let thought of thoughts) {
		if(thought.id > largest) {
			largest = thought.id;
		}
	}
	return largest + 1;
}

function parseThoughts(): void {
	let tmp = JSON.parse(localStorage.getItem("thoughts"));
	console.log(tmp);
	for(let thought of tmp) {
		thoughts.push(new Thought(
			thought.text, 
			thought.id || getNewId(), 
			thought.made
		));
	}
}

function renderThoughts() {
	for(let thought of thoughts) {
		thought.render();
	}
}

function init(): void {
	if(localStorage.getItem("thoughts") === null) {
		localStorage.setItem("thoughts", "[]");
	}

	document.querySelector(".submitThoughtButton")
	  .addEventListener("click", submitThought);

	document.querySelector(".newThoughtInput")
	  .addEventListener("keyup", (evt: KeyboardEvent) => {
		  if(evt.key === "Enter") submitThought();
	  });

	parseThoughts();
	renderThoughts();
}

function submitThought(): void {
	console.log("Submitting");
	let input: HTMLInputElement = document.querySelector(".newThoughtInput");
	let text: string = input.value.trim();
	let id: number = getNewId();
	if(text.length > 0) {
		input.value = "";
		let thought = new Thought(text, id);
		thoughts.push(thought);
		setStorage();
		thought.render();
	}
	
}

function parseHtml(html: string): Element {
	let div = document.createElement("div");
	div.innerHTML = html;
	return div.children[0];
}

function setStorage(): void {
	localStorage.setItem("thoughts", JSON.stringify(thoughts));
}

window.addEventListener("load", init);