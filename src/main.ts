
class Thought {
	public text: string;
	public made: string;
	public id: number;

	constructor(text: string, id: number, made?: string) {
		this.text = text;
		this.made = made || JSON.stringify(new Date());
		this.id = id;
	}

	public render(): void {
		let wrapper: Element = document.querySelector(".thoughts");
		let thoughtHtml: string = `
		<div class='thought' data-id='${this.id}'>
			<h3 class='thoughtTitle'>
				<span class='id'>#${this.id.toString().padStart(3, "0")}</span>
				<a class='delete' href='javascript:void(0)'>Delete</a>
			</h3>
			<p class='content'>${this.text}</p>
			<!--<a class='delete' href='javascript:void(0)'>Delete</a> <span class='id'>#${this.id.toString().padStart(3, "0")}</span> <span>${this.text}</span>-->
		</div>
		`;
		let node: Element = parseHtml(thoughtHtml);
		
		node.querySelector(".delete")
		  .addEventListener("click", () => {
			if(confirm(`Delete #${this.id.toString().padStart(3, "0")}?`)) this.delete();
		  });
		
		if(wrapper.children.length > 0) {
			wrapper.insertBefore(node, wrapper.children[0]);
		} else {
			wrapper.appendChild(node);
		}
	}

	public delete(): void {
		thoughts = thoughts.filter(t => t.id !== this.id);
		document.querySelectorAll(`[data-id="${this.id}"]`).forEach(el => el.remove());
		setStorage();
	}



}
let thoughts: Thought[] = [];

function parseHtml(html: string): Element {
	let div = document.createElement("div");
	div.innerHTML = html;
	return div.children[0];
}

function getNewId(): number {
	let largest: number = -1;
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

function setStorage(): void {
	localStorage.setItem("thoughts", JSON.stringify(thoughts));
}

window.addEventListener("load", init);