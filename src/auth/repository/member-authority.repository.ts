import { EntityRepository, Repository } from "typeorm";
import { MemberAuthority } from "../entity/member-authority.entity";

export class MemberAuthorityRepository extends Repository<MemberAuthority> {}