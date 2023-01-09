import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './CreateCatDto';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {

    /**
     * 생성자
     * @param catsService private 으로 해야 선언과 동시에 초기화 해준다.
     */
    constructor(private catsService: CatsService) {}

    /**
     * 전체 목록 조회
     * @returns 
     */
    @Get()
    findAll(): Cat[] {
        return this.catsService.findAll();
    }

    /**
     * 단건 조회
     * @param id 
     * @returns 
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }

    /**
     * 생성
     * @param createCatDto 
     * @returns 
     */
    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        console.log('post :', createCatDto);
        return this.catsService.create(createCatDto);
    }

    /**
     * 수정
     * @param id 
     * @param createCatDto 
     * @returns 
     */
    @Put(':id')
    update(@Param('id') id: string, @Body() createCatDto: CreateCatDto) {
        return `This actoin updates #${id} cat`;
    }

    /**
     * 삭제
     * @param id 
     * @returns 
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id}`;
    }
}
