export class Storage<T> {
    private items: T[] = [];
    public addItem(item: T): void {
        this.items.push(item);
    }
    public getItems(): T[] {
        return this.items;
    }
    public removeItem(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }
}