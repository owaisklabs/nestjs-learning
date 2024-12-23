import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator"

export class CreateTagDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "For example 'my-url'",
    })
    @IsString()
    @MaxLength(256)
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsJSON()
    schema?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(256)
    featureImageUrl?: string
}