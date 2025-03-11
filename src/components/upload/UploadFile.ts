import $ from 'jquery';
import FileType from "./filetype";

class UploadFile {
    private $ele1!: JQuery<HTMLElement>; // upload button
    private $ele2!: JQuery<HTMLElement>; // input tag

    constructor(ele1: HTMLElement, cb: ({e, error}: {e: string, error: boolean}) => void, type: FileType) {
        this.$ele1 = $(ele1);

        const inputElement = document.createElement("input")
        inputElement.id = 'hello'
        inputElement.type = 'file'
        inputElement.style.display = 'none'
        inputElement.accept = type

        this.$ele1.after(inputElement);

        this.$ele2 = $(inputElement)
        this.openFile();

        this.$ele2.on("input", e => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const fileType = file.type;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (readerEvent) => {
                    const imgElement = document.createElement("img");
                    imgElement.src = readerEvent.target?.result as string;
                    imgElement.onload = (imgEvent) => {
                        cb({
                            e: (imgEvent.target as HTMLImageElement).src,
                            error: this.isValidType(fileType, type)
                        });
                    };
                };
            }
            target.value = ''
        })
    }

    private isValidType(fileType: string, validType: string): boolean {
        return fileType.split("/")[0] === validType.split("/")[0]
    }

    private handleClick = (e: any) => {
        e.stopPropagation();
        this.$ele2.click();
    }

    private openFile(): void {
        this.$ele1.click(this.handleClick)
    }

    public cleanup(): void {
        this.$ele1.off('click', this.handleClick)
        this.$ele2.remove()
    }
}

export default UploadFile