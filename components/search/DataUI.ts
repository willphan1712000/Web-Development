import { $$$ } from "../../WW";

interface Data {
    [key: number]: {
        [key: string]: string
    }
}

export default class DataUI {
    private url: string
    constructor(url: string) {
        this.url = url;
    }
    public async getData(options: Object): Promise<Data> {
        const data = await $$$(this.url, options).api().post() as Data;
        // add bio, admin, and delete for each user
        for(const i in data) {
            data[i].a = '<a target="_blank" href="/'+data[i].username+'" style="color: #000;">Bio</a>'
            data[i].admin = '<a target="_blank" href="/'+data[i].username+'/admin" style="color: #000;">Admin</a>'
            data[i].delete = '<button value="'+data[i].username+'">Delete</button>'
        }
        return data;
    }
}