import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Benefit} from "./benefit.entity";
import {BenefitsService} from "./benefits.service";
import {BenefitsController} from "./benefits.controller";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Benefit]),
        forwardRef(() => UsersModule)
    ],
    controllers: [BenefitsController],
    providers: [BenefitsService],
    exports: [BenefitsService],
})
export class BenefitsModule{}