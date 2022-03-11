export class searchFields {
    constructor(public name: string, public brand: string, public expDate: string, public quantity: number, public tags: string[]) {
        this.name = name;
        this.brand = brand;
        this.expDate = expDate;
        this.quantity = quantity;
        this.tags = tags;
    }
}