export class FoodItem {
    public name: string;
    public brand: string;
    public quantity: number;
    public size: string;
    public expDate: Date;
    public location: string;
    public storageType: string;
    public tags: string[];

    constructor(name: string, brand: string, quantity: number, size: string, expDate: Date, location: string, storageType: string, tags: string[]) {
        this.name = name;
        this.brand = brand;
        this.quantity = quantity;
        this.size = size;
        this.expDate = expDate;
        this.location = location;
        this.storageType = storageType;
        this.tags = tags;
    }
}