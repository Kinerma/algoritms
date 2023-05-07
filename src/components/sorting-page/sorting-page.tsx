import React, {FormEvent, useEffect, useState} from "react";
import sortingStyle from './sorting-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import {ISorting} from "../../types/interface";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {DELAY_IN_MS} from "../../constants/delays";
import {Direction} from "../../types/direction";

export const SortingPage: React.FC = () => {
    const [arr, setArray] = useState<ISorting[]>([])
    const [verification, setVerification] = useState<'selection' | 'bubble'>('selection')
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState<string>()

    const randomArr = () => {
        const count = Math.floor(Math.random() * (17 - 3) + 3)
        const arr = []
        for (let i = 0; i < count; i++) {
            arr.push({value: Math.round(Math.random() * (100 - 0) + 0), state: ElementStates.Default})
        }
        setArray(arr)
    }
    const handleRandomArr = (evt: FormEvent) => {
        evt.preventDefault()
        randomArr()
    }
    const shortDelay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const swap = (arr: ISorting[], firstIndex: number, secondIndex: number): void => {
        const temp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = temp;
    };
    const selectionSort = async (arr: ISorting[], sorting: string) => {
        setIsLoading(true)
        setSorting(sorting)
        for (let i = 0; i < arr.length; i++) {
            let indexMin = i
            for (let j = i; j < arr.length; j++) {
                arr[i].state = ElementStates.Changing
                arr[j].state = ElementStates.Changing
                setArray([...arr])
                await shortDelay(DELAY_IN_MS)
                if (sorting === 'ascending' ? arr[j].value < arr[indexMin].value : arr[j].value > arr[indexMin].value) {
                    indexMin = j
                }
                arr[i].state = ElementStates.Default
                arr[j].state = ElementStates.Default
                setArray([...arr])
            }
            swap(arr, i, indexMin)
            arr[i].state = ElementStates.Modified
        }
        setArray([...arr])
        setSorting('')
        setIsLoading(false)
    }
    const bubbleSort = async (arr: ISorting[], sorting: string) => {
        setIsLoading(true)
        setSorting(sorting)
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                arr[j].state = ElementStates.Changing
                arr[j + 1].state = ElementStates.Changing
                setArray([...arr])
                await shortDelay(DELAY_IN_MS)
                if (sorting === 'ascending' ? arr[j + 1].value < arr[j].value : arr[j + 1].value > arr[j].value) {
                    swap(arr, j, j + 1)
                }
                arr[j].state = ElementStates.Default
                arr[j + 1].state = ElementStates.Default
            }
            arr[arr.length - i - 1].state = ElementStates.Modified
        }
        setArray([...arr])
        setSorting('')
        setIsLoading(false)
    }

    useEffect(() => {
        randomArr()
        return () => {
            setArray([])
        }
    }, [])

  return (
    <SolutionLayout title="Сортировка массива">
       <form className={sortingStyle.form} onSubmit={handleRandomArr}>
          <div className={sortingStyle.radio}>
            <RadioInput label="Выбор"
                        value='selection'
                        checked={verification === 'selection'}
                        onChange={() => setVerification('selection')}
                        disabled={isLoading} />
            <RadioInput label='Пузырек'
                        value='bubble'
                        checked={verification === 'bubble'}
                        onChange={() => setVerification('bubble')}
                        disabled={isLoading} />
          </div>
          <div className={sortingStyle.button}>
            <Button text='По возрастанию'
                    sorting={Direction.Ascending}
                    onClick={() => {verification === 'selection' ? selectionSort(arr, Direction.Ascending) : bubbleSort(arr, Direction.Ascending)}}
                    isLoader={sorting === Direction.Ascending}
                    disabled={isLoading} />
            <Button text='По убыванию'
                    sorting={Direction.Descending}
                    onClick={() => {verification === 'selection' ? selectionSort(arr, Direction.Descending) : bubbleSort(arr, Direction.Descending)}}
                    isLoader={sorting === Direction.Descending}
                    disabled={isLoading} />
          </div>
          <Button text='Новый массив'
                  type='submit'
                  disabled={isLoading} />
       </form>
       <div className={sortingStyle.columns}>
           {arr.map(({value, state}, index) => (
               <div key={index}>
                   <Column index={value} state={state} />
               </div>
               ))}
       </div>
    </SolutionLayout>
  );
};
