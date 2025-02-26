import { $$$ } from "../../WW";
import Response from "../Response";

export default class DataUI {
    private url: string
    constructor(url: string) {
        this.url = url;
    }
    public async getData(options: Object): Promise<Response> {
        const data = await $$$(this.url, options).api().post() as Response;
        // add bio, admin, and delete for each user

        if(data.success) {
            for(const i in data.data) {
                data.data![i].Bio = '<a target="_blank" href="/'+data.data![i].username+'" style="color: #000;">Bio</a>'
                data.data![i].admin = '<a target="_blank" href="/'+data.data![i].username+'/admin" style="color: #000;">Admin</a>'
                data.data![i].delete = '<button value="'+data.data![i].username+'">Delete</button>'
            }
        } else {
            throw new Error(data.error)
        }
        return data;
    }
}