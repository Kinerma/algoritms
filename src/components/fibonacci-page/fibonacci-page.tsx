import React, {FormEvent, useState, ChangeEvent} from "react";
import fibonacciStyle from './fibonacci-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from '../../constants/delays'

export const FibonacciPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [array, setArray] = useState<number[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fibonacci = (n: number): number[] => {
        const arr = [1, 1]
        for (let i = 2; i <= n; i++) {
            arr.push(arr[i - 2] + arr[i - 1])
        }
        return arr
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const fibonacciArray = (arr: number[]): void => {
        let i = 0
        function recursion() {
            setTimeout(() => {
                if (i >= arr.length) {
                    setIsLoading(false)
                    return
                } else {
                    setArray((prev) => [...prev, arr[i]])
                    i++
                    recursion()
                }
            }, SHORT_DELAY_IN_MS)
        }
        recursion()
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setArray([])
        const fibSequence = fibonacci(Number(inputValue))
        fibonacciArray(fibSequence)
        setInputValue('')
        setIsLoading(false)
    }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibonacciStyle.form} onSubmit={onSubmit}>
        <Input type='number'
               max={19}
               min={1}
               isLimitText
               onChange={onChange}
               value={inputValue} />
        <Button text='Рассчитать'
                isLoader={isLoading}
                type='submit'
                disabled={!!!inputValue}/>
      </form>
      <div className={fibonacciStyle.circle}>
        {array?.map((item, index) => {
          return <Circle letter={String(item)} key={index} index={index} />
        })}
      </div>
    </SolutionLayout>
  );
};
