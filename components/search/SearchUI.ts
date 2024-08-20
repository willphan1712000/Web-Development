import { AddIntersectionObserver, Table } from "../../W";
import DataUI from "./DataUI";
import InputUI from "./InputUI";
import TableUI from "./TableUI";

export default class SearchUI {
    private inputUI: InputUI;
    private tableUI: TableUI;
    private dataUI: DataUI;
    private table: Table | undefined;
    private observer: AddIntersectionObserver | undefined;

    constructor(input: string ,tableProps: any) {
        this.inputUI = new InputUI(input, this);
        this.tableUI = new TableUI(tableProps.container, tableProps.header, tableProps.target, tableProps.limit, tableProps.like, tableProps.url, tableProps.html);
        this.dataUI = new DataUI(tableProps.url);
        this.createTable();
        
    }

    async createTable() : Promise<void> {
        this.table = await this.tableUI.initilize();
        this.observer = this.tableUI.addObserver(this.table);
    }

    async update() : Promise<void> {
        const v = this.inputUI.getValue()
        const data = await this.dataUI.getData({
            limit: this.tableUI.getLimit(),
            like: v
        })

        if(v === "") {
            this.observer?.resetCount();
            this.observer?.observe();
        } else {
            this.observer?.unobserve();
        }

        this.table?.empty();
        this.tableUI.addRow(this.table, data, true);
    }
}