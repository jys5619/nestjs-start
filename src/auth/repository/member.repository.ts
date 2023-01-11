import { Repository } from "typeorm";
import { Member } from "../entity/member.entity";

export class MemberRepository extends Repository<Member> {}