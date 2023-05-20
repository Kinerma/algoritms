import React, {FormEvent, useEffect, useState} from "react";
import sortingStyle from './sorting-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import {ISorting} from "../../types/interface";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {selectionSort, bubbleSort} from "./sorting";

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

    const sortingPages = async (sorting: string) => {
        setIsLoading(true)
        setSorting(sorting)

        if (sorting === Direction.Ascending) {
            verification === "selection" ? await  selectionSort(arr, Direction.Ascending, setArray) : await bubbleSort(arr, Direction.Ascending, setArray)
        } else {
            verification === "selection" ? await  selectionSort(arr, Direction.Descending, setArray) : await bubbleSort(arr, Direction.Descending, setArray)
        }

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
                    onClick={() => {sortingPages(Direction.Ascending)}}
                    isLoader={sorting === Direction.Ascending}
                    disabled={isLoading} />
            <Button text='По убыванию'
                    sorting={Direction.Descending}
                    onClick={() => {sortingPages(Direction.Descending)}}
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
