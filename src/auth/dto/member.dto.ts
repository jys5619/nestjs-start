import { ApiProperty } from "@nestjs/swagger";

export class MemberDTO {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}