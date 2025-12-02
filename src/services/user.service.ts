import { UserCreateArgs, UserCreateInput, UserDeleteArgs, UserFindManyArgs, UserFindUniqueArgs, UserModel, UserOrderByWithRelationInput, UserUpdateArgs, UserWhereInput } from "@/generated/prisma/models";
import { Authentication } from "./authentication.service";
import { Database } from "./database.service";
import { encodeId } from "./hashid.service";

export type SanitizedUserModel = Omit<UserModel, "id" | "password"> & { id: string };

export default class UserService {
    authentication: Authentication | undefined;

    constructor(authentication?: Authentication) {
        this.authentication = authentication;
    }

    async getMany(where?: UserWhereInput, orderBy: UserOrderByWithRelationInput = { username: "desc" }, skip: number = 0, take: number = 100) {
        if (skip < 0) skip = 0;
        if (take < 1) take = 1;
        
        let findMany: UserFindManyArgs = {
            where,
            orderBy,
            skip,
            take,
        };

        return Database.user.findMany(findMany);
    }

    async getOne(id: number) {
        let findUnique: UserFindUniqueArgs = {
            where: {
                id,
            },
        };

        return Database.user.findUnique(findUnique);
    }

    async create(user: Omit<UserCreateInput, "createdAt" | "updatedAt">) {
        let create: UserCreateArgs = {
            data: {
                ...user,
                createdAt: new Date(),
            },
        };

        return Database.user.create(create);
    }

    async edit(user: Omit<UserCreateInput, "createdAt" | "updatedAt">) {
        let update: UserUpdateArgs = {
            where: { 
                id: this.authentication? this.authentication.identity : -1,
            },
            data: {
                ...user,
                updatedAt: new Date(),
            },
        };

        return Database.user.update(update);
    }

    async delete() {
        let remove: UserDeleteArgs = {
            where: {
                id: this.authentication? this.authentication.identity : -1,
            },
        }

        return Database.user.delete(remove);
    }

    sanitizeMany(users: UserModel[]): SanitizedUserModel[] {
        let sanitized: SanitizedUserModel[] = [];
        users.forEach(user => sanitized.push(this.sanitizeOne(user)));

        return sanitized;
    }

    sanitizeOne(user: UserModel): SanitizedUserModel {
        let sanitized = {
            ...user,
            id: encodeId(user.id, "USER"),
            password: undefined,
        };

        return sanitized;
    }
}