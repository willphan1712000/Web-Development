interface IUploadFile {
    createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D];
    drawImage(e: any, ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, angle: number, canvas: HTMLCanvasElement, containerWidth: number, containerHeight: number): [CanvasRenderingContext2D, string, string];
    drawColor(type: string, color: string, ctx: any, width: number, ratio :number): [CanvasRenderingContext2D, string]
}

export default class UploadFile implements IUploadFile {
    private $ele1!: JQuery<HTMLElement>; // upload button
    private $ele2!: JQuery<HTMLElement>; // input tag

    constructor(ele1: string, cb: (e:string) => void) {
        this.$ele1 = $(ele1);
        this.$ele1.after(`<input type="file" id="" name="" hidden>`);
        this.$ele2 = this.$ele1.siblings('input');
        this.openFile();

        this.$ele2.on("input", e => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (readerEvent) => {
                    const imgElement = document.createElement("img");
                    imgElement.src = readerEvent.target?.result as string;
                    imgElement.onload = (imgEvent) => {
                        cb((imgEvent.target as HTMLImageElement).src);
                    };
                };
            }
        })
    }

    private openFile(): void {
        this.$ele1.click(e => {
            e.stopPropagation();
            this.$ele2.click();
        });
    }

    public createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = width
        canvas.height = height
        return [canvas, ctx!]
    }

    // public drawImage(e: any, x: number, y: number, scale: number, angle: number, canvasWidth: number, canvasHeight: number, containerWidth: number, containerHeight: number): [string, any] {
    //     const canvas = document.createElement("canvas");
    //     canvas.width = canvasWidth;
    //     canvas.height = canvasHeight;
    //     const ctx = canvas.getContext("2d");

    //     if (!ctx) {
    //         throw new Error("Unable to get canvas context");
    //     }

    //     const ratioX = canvasWidth / containerWidth;
    //     const ratioY = canvasHeight / containerHeight;
    //     const finalX = x * ratioX;
    //     const finalY = y * ratioY;
    //     const midleWidth = e.width * ratioX;
    //     const midleHeight = e.height * ratioY;
    //     const finalWidth = e.width * ratioX * scale;
    //     const finalHeight = e.height * ratioY * scale;

    //     ctx.translate(finalX + midleWidth / 2, finalY + midleHeight / 2);
    //     ctx.rotate((angle * Math.PI) / 180);
    //     ctx.drawImage(e, -finalWidth / 2, -finalHeight / 2, finalWidth, finalHeight);
    //     const srcEncoded = ctx.canvas.toDataURL(e).split(",")[1];
    //     return [srcEncoded, ctx];
    // }

    public drawImage(e: any, ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, angle: number, canvas: HTMLCanvasElement, containerWidth: number, containerHeight: number): [CanvasRenderingContext2D, string, string] {
        const ratioX = canvas.width/containerWidth
        const ratioY = canvas.height/containerHeight
        let finalX = x*ratioX
        let finalY = y*ratioY
        let midleWidth = e.width*ratioX
        let midleHeight = e.height*ratioY
        let finalWidth = e.width*ratioX*scale
        let finalHeight = e.height*ratioY*scale

        ctx.save()
        ctx.translate(finalX + midleWidth/2, finalY + midleHeight/2)
        ctx.rotate((angle*Math.PI)/180)
        ctx.drawImage(e, -finalWidth/2, -finalHeight/2, finalWidth, finalHeight);
        ctx.restore()
        const src = ctx.canvas.toDataURL(e)
        const srcEncoded = ctx.canvas.toDataURL(e).split(",")[1]
        return [ctx, src, srcEncoded];
    }

    public drawColor(type: string, color: string, ctx: any, width: number, ratio :number): [CanvasRenderingContext2D, string] {
        if(type === "") color = "#ffffff"
        if(type === "gradient") {
            const breakdownArr = color.split(",")
            var [angle, color1, percent1, color2, percent2] = [Number(breakdownArr[0]), breakdownArr[1], Number(breakdownArr[2]), breakdownArr[3], Number(breakdownArr[4])]
            const radians = (angle - 180) * Math.PI / 180
            const x0 = width / 2 + (width / 2) * Math.cos(radians - Math.PI / 2);
            const y0 = width*ratio / 2 + (width*ratio / 2) * Math.sin(radians - Math.PI / 2);
            const x1 = width / 2 - (width / 2) * Math.cos(radians - Math.PI / 2);
            const y1 = width*ratio / 2 - (width*ratio / 2) * Math.sin(radians - Math.PI / 2);
            const gradient = ctx.createLinearGradient(x0, y0, x1, y1)
            gradient.addColorStop(percent1/100, color1)
            gradient.addColorStop(percent2/100, color2)
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, width * ratio)
            const srcEncoded = ctx.canvas.toDataURL().split(",")[1]
            return [ctx, srcEncoded]
        } else {
            ctx.fillStyle = color
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            const srcEncoded = ctx.canvas.toDataURL().split(",")[1]
            return [ctx, srcEncoded]
        }
    }
}