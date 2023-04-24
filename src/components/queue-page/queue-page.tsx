import React from "react";
import queueStyle from './queue-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <form className={queueStyle.form}>
        <Input type='text'
               maxLength={4}
               isLimitText
               placeholder='Введите значение' />
        <Button type='submit'
                text='Добавить' />
        <Button type='submit'
                text='Удалить' />
        <Button type='submit'
                text='Очистить'
                extraClass={queueStyle.button} />
      </form>
    </SolutionLayout>
  );
};
