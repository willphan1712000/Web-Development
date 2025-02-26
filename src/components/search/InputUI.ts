import SearchUI from "./SearchUI";

export default class InputUI {
    private $input: JQuery<HTMLInputElement>;
    private value: string;

    constructor(input: string, searchUI: SearchUI) {
        this.$input = $(input);
        this.value = "";
        this.$input.on("input", e => {
            this.value = e.target.value;
            searchUI.update();
        })
    }

    public getValue(): string {
        return this.value
    }
}