import {ElementStates} from "./element-states";
import {TStackContainer} from "../components/stack-page/stack";

export interface IString {
    state: ElementStates;
    letter: string
}

export interface IStackAdd {
    add: boolean;
    remove: boolean
}

export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    elements: TStackContainer<T>
}

export interface ISorting {
    value: number;
    state: ElementStates
}


export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void;
    peak: () => T | undefined;
    getHead: () => number;
    getTail: () => number;
    getQueue: () => T[] | undefined[];
    getLength: () => number;
    getSize: () => number
}

export interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, index: number) => void;
    deleteIndex: (index: number) => void;
    deleteHead: (element: T) => void;
    deleteTail: (element: T) => void;
    getSize: () => number;
    print: () => void
}

export enum circleAction {
    Add = 'add',
    Delete = 'delete',
    Default = 'default'
}

export type TListLetter = {
    value: string;
    state: ElementStates;
    action?: circleAction;
    circleAction?: {value: string}
}