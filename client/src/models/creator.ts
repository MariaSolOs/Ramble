export interface Creatable {
    readonly bio?: string;
    readonly user: {
        readonly name: string;
        readonly photo: string;
    };
}

export class Creator {
    constructor(private data: Creatable) {}

    get bio() { return this.data.bio; }
    get name() { return this.data.user.name; }
    get photo() { return this.data.user.photo; }
}