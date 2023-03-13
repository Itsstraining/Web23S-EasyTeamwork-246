import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/users.model';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async signIn(user: UserModel) {
        let createdUser = new this.userModel(user);
        await createdUser.save();
    }

    async findUserById(id: string) {
        return await this.userModel.findOne({ uid: id });
    }
}
