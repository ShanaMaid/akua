export default class Akua {
    private stack;
    private separator;
    private isValidTag;
    checkParent(parent: string): boolean;
    parse(): this;
    inject(condition: boolean, tag: string, func: () => void): this;
    constructor();
}
