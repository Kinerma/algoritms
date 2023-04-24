import React from "react";
import stackStyle from './stack-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form className={stackStyle.form}>
        <Input type='text'
               maxLength={4}
               isLimitText />
        <Button type='submit'
                text='Добавить' />
        <Button type='submit'
                text='Удалить' />
        <Button type='submit'
                text='Очистить'
                extraClass={stackStyle.button} />
      </form>
    </SolutionLayout>
  );
};
