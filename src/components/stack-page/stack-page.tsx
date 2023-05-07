import React, {FormEvent, useRef, useState} from "react";
import stackStyle from './stack-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";
import {Stack, TStackContainer} from "./stack";
import {IStack, IStackAdd} from "../../types/interface";

export const StackPage: React.FC = () => {
    const {current: stack} = useRef<IStack<string>>(new Stack())
    const [value, setValue] = useState('')
    const [array, setArray] = useState<TStackContainer<string>>([])
    const [inProcess, setInProcess] = useState<IStackAdd>({add: false, remove: false})
    const isAnyProcess = inProcess.add || inProcess.remove
    const shortDelay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const shortDelayMs = () => shortDelay(SHORT_DELAY_IN_MS)
    const changeInput = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const updateCircle = () => {
        setArray(stack.elements)
    }
    const addCircle = async (item: string) => {
        stack.push(item)
        updateCircle()
        await shortDelayMs()
        setValue('')
    }
    const removeCircle = async () => {
        setInProcess({add: false, remove: true})
        stack.pop()
        await shortDelayMs()
        updateCircle()
        setInProcess({add: false, remove: false})
    }
    const clearCircle = () => {
        stack.clear()
        updateCircle()
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInProcess({add: true, remove: false})
        await addCircle(value)
        setInProcess({add: false, remove: false})
        setValue('')
    }


  return (
    <SolutionLayout title="Стек">
      <form className={stackStyle.form} onSubmit={handleSubmit}>
        <Input type='text'
               maxLength={4}
               value={value}
               isLimitText
               onChange={changeInput}
               disabled={inProcess.add || inProcess.remove} />
        <Button type='submit'
                text='Добавить'
                isLoader={inProcess.add}
                disabled={value.length < 1 || array.length >= 20 || isAnyProcess} />
        <Button type='submit'
                text='Удалить'
                onClick={removeCircle}
                isLoader={inProcess.remove}
                disabled={array.length < 1 || isAnyProcess} />
        <Button type='submit'
                text='Очистить'
                onClick={clearCircle}
                disabled={array.length < 1 || isAnyProcess}
                extraClass={stackStyle.button} />
      </form>
        {array ?
          <div className={stackStyle.circles}>
              {array.map((item, index) =>
                  <Circle letter={item}
                          index={index}
                          key={index}
                          head={index === array.length - 1 ? 'top' : ''}
                          state={index === array.length - 1 && isAnyProcess ? ElementStates.Changing : ElementStates.Default} />)}
          </div>
          : <></>
        }
    </SolutionLayout>
  );
};
