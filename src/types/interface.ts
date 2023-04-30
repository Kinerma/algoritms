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
