export class ListaItem {
    desrciption: string;
    completed: boolean;

    constructor(description: string) {
        this.desrciption = description;
        this.completed = false;
    }
}
