import React, {useState} from "react";
import stringStyles from "./string.module.css"
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {IString} from "../../types/interface";


export const StringComponent: React.FC = () => {
    const [input, setInput] = useState("")
    const [displayArr, setDisplayArr] = useState<IString[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = () => {
        let start = 0
        let end = input.length - 1
        let time = 1000
        const outputArr: IString[] = []
        const inputArr = Array.from(input)
        setInput("")
        setIsLoading(true)
        inputArr.forEach((el, i) => {
            const object = {
                letter: el,
                state: ElementStates.Default
            }
            outputArr.push(object)
        })
        setDisplayArr([...outputArr])
        setTimeout(() => {
            while (start <= end) {
                reverse(outputArr, start, end, time)
                start++
                end--
                time += 1000
            }
        }, 1000)
        const reverse = (arr: IString[], i1: number, i2: number, time: number) => {
            setTimeout(() => {
                arr[i1].state = ElementStates.Changing
                arr[i2].state = ElementStates.Changing
                setDisplayArr([...arr])
            }, time)
            setTimeout(() => {
                [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
                arr[i1].state = ElementStates.Modified
                arr[i2].state = ElementStates.Modified
                setDisplayArr([...arr])
            }, time + 1000)
            if (i1 + 1 === i2 || i1 === i2) {
                setTimeout(() => {
                    setIsLoading(false)
                }, time + 1000)
            }
        }
    }

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value.trim()
        setInput(value)
    }

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        setIsLoading(true)
        handleClick()
        setIsLoading(false)
        setInput('')
    }

  return (
    <SolutionLayout title="Строка">
      <form className={stringStyles.form} onSubmit={handleSubmit} >
        <Input onChange={handleInput}
               maxLength={11}
               isLimitText={true}
               id="input"
               value={input}
               data-testid="input"/>
        <Button onClick={handleClick}
                text="Развернуть"
                disabled={input.length <= 0}
                isLoader={isLoading}
                data-testid="reverse"/>
      </form>
      <div className={stringStyles.circles}>
        {displayArr.length > 0 && displayArr.map((el, i) => {
          return <Circle state={el?.state} letter={el?.letter} key={i} />
        })}
      </div>
    </SolutionLayout>
  );
};
