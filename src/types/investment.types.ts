import { ObjectType, Field, ID, InputType } from "type-graphql";
import { IDeferred } from '@interfaces/app.interfaces';

@ObjectType()
export class Deferred {
    @Field()
    key: string | undefined;
    
    @Field()
    uri: string | undefined;
}

@ObjectType()
export class Introduction {
    @Field()
    text: string | undefined;

    @Field(() => [Deferred])
    images: IDeferred[] | undefined
}

@ObjectType()
@InputType('CreateFund')
export class Fund {
    @Field()
    goal: string | undefined;
    
    @Field()
    current: number | undefined;

    @Field({ nullable: true })
    percentage?: number;
}

@ObjectType()
@InputType('CreateSponsor')
export class Sponsor {
    @Field()
    description: string | undefined;
}

@ObjectType()
export class Summary {
    @Field()
    title: string | undefined;

    @Field(() => Deferred)
    pdf: Deferred | undefined;
}

@ObjectType()
export class Investment {
    @Field(() => ID)
    id: number | undefined;

    @Field({ nullable: false })
    type: string | undefined;

    @Field({nullable: true})
    description: string | undefined;

    @Field({ nullable: false })
    propertyType: string | undefined;

    @Field({ nullable: false })
    strategy: string | undefined;

    @Field(() => Introduction)
    Intro: Introduction | undefined;
    
    @Field(() => Fund)
    fund: Fund | undefined;

    @Field({ nullable: false })
    sponsor?: Sponsor

    @Field(() => Deferred)
    image?: Deferred;

    @Field(() => [Summary])
    summaries: Summary[] | undefined;
}

@InputType()
export class CreateIntroduction {
    @Field()
    text: string | undefined;
    
    @Field()
    images: string[] | undefined
}

@InputType()
export class CreateSummary {
    @Field()
    title: string | undefined;

    @Field(() => String)
    pdf: string | undefined;
}

@InputType({ description: 'Create new investment' })
export class CreateInvestmentInput {
    @Field()
    title: string | undefined;

    @Field()
    type: string | undefined;

    @Field()
    propertyType: string | undefined;

    @Field()
    strategy: string | undefined;

    @Field(() => CreateIntroduction)
    intro: CreateIntroduction | undefined;

    @Field(() => Fund)
    fund: Fund | undefined;

    @Field(() => Sponsor)
    sponsor: Sponsor | undefined;

    @Field()
    image: string | undefined;

    @Field(() => [CreateSummary])
    summaries: CreateSummary[] | undefined;
}