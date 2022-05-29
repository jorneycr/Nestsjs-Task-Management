import { Body, Controller, Get, Param, Post, Redirect, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUrlDto } from "./dto/create-url.dto";
import { Url } from "./url.entity";
import { UrlService } from "./url.service";

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) { }

    @Get('/:code')
    async getLongUrl(@Param('code') code: string, @Res() res:Response): Promise<Url> {      
        return await this.urlService.addUrl(code, res);
    }

    @Post()
    createUrl(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
        return this.urlService.createUrl(createUrlDto);
    }

}