
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    descreption: string
    @IsString()
    @IsNotEmpty()
    url: string

}


// userId       Int //like "foreign key"
// user         User           @relation(fields: [userId], references: [id])
// orderdetails OrderDetails[]


