import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCatDto } from './CreateCatDto';

@Controller('cats')
export class CatsController {
    /**
     * 전체 목록 조회
     * @returns 
     */
    @Get()
    findAll() {
        return 'This action returns all cats';
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
        return 'This action adds a new cat';
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
