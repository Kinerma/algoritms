import {ISorting} from "../../types/interface";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import React from "react";

const shortDelay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const swap = (arr: ISorting[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
export const selectionSort = async (arr: ISorting[], sorting: string, setArray?: React.Dispatch<React.SetStateAction<ISorting[]>>) => {

    for (let i = 0; i < arr.length; i++) {
        let indexMin = i
        for (let j = i; j < arr.length; j++) {
            arr[i].state = ElementStates.Changing
            arr[j].state = ElementStates.Changing
            if (setArray) {
                setArray([...arr])
            }
            await shortDelay(SHORT_DELAY_IN_MS)
            if (sorting === 'ascending' ? arr[j].value < arr[indexMin].value : arr[j].value > arr[indexMin].value) {
                indexMin = j
            }
            arr[i].state = ElementStates.Default
            arr[j].state = ElementStates.Default
            if (setArray) {
                setArray([...arr])
            }
        }
        swap(arr, i, indexMin)
        arr[i].state = ElementStates.Modified
    }
    if (setArray) {
        setArray([...arr])
    }
    return arr
}

export const bubbleSort = async (arr: ISorting[], sorting: string, setArray?: React.Dispatch<React.SetStateAction<ISorting[]>>) => {

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing
            arr[j + 1].state = ElementStates.Changing
            if (setArray) {
                setArray([...arr])
            }
            await shortDelay(SHORT_DELAY_IN_MS)
            if (sorting === 'ascending' ? arr[j + 1].value < arr[j].value : arr[j + 1].value > arr[j].value) {
                swap(arr, j, j + 1)
            }
            arr[j].state = ElementStates.Default
            arr[j + 1].state = ElementStates.Default
        }
        arr[arr.length - i - 1].state = ElementStates.Modified
    }
    if (setArray) {
        setArray([...arr])
    }
    return arr
}