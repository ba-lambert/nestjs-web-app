import { IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    comment:string;
    post:any;
    likes:[]
}
