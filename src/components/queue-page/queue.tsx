import {IQueue} from "../../types/interface";

export class Queue<T> implements IQueue<T> {
    private container: T[] | undefined[] = []
    private head = 0
    private tail = 0
    private readonly size: number = 0
    private length: number = 0

    constructor(size: number) {
        this.size = size
        this.container = Array(size).fill(undefined)
    }
    enqueue = (value: T) => {
        if (this.length === this.size) {
            this.tail = 0
        }
            this.container[this.tail % this.size] = value
            this.tail++
            this.length++
    }
    dequeue = () => {
        this.container[this.head % this.size] = undefined
        this.head = this.head + 1 === this.size ? 0 : this.head + 1
        this.length--
    }
    peak = (): T | undefined => {
        return this.container[this.head]
    }
    clear = () => {
        this.container = Array(this.size).fill(undefined)
        this.head = 0
        this.tail = 0
        this.length = 0
    }
    getHead = () => {
        return this.head
    }
    getTail = () => {
        return this.tail
    }
    getQueue = () => {
        return this.container
    }
    getLength = () => {
        return this.length
    }
    getSize = () => {
        return this.size
    }
}