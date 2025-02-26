import { $$, AddIntersectionObserver, Table } from "../..";
import { $$$ } from "../../WW";
import Response from "../Response";
import DataUI from "./DataUI";

interface ITableUI {
    initilize(): Promise<Table>;
    addObserver(table: Table): AddIntersectionObserver;

}
interface Data {
    [key: number]: {
        [key: string]: string
    }
}
export default class TableUI implements ITableUI {
    private tableContainer: string;
    private target: string;
    private limit: number;
    private like: number;
    private dataUI: DataUI;
    private html: any;
    private url : {
        get: string,
        delete: string
    }

    constructor(container: string, target: string, limit: number, like: number, url: {
        get: string,
        delete: string
    }, html: any) {
        this.tableContainer = container;
        this.target = target;
        this.limit = limit;
        this.like = like;
        this.dataUI = new DataUI(url.get);
        this.html = html;
        this.url = url
    }
    public getLimit(): number {
        return this.limit;
    }
    public setLimit(limit: number) : void {
        this.limit = limit;
    }
    public async initilize(): Promise<Table> {
        const data = await this.dataUI.getData({
            limit: this.limit,
            like: this.like,
            username: 'Allinclicks'
        })

        // create initial table
        const table = $$(this.tableContainer, data.data).table().addHeader();
        this.addRow(table, data.data!);
        return table;
    }
    public addObserver(table: Table): AddIntersectionObserver {
        const limit = this.limit;
        const o = $$(this.target, {
            threshold: 1
        }, async (e : boolean) => {
            if(e) {
                o.increaseCount();
                const data = await this.dataUI.getData({
                   limit,
                   offset: limit * o.getCount(),
                   username: 'Allinclicks'
               });
               this.addRow(table, data.data!);
            }
        }).addIntersectionObserver().observe();
        return o;
    }

    public addRow(table: Table | undefined, data: Data) {
        table!.addRow(data);
        this.handleClick();
    }

    private handleClick() {
        const html = this.html;
        $(html.button).off("click", undefined);
        $(html.confirm).off("click", undefined);
        $(html.back).off("click", undefined);

        const state:{
            currentUsernameValue?: string
        } = {currentUsernameValue: undefined} 

        $(html.button).click(e =>  {
            $(html.parent).addClass("active")
            let currentUsernameElement = e.currentTarget as HTMLInputElement;
            state.currentUsernameValue = currentUsernameElement.value;
        })
        $(html.confirm).click(async () => {
            const r = await $$$(this.url.delete, {
                username: state.currentUsernameValue,
                key: process.env.SYSTEM_SECRET_KEY
            }).api().post() as Response

            if(r.success) {
                location.reload();
            } else {
                alert(r.error)
            }
        })

        $(html.back).click(() => {
            $(html.parent).removeClass("active");
            state.currentUsernameValue = "";
        });
   }
}