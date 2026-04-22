export class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    getItems() {
        return this.items;
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
}
