import { EntityRepository, Repository } from "typeorm";
import { Member } from "./member.entity";


// 0.2버전
@EntityRepository()
export class MemberRepository extends Repository<Member> {}
