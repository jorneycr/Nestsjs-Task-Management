import { EntityRepository, Repository } from "typeorm";
import { Url } from "./url.entity";
@EntityRepository(Url)
export class UrlRepository extends Repository<Url>{
}