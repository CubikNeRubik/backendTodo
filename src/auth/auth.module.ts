import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CounterModule } from "../counter/counter.module";

import { CounterService } from "../counter/counter.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[
        JwtModule.register({ secret: jwtConstants.secret}),
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                imports:[CounterModule],
                useFactory:(counterService: CounterService) => {
                    const user = UserSchema;
                    
                    counterService.init(User.name) 
                    user.pre('save', async function(this: any) { 
                        this._id = await counterService.getNextId(User.name);
                    });
                   
                    return user;
                },
                inject: [CounterService],
            }
        ])
    ],
    exports: [JwtModule],
})

export class AuthModule{

}