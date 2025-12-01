import { Authentication } from "./authentication.service";
import { Database } from "./database.service";
import { TaskCreateInput, TaskUpdateInput, TaskOrderByWithRelationInput, TaskFindManyArgs, TaskFindUniqueArgs, TaskUpdateArgs, TaskCreateArgs, TaskDeleteArgs } from "@/generated/prisma/models";

export type TaskRelation = "owner" | "assigned";

export default class TaskService {
    authentication: Authentication;

    constructor(authentication: Authentication) {
        this.authentication = authentication;
    }

    async getMany(relation: TaskRelation, orderBy: TaskOrderByWithRelationInput = { createdAt: "desc" }, skip: number = 0, take: number = 100 ) {
        let where = {};
        
        if (relation === "owner") {
            where = { ownerId: this.authentication.identity };
        }

        if (relation === "assigned") {
            where = { assignedId: this.authentication.identity };
        }

        if (skip < 0) skip = 0;
        if (take < 1) take = 1;

        let search: TaskFindManyArgs = {
            where,
            orderBy,
            skip,
            take,
        };

        return Database.task.findMany(search);
    }

    async getOne(id: number) {
        let search: TaskFindUniqueArgs = {
            where: {
                id,
                AND: {
                    OR: [
                        { assignedId: this.authentication.identity },
                        { ownerId: this.authentication.identity },
                    ],
                },
            },
        };

        return Database.task.findFirstOrThrow(search);
    }

    async create(task: Omit<TaskCreateInput, "owner" | "createdAt" | "updatedAt" | "completedAt">) {
        let create: TaskCreateArgs = {
            data: {
                ...task,
                owner: { connect: { id: this.authentication.identity } },
                createdAt: new Date(),
            },
        };

        return Database.task.create(create);
    }

    async edit(id: number, task: Omit<TaskUpdateInput, "owner" | "createdAt" | "updatedAt" | "completedAt">) {
        let update: TaskUpdateArgs = {
            where: { 
                id,
                AND: {
                    ownerId: this.authentication.identity,
                },
            },
            data: {
                ...task,
                updatedAt: new Date(),
            },
        };

        return Database.task.update(update);
    }

    async delete(id: number) {
        let remove: TaskDeleteArgs = {
            where: { 
                id,
                AND: {
                    ownerId: this.authentication.identity,
                },
            },
        };

        return Database.task.delete(remove);
    }

    async complete(id: number) {
        let update: TaskUpdateArgs = {
            data: {
                completedAt: new Date(),
                updatedAt: new Date(),
            },
            where: {
                id,
                AND: {
                    assignedId: this.authentication.identity,
                },
            },
        };

        return Database.task.update(update);
    }
}