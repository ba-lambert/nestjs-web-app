import { IsEnum, IsString, Length, Matches } from "class-validator";
import { Role } from "../entities/auth.entity";

export class CreateAuthDto {
    @IsString()
    @Length(1,255)
    username:string;
    @IsString()
    @Length(6, 255)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
    password: string;
    @IsEnum(Role)
    role:Role;
}
