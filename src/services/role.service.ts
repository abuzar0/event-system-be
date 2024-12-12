import { Role } from './../models/role.model';

export class RoleService {
    static async RoleExists(findDto:any) {
        return await Role.findOne(findDto) || false
    };


    static async create(createDto:any) {
        const role = new Role(createDto);
        return (await role.save());
    };

    static async update(
        roleId:string,
        updateDto:any,
        { lean = false, upsert = false, returnNew = true, population = [], session = undefined } = {},
        flatten = true
    ) {

        try {
            const updatedRole = Role.findByIdAndUpdate(roleId, flatten ? { $set: updateDto } : updateDto, { lean, upsert, new: returnNew });
            return updatedRole;
        } catch (error) {
            throw Error('problem in update');
        }

    }

    static async getMany(findDto:any, options = { population: [], select: [] }) {
        const role = await Role.find(findDto, options.select)
            .populate(options.population || [])
            .exec();
        if (!role)
            throw new Error("role not found");
        return role;
    };



    static async getById(roleId:string, { population = [] } = { population: [] }) {
        const role = await Role.findById(roleId).populate(population).exec();
        if (!role) {
            throw Error('role not found');
        }
        return role;
    };
}
