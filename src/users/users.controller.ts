import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { User } from './entity/users.entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('USER API')
export class UsersController {
    constructor(private userService: UsersService) {};

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: User): Promise<void> {
        return this.userService.create(user);
    }
    
    @Put(':id')
    update(@Param('id') id: number, @Body() user: User) {
        this.userService.update(id, user);
    }
    
    @Delete(':id')
    remove(@Param('id') id: number) {
        this.userService.remove(id);
    }
}
