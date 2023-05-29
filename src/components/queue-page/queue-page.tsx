import React, {ChangeEvent, SetStateAction, useState} from "react";
import queueStyle from './queue-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {Queue} from "./queue";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const QueuePage: React.FC = () => {
    const queueSize = 7
    const [queue] = useState(new Queue<string>(queueSize))
    const [array, setArray] = useState<string[] | undefined[]>(queue.getQueue())
    const [input, setInput] = useState<string>('')
    const [head, setHead] = useState(queue.getHead())
    const [tail, setTail] = useState(queue.getTail())
    const [length, setLength] = useState(queue.getLength())
    const [count, setCount] = useState<number>(-1)
    const [isLoading, setIsLoading] = useState(false)

    const shortDelay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const enqueue = async (item: string) => {
        setIsLoading(true)
        setInput('')
        queue.enqueue(item)
        setArray(queue.getQueue())
        setTail(queue.getTail())
        setLength(queue.getLength())
        setCount(tail % queue.getSize())
        await shortDelay(SHORT_DELAY_IN_MS)
        setCount(-1)
        await shortDelay(SHORT_DELAY_IN_MS)
        setIsLoading(false)
    }
    const dequeue = async () => {
        setIsLoading(true)
        queue.dequeue()
        setArray(queue.getQueue())
        setCount(head & queue.getSize())
        await shortDelay(SHORT_DELAY_IN_MS)
        setHead(queue.getHead())
        setLength(queue.getLength())
        setCount(-1)
        await shortDelay(SHORT_DELAY_IN_MS)
        setIsLoading(false)
    }
    const clearQueue = () => {
        queue.clear()
        setArray(queue.getQueue())
        setHead(queue.getHead())
        setTail(queue.getTail())
        setLength(queue.getLength)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>, setInput: {(value: SetStateAction<string>):void}) => {
        setInput((e.target as HTMLInputElement).value)
    }

  return (
    <SolutionLayout title="Очередь">
      <form className={queueStyle.form}>
        <Input type='text'
               maxLength={4}
               isLimitText={true}
               value={input}
               placeholder='Введите значение'
               onChange={(e) => onChange(e as ChangeEvent<HTMLInputElement>, setInput)} />
        <Button type='submit'
                text='Добавить'
                onClick={() => enqueue(input)}
                isLoader={isLoading}
                disabled={input === '' || queue.getSize() === length} />
        <Button text='Удалить'
                onClick={dequeue}
                isLoader={isLoading}
                disabled={length === 0} />
        <Button type='submit'
                text='Очистить'
                extraClass={queueStyle.button}
                onClick={clearQueue}
                disabled={tail === 0 && head === 0} />
      </form>
      <div className={queueStyle.circle}>
          {array.map((item, index) =>
            <div key={index}>
               <Circle letter={item}
                       index={index}
                       head={index === head ? 'head' : ''}
                       tail={index === tail - 1 ? 'tail' : ''}
                       state={index === count ? ElementStates.Changing : ElementStates.Default} />
            </div>
          )}
      </div>
    </SolutionLayout>
  );
};
