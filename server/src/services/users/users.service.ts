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
            let tempUser = await this.findUserByUid(user.uid);
            if (tempUser) {
                console.log('User already exists');
                return null;
            }
            let newUser: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
            let createdUser = new this.userModel(newUser);
            await createdUser.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async findUserByUid(uid: string) {
        try {
            return await this.userModel.findOne({ uid: uid }).exec();
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
