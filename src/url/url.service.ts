import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UrlRepository } from "./url.repository";
import ShortUniqueId from 'short-unique-id';
import { Url } from "./url.entity";
import { CreateUrlDto } from "./dto/create-url.dto";
import { Response } from "express";
import { path_url } from "../main";
import { isUri } from "valid-url";


@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlRepository)
        private urlRepositoy: UrlRepository,
    ) { }

    async createUrl(createUrlDto: CreateUrlDto): Promise<Url> {

        let { longUrl, shortUrl, urlCode } = createUrlDto; 
        
        const uid = new ShortUniqueId();

        if (isUri(longUrl)) {

            try {

                const url = await this.urlRepositoy.createQueryBuilder("url").where('url.longUrl = :longUrl', { longUrl: longUrl }).getOne();

                if (!url) {
                    urlCode = uid();

                    shortUrl = `${path_url}/url/${urlCode}`;

                    const urlSave = this.urlRepositoy.create({
                        urlCode,
                        longUrl,
                        shortUrl,
                    })
                    await this.urlRepositoy.save(urlSave);

                    return urlSave;

                } else {
                    return url
                }
                
            } catch (error) {
                console.log(error);
                throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException("Invalid longUrl", HttpStatus.BAD_REQUEST)
        }
    }

    async addUrl(code: string, @Res() res: Response): Promise<Url> {

        const url = await this.urlRepositoy.createQueryBuilder("url").where("url.urlCode = :urlCode", { urlCode: code }).getOne();

        try {
            if (url) {
                res.redirect(url.longUrl);
                return url;
            } else {
                throw new HttpException("Invalid longUrl", HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            console.log(error);
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}