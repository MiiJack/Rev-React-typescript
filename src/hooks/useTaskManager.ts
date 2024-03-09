import {useState} from "react";
import {nanoid} from "nanoid";
import { Task } from "../types/Task";

export const useTaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // remove task from list
    const completeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTask = (id: string, taskUpdate: Task) => {
        const newTasks = [...tasks];

        const index = tasks.findIndex((task) => task.id === id);

        newTasks[index] = taskUpdate;

        setTasks(newTasks);
    };

    const addTask = (title:string) => {
        if (title.length < 1) {
            return;
        }

        const newTask: Task = {
            // using nanoid to generate unique id
            id: nanoid(),
            title,
        };
        setTasks((prev) => prev.concat(newTask));
    };

    const filterTasks = (searchKeyword: string) => {
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
        );
    };

    return { completeTask, updateTask, addTask, filterTasks };
};