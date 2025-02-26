
export default class TextEditor {
    private text!: string;
    private element!: string;

    constructor(element: string, cb: (e: any) => void) {
        this.element = element;
        const elementHtml = document.querySelector(this.element) as HTMLElement;
        this.text = elementHtml.textContent as string;
        elementHtml.contentEditable = 'true';

        elementHtml.addEventListener("input", e => {
            this.setText(elementHtml.textContent!);
            cb(elementHtml.textContent)
        })
    }

    public setText(text: string): void {
        this.text = text;
    }

    public getText(): string {
        return this.text;
    }
}