import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/models/users.model';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async getAllUsers() {
        try {
            return await this.userModel.find();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async signIn(user: UserModel) {
        try {
            let createdUser = new this.userModel(user);
            await createdUser.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async findUserById(id: string) {
        try {
            return await this.userModel.findOne({ uid: id });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
