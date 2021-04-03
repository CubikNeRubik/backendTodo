import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenVerifyConfig } from "../common/constants";
import { DataModule } from "src/data/data.module";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[
        JwtModule.register(AccessTokenVerifyConfig),
        DataModule,
    ],
    exports: [JwtModule],
})

export class AuthModule{

}