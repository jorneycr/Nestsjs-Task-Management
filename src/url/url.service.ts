import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UrlRepository } from "./url.repository";
import ShortUniqueId from 'short-unique-id';
import { Url } from "./url.entity";
import { CreateUrlDto } from "./dto/create-url.dto";
import { Response } from "express";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlRepository)
        private urlRepositoy: UrlRepository,
    ) { }

    async createUrl(createUrlDto: CreateUrlDto): Promise<Url> {

        const { longUrl } = createUrlDto;
        const baseUrl = "http:localhost:3000";

        const validUrl: RegExp = /^((https|http):\/\/)?(www.)?[a-z0-9]+(.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(?:[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/gm;

        if (validUrl.test(baseUrl)) throw new HttpException("Invalid base URL", HttpStatus.BAD_REQUEST)

        const uid = new ShortUniqueId();

        createUrlDto.urlCode = uid();

        if (validUrl.test(longUrl)) {
            try {

                const urlGet = this.urlRepositoy.createQueryBuilder('url');
                urlGet.andWhere('url.longUrl = :longUrl', { longUrl: longUrl });

                const url = await urlGet.getOne();

                if (!url) {
                    createUrlDto.shortUrl = `${baseUrl}/url/${createUrlDto.urlCode}`;

                    const urlSave = this.urlRepositoy.create({
                        urlCode: createUrlDto.urlCode,
                        longUrl: createUrlDto.longUrl,
                        shortUrl: createUrlDto.shortUrl,
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

    // TODO
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