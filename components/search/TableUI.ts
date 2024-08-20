import { $$, AddIntersectionObserver, Table } from "../../W";
import { $$$ } from "../../WW";
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
    private header: Object;
    private html: any;

    constructor(container: string, header: Object, target: string, limit: number, like: number, url: string, html: any) {
        this.tableContainer = container;
        this.target = target;
        this.limit = limit;
        this.like = like;
        this.header = header;
        this.dataUI = new DataUI(url);
        this.html = html;
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
            like: this.like
        })

        // create initial table
        const table = $$(this.tableContainer,this.header).table().addHeader();
        this.addRow(table, data, false);
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
                   offset: limit * o.getCount()
               });
               this.addRow(table, data, true);
            }
        }).addIntersectionObserver().observe();
        return o;
    }

    public addRow(table: Table | undefined, data: Data, search: boolean) {
        table!.addRow(data);
        this.handleClick(search);
    }

    private handleClick(search: boolean) {
        const html = this.html;
        if(search) {
            $(html.button).off("click", e => {
                return null;
            });
            $(html.confirm).off("click", e => {
                return null;
            });
            $(html.back).off("click", e => {
                return null;
            });
        }

        $(html.button).click(function(e) {
            $(html.parent).addClass("active")
            let currentUsernameElement = e.currentTarget as HTMLInputElement;
            let currentUsernameValue = "";
            currentUsernameValue = currentUsernameElement.value;
            
            $(html.confirm).click(async function() {
                const r = await $$$("/data/api/deleteAccount.php", {
                    username: currentUsernameValue,
                }).api().post();
                if(r) {
                    location.reload();
                }
            })

            $(html.back).click(() => {
                $(html.parent).removeClass("active");
                currentUsernameValue = "";
            });
        })
   }
}