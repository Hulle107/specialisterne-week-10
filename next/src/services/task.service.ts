import { database } from "./database.service";
import { TaskCreateInput, TaskUpdateInput, TaskFindManyArgs } from "@/generated/prisma/models";

export async function getTasks(args?: TaskFindManyArgs) {
    return database.task.findMany(args);
}

export async function getTask(id: number) {
    return database.task.findFirstOrThrow({
        where: { id }
    })
}

export async function createTask(data: TaskCreateInput) {
    return database.task.create({
        data
    });
}

export async function editTask(id: number, data: TaskUpdateInput) {
    data.updatedAt = new Date();

    return database.task.update({
        data,
        where: { id }
    })
}

export async function deleteTask(id: number) {
    return database.task.delete({
        where: { id }
    })
}

export async function completeTask(id: number) {
    return database.task.update({
        data: {
            completedAt: new Date(),
            updatedAt: new Date(),
        },
        where: { id }
    })
}