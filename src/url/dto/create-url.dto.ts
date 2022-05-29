import { IsNotEmpty } from "class-validator";

export class CreateUrlDto {
    urlCode: string;

    longUrl: string;

    shortUrl: string;
}