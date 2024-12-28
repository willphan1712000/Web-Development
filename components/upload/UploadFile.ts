import FileType from "./filetype";

export default class UploadFile {
    private $ele1!: JQuery<HTMLElement>; // upload button
    private $ele2!: JQuery<HTMLElement>; // input tag

    constructor(ele1: string, cb: ({e, error}: {e: string, error: boolean}) => void, type: FileType) {
        this.$ele1 = $(ele1);
        this.$ele1.after(`<input type="file" hidden accept="${type}">`);
        this.$ele2 = this.$ele1.siblings('input');
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

    private openFile(): void {
        this.$ele1.click(e => {
            e.stopPropagation();
            this.$ele2.click();
        });
    }
}