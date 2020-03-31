
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
