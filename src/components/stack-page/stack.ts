import {IStack} from "../../types/interface";

export type TStackContainer<T> = Array<T>

export class Stack<T> implements IStack<T> {
    private container: TStackContainer<T> = [];

    push = (item: T) => {
        this.container.push(item)
    }
    pop = () => {
        this.container.pop()
    }
    clear = () => {
        this.container = []
    }
    get size() {
        return this.container.length
    }
    get elements() {
        return [...this.container]
    }
}