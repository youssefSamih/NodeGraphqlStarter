import { Service } from "typedi";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Investment as InvestmentType, CreateInvestmentInput } from "@_types/investment.types";
import Investment, { IInvestment } from "@models/investment.model";
import { InvestmentNotFoundError } from "@errors/investment.error";

@Service()
@Resolver(InvestmentType)
export class InvestmentResolver {
    @Query(() => InvestmentType)
    async getById(
        @Arg('id') id: string,
    ): Promise<IInvestment> {
        const one = await Investment.findById(id);
        if (!one) {
            throw new InvestmentNotFoundError(id);
        }
        return (one as any).json;
    }

    @Query(() => [InvestmentType])
    async all(
        @Arg('limit') limit: number,
        @Arg('skip') skip: number
    ): Promise<any[]> {
        const list = await Investment.find({}).skip(skip || 0).limit(limit || 10);
        return list.map(one => (one as any).json());
    }

    @Mutation(() => InvestmentType)
    async createInvestment(
        @Arg('data') data: CreateInvestmentInput,
    ): Promise<any> {
        let entity = new Investment(data);
        entity = await entity.save();

        return (entity as any).json();
    }
};