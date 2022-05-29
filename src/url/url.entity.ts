import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    urlCode: string;

    @Column()
    longUrl: string;

    @Column()
    shortUrl: string;

}