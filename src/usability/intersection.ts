
type Options = {
    root?: | Element | Document,
    rootMargin?: string,
    threshold?: number | number[]
}

type CB = (entry: IntersectionObserverEntry, count: number) => void

class AddIntersectionObserver {
    private observer: any;
    private count: number;

    constructor(options: Options, cb: CB) {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                cb(entry, this.count);
            })
        }, options)
        this.count = 0;
    }

    public observe(target: HTMLElement | null) : this {
        if(!target)
            throw new Error("Target element is undefined")

        this.observer.observe(target);
        return this;
    }

    public unobserve(target: HTMLElement | null) : this {
        if(!target)
            throw new Error("Target element is undefined")
        
        this.observer.unobserve(target);
        return this;
    }

    public increaseCount() : void {
        this.count++;
    }

    public resetCount(): void {
        this.count = 0;
    }

    public getCount() : number {
        return this.count;
    }
}

export default function useIntersectionObserver(options: Options, cb: CB) {
    return new AddIntersectionObserver(options, cb)
}