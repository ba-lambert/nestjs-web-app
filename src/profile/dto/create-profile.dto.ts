import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    fullnames: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phoneNo: number;

}
