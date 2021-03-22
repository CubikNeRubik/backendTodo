import { Document } from 'mongoose';
export declare type ListDocument = List & Document;
export declare class List {
    id: number;
    isComplete: boolean;
    text: string;
    time: number;
    selected: boolean;
}
export declare const ListSchema: import("mongoose").Schema<Document<List, {}>, import("mongoose").Model<any, any>, undefined>;
