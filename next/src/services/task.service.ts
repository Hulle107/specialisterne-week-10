import { Authentication } from "./authentication.service";
import { Database } from "./database.service";
import { TaskCreateInput, TaskUpdateInput, TaskFindManyArgs } from "@/generated/prisma/models";

export default class TaskService {
    authentication: Authentication;

    constructor(authentication: Authentication) {
        this.authentication = authentication;
    }

    async getMany(args?: TaskFindManyArgs) {
        let search: TaskFindManyArgs = {
            where: {
                OR: [
                    { assignedId: { equals: this.authentication.identity } },
                    { ownerId: { equals: this.authentication.identity } },
                ]
            }
        }

        return Database.task.findMany(args);
    }

    async getOne(id: number) {
        return Database.task.findFirstOrThrow({
            where: { id }
        })
    }

    async create(data: TaskCreateInput) {
        return Database.task.create({
            data
        });
    }

    async edit(id: number, data: TaskUpdateInput) {
        data.updatedAt = new Date();

        return Database.task.update({
            data,
            where: { id }
        })
    }

    async delete(id: number) {
        return Database.task.delete({
            where: { id }
        })
    }

    async complete(id: number) {
        return Database.task.update({
            data: {
                completedAt: new Date(),
                updatedAt: new Date(),
            },
            where: { id }
        })
    }
}