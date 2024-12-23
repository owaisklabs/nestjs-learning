import { DataSource, Repository } from 'typeorm';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepositry : Repository<User>,
    private dataSource: DataSource,
  ){}


  public async createUser(createUserDto : CreateUserDto){
    const user = await this.userRepositry.findOne({
      where:{email:createUserDto.email },
    });
    
    let newUSer = this.userRepositry.create(createUserDto);
    newUSer = await this.userRepositry.save(newUSer);
    return newUSer;
  }
  /**
   * The method to get all the users from the database
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limt: number,
    page: number,
  ) {
    return   this.userRepositry.find();
  }
  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: number) {
    return await this.userRepositry.findOneBy({
      id,
    })
  }

  public async createMany(createManyUsersDto:CreateManyUsersDto){
    let newUsers: User[] = [];

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release the query runner connection',
        );
      }
    }

    return newUsers;
  }
}
