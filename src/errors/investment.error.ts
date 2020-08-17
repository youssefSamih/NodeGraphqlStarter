export class InvestmentNotFoundError extends Error {
    constructor(id: string) {
        super();
        this.message = `Investment with the ID '${id}' was not found`
    }
}