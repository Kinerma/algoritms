import {ILinkedList} from "../../types/interface";

class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value
        this.next = next === undefined ? null : next
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null
    private size: number
    constructor(initialArray: T[]) {
        this.head = null
        this.size = 0
        initialArray.forEach((element) => this.append(element))
    }
    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index')
        } else {
            let node = new LinkedListNode(element)
            if (index === 0) {
                node.next = this.head
                this.head = node
            } else {
                let currentElement = this.head
                let currentIndex = 0
                let previousElement = null
                while (currentIndex < index && currentElement) {
                    previousElement = currentElement
                    currentElement = currentElement.next
                    currentIndex++
                } if (previousElement) {
                    previousElement.next = node
                }
                node.next = currentElement
            }
            this.size++
        }
    }
    deleteIndex(index: number) {
        if (index < 0 || index >= this.size) {
            console.log('Enter a valid index')
            return null
        }
        let currentElement = this.head
        if (index === 0 && currentElement) {
            this.head = currentElement.next
        } else {
            let previousElement = null
            let currentIndex = 0
            while (currentIndex < index && currentElement) {
                previousElement = currentElement
                currentElement = currentElement.next
                currentIndex++
            }
            if (previousElement && currentElement) {
                previousElement.next = currentElement.next
            }
        }
        this.size++
        return currentElement ? currentElement.value : null
    }
    append(element: T){
        let node = new LinkedListNode(element)
        if (this.head === null) {
            this.head = node
        } else {
            let currentElement = this.head
            while (currentElement.next) {
                currentElement = currentElement.next
            }
            currentElement.next = node
        }
        this.size++
    }
    deleteHead() {
        if (!this.head) {
            return
        }
        this.head = this.head.next
        this.size--
    }
    deleteTail() {
        let currentElement = this.head
        let previousElement
        while (currentElement?.next) {
            previousElement = currentElement
            currentElement = currentElement.next
        }
        if (previousElement?.next) {
            previousElement.next = null
        }
        this.size--
    }
    prepend(element: T) {
        let node = new LinkedListNode(element)
        if (!(this.getSize() === 0)) {
            node.next = this.head
            this.head = node
        }
        this.head = node
        this.size++
    }
    getSize() {
        return this.size
    }
    print() {
        let currentElement = this.head
        let res = ''
        while (currentElement) {
            res += `${currentElement.value}`
            currentElement = currentElement.next
        }
        console.log(res)
    }
}