import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UrlRepository } from "./url.repository";
import shortid from "shortid";
import validUrl from "valid-url";

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlRepository)
        private urlRepositoy: UrlRepository,
    ) { }

    createUrl() {

    }

    getUrl() {

    }
}