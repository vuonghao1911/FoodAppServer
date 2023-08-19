import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class GetUserNoteDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsNotEmpty()
    avar: string
}