
export class Thought {
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
			<p>${this.text}<p>
		</div>
		`;
		wrapper.innerHTML = `${thoughtHtml}${wrapper.innerHTML}`;

	}

}