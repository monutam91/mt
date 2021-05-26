export class EmptyNameError extends Error {
    constructor() {
        super('No name was provided or it only contained whitespaces!');
    }
}
