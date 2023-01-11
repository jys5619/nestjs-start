import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { MemberAuthority } from "../entity/member-authority.entity";


@Injectable()
export class MemberAuthorityRepository extends Repository<MemberAuthority> {
    constructor(private dataSource: DataSource) {
        super(MemberAuthority, dataSource.createEntityManager());
    }
}