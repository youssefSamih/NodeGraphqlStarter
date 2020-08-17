import { Document, Types, Schema, model } from "mongoose";
import config from "@config/index";
import { Investment } from "@_types/investment.types";
import { IDeferred } from "@interfaces/app.interfaces";

function getDeferFromId(key: string): IDeferred | undefined {
    return key ? {
        key,
        uri: `/files/${key}/view`
    } : undefined;
}

export interface IInvestment extends Document {
    title: string;
    description: string;
    type: string;
    propertyType: string;
    strategy: string;
    Intro: {
        text: string;
        images: Types.ObjectId[];
    };
    fund: {
        goal?: number;
        current: number;
    };
    sponsor: {
        description: string;
    };
    image: Types.ObjectId;
    summaries: {
        title: string;
        pdf: Types.ObjectId;
    }[];
}

const InvestmentSchema: Schema = new Schema({
    title: { type: String },
    description: { type: String },
    type: { type: String },
    propertyType: { type: String },
    strategy: { type: String },
    Intro: {
        text: {
            type: String,
            default: '',
        },
        images: {
            type: [{ type: Types.ObjectId, ref: 'File' }],
            default: [],
        },
    },
    fund: {
        goal: Number,
        current: Number
    },
    sponsor: {
        description: {
            type: String
        }
    },
    image: { type: Types.ObjectId, ref: 'File' },
    summaries: [{
        title: { type: String },
        pdf: { type: Types.ObjectId, ref: 'File' }
    }],
}, config.lib.mongoose);

InvestmentSchema.virtual('fund.percentage')
                .get(function onGetPercentage(this: IInvestment): number {
                    const { current = 0, goal= 0 } = this.fund || {};
                    return goal === 0 ? 0 : +(current / goal).toFixed(2);
                });
InvestmentSchema.methods.json = function json(this: IInvestment): Investment {
    const json = this.toJSON({ virtuals: true });
    return {
        ...json,
        image: getDeferFromId(json?.image),
        Intro: {
            ...json.intro,
            images: json.intro.images.map(getDeferFromId),
        },
        summaries: json.summaries
            .map((s: any) => ({ title: s?.title, pdf: getDeferFromId(s?.pdf) }))
    }
};

export default model<IInvestment>('Investment', InvestmentSchema);