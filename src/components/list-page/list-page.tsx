import React, {ChangeEvent, useState} from "react";
import listStyle from './list-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {circleAction, TListLetter} from "../../types/interface";
import {LinkedList} from "./linked-list";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const randomArr = (max: number, min: number) => {
    const count = Math.floor(Math.random() * (max - min) + min)
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({value: Math.round(Math.random() * 101), state: ElementStates.Default})
    }
    return arr
  }
  const initialArray = randomArr(4, 6).map((arr) => arr.value.toString())
  const list = new LinkedList(initialArray)
  const defaultArray: TListLetter[] = initialArray.map((item) => ({
    value: item,
    state: ElementStates.Default
  }))

  const [inputValue, setInputValue] = useState('')
  const [inputIndex, setInputIndex] = useState('')
  const [arrayCharacters, setArrayCharacters] = useState<TListLetter[]>(defaultArray)
  const [stateList, setStateList] = useState({
    addItem: false,
    addHead: false,
    addTail: false,
    addIndex: false,
    deleteHead: false,
    deleteTail: false,
    deleteIndex: false,
  })

  const shortDelay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const addHead = async () => {
    setStateList({...stateList, addHead: true, addItem: true})
    list.prepend(inputValue)
    arrayCharacters[0] = {...arrayCharacters[0], action: circleAction.Add, circleAction: {value: inputValue}}
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters[0] = {...arrayCharacters[0], action: circleAction.Default, circleAction: {value: ''}}
    arrayCharacters.unshift({value: inputValue, state: ElementStates.Modified})
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    setInputValue('')
    arrayCharacters[0] = {...arrayCharacters[0], state: ElementStates.Default}
    setArrayCharacters([...arrayCharacters])
    setStateList({...stateList, addHead: false, addItem: false})
  }
  const addTail = async () => {
    setStateList({...stateList, addTail: true, addItem: true})
    list.append(inputValue)
    arrayCharacters[arrayCharacters.length - 1] = {...arrayCharacters[arrayCharacters.length - 1], action: circleAction.Add, circleAction: {value: inputValue}}
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters[arrayCharacters.length - 1] = {...arrayCharacters[arrayCharacters.length - 1], action: circleAction.Default, circleAction: {value: ''}}
    arrayCharacters.push({value: inputValue, state: ElementStates.Modified})
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    setInputValue('')
    arrayCharacters[arrayCharacters.length - 1] = {...arrayCharacters[arrayCharacters.length - 1], state: ElementStates.Default}
    setArrayCharacters([...arrayCharacters])
    setStateList({...stateList, addHead: false, addItem: false})
  }
  const addIndex = async () => {
    setStateList({...stateList, addIndex: true, addItem: true})
    for (let i = 0; i <= Number(inputIndex); i++) {
      arrayCharacters[i] = {...arrayCharacters[i], action: circleAction.Add, circleAction: {value: inputValue}}
      arrayCharacters[i - 1] = {...arrayCharacters[i - 1], action: circleAction.Default, state: ElementStates.Default, circleAction: {value: ''}}
      setArrayCharacters([...arrayCharacters])
      await shortDelay(SHORT_DELAY_IN_MS)
    }
    arrayCharacters[Number(inputIndex)] = {...arrayCharacters[Number(inputIndex)], action: circleAction.Default, circleAction: {value: ''}}
    setArrayCharacters([...arrayCharacters])
    arrayCharacters.map((arrayCharacters) => (arrayCharacters.state = ElementStates.Default))
    list.addByIndex(inputValue, Number(inputIndex))
    arrayCharacters.splice(Number(inputIndex), 0, {value: inputValue, state: ElementStates.Modified})
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters[Number(inputIndex)] = {...arrayCharacters[Number(inputIndex)], state: ElementStates.Default}
    setArrayCharacters([...arrayCharacters])
    setInputIndex('')
    setInputValue('')
    setStateList({...stateList, addIndex: false, addItem: false})
  }

  const deleteHead = async () => {
    setStateList({...stateList, deleteHead: true, addItem: true})
    list.deleteHead()
    arrayCharacters[0] = {...arrayCharacters[0], action: circleAction.Delete, circleAction: {value: arrayCharacters[0].value}, value: ''}
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters.shift()
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    setStateList({...stateList, deleteHead: false, addItem: false})
  }
  const deleteTail = async () => {
    setStateList({...stateList, deleteTail: true, addItem: true})
    list.deleteTail()
    arrayCharacters[arrayCharacters.length - 1] = {...arrayCharacters[arrayCharacters.length - 1], action: circleAction.Delete, circleAction: {value: arrayCharacters[arrayCharacters.length - 1].value}, value: ''}
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters.pop()
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    setStateList({...stateList, deleteTail: false, addItem: false})
  }
  const deleteIndex = async () => {
    setStateList({...stateList, deleteIndex: true, addItem: true})
    for (let i = 0; i <= Number(inputIndex); i++) {
      arrayCharacters[i] = {...arrayCharacters[i], state: ElementStates.Changing}
      setArrayCharacters([...arrayCharacters])
      await shortDelay(SHORT_DELAY_IN_MS)
    }
    arrayCharacters[Number(inputIndex)] = {...arrayCharacters[Number(inputIndex)], state: ElementStates.Default, circleAction: {value: arrayCharacters[Number(inputIndex)].value}, value: ''}
    arrayCharacters[Number(inputIndex)] = {...arrayCharacters[Number(inputIndex)], action: circleAction.Delete}
    setArrayCharacters([...arrayCharacters])
    await shortDelay(SHORT_DELAY_IN_MS)
    arrayCharacters.map((arrayCharacters) => (arrayCharacters.state = ElementStates.Default))
    list.deleteIndex(Number(inputIndex))
    arrayCharacters.splice(Number(inputIndex), 1)
    setArrayCharacters([...arrayCharacters])
    setInputIndex('')
    setStateList({...stateList, deleteIndex: false, addItem: false})
  }

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value)
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={listStyle.form}>
        <div className={listStyle.value}>
          <Input placeholder='Введите значение'
                 value={inputValue}
                 maxLength={4}
                 isLimitText
                 onChange={onChangeValue}
                 disabled={stateList.addItem}
                 id='inputValue' />
          <Button text='Добавить в head'
                  extraClass={listStyle.valueButton}
                  onClick={addHead}
                  isLoader={stateList.addHead}
                  disabled={!inputValue || stateList.addItem} />
          <Button text='Добавить в tail'
                  extraClass={listStyle.valueButton}
                  onClick={addTail}
                  isLoader={stateList.addTail}
                  disabled={!inputValue || stateList.addItem}/>
          <Button text='Удалить в head'
                  extraClass={listStyle.valueButton}
                  onClick={deleteHead}
                  isLoader={stateList.deleteHead} />
          <Button text='Удалить в tail'
                  extraClass={listStyle.valueButton}
                  onClick={deleteTail}
                  isLoader={stateList.deleteTail} />
        </div>
        <div className={listStyle.index}>
          <Input placeholder='Введите индекс'
                 value={inputIndex}
                 onChange={onChangeIndex}
                 type='number'
                 id='inputIndex' />
          <Button text='Добавить по индексу'
                  extraClass={listStyle.indexButton}
                  onClick={addIndex}
                  isLoader={stateList.addIndex}
                  disabled={!inputIndex || !inputValue || list.getSize() <= Number(inputIndex) || Number(inputIndex) < 0 || stateList.addItem} />
          <Button text='Удалить по индексу'
                  extraClass={listStyle.indexButton}
                  onClick={deleteIndex}
                  isLoader={stateList.deleteIndex}
                  disabled={!inputIndex || list.getSize() - 1 <= Number(inputIndex) || Number(inputIndex) < 0 || stateList.addItem} />
        </div>
      </form>
      <div className={listStyle.elements}>
        {arrayCharacters.map((letter, index) => (
            <div className={listStyle.circle} key={index} data-cy='circles'>
              {letter.action === circleAction.Add && (
                  <Circle extraClass={listStyle.smallCircleAdd}
                          isSmall
                          letter={letter.circleAction?.value}
                          state={ElementStates.Changing}  />
              )}
              <div className={listStyle.arrow} >
                <Circle letter={letter.value}
                        index={index}
                        head={index === 0 && letter.action !== circleAction.Add ? 'head' : ''}
                        tail={index === arrayCharacters.length - 1 && letter.action !== circleAction.Add && letter.action !== circleAction.Delete ? 'tail' : ''}
                        state={letter.state} />
                {index < arrayCharacters.length - 1 && <ArrowIcon />}
              </div>
              {letter.action === circleAction.Delete && (
                  <div data-cy='smallCircle' >
                  <Circle extraClass={listStyle.smallCircleDelete}
                          isSmall
                          letter={letter.circleAction?.value}
                          state={ElementStates.Changing} />
                  </div>
              )}
            </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
