import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CounterModule } from "../counter/counter.module";

import { CounterService } from "../counter/counter.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from "./user.schema";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const list = UserSchema;
                    
                    counterService.init(User.name) 
                    list.pre('save', async function(this: any) {
                        const id = await counterService.replaceId(User.name);
                        console.log('presave', id)
                        this._id = id;  
                    });
                   
                    return list;
                },
                inject: [CounterService],
            }
        ])
    ],
    // imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})

export class AuthModule{

}