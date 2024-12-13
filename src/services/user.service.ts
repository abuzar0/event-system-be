import { User } from '../models/user.model';
import { IOptions } from '../utils/IOption';
import { IUser } from '../utils/IUser';

export class UserService {

  static async isExists(findDto: any): Promise<IUser | Boolean> {
    return await User.findOne(findDto) || false
  };
  static async create(createDto: any): Promise<IUser> {
    const user = await User.create(createDto);
    return user.save();
  }

  static async getById(userId: string, options: IOptions = { population: [], select: [] }): Promise<IUser> {
    const user = await User.findById({ _id: userId },options.select).populate(options.population).exec();
    if (!user) {
      throw Error('user not found');
    }
    return user;
  };

  static async getMany(findDto: any, options: IOptions = { population: [], select: [] }): Promise<IUser[]> {

    const { population = [], select = [] } = options;
    const users = await User.find(findDto, select)
      .populate(population || [])
      .exec();

    if (!users || users.length === 0) {
      throw new Error("User not found");
    }

    return users;
  }


  static async update(
    userId: string,
    updateDto: any,
    { lean = false, upsert = false, returnNew = true, population = [], session = undefined } = {},
    flatten = true
  ) {

    try {

      const updatedRole = User.findByIdAndUpdate(userId, flatten ? { $set: updateDto } : updateDto, { lean, upsert, new: returnNew });
      return updatedRole;
    } catch (error) {
      throw Error('problem in update');
    }

  }
}
