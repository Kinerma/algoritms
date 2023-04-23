import React, {useEffect, useState} from "react";
import sortingStyle from './sorting-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
       <form className={sortingStyle.form}>
          <div className={sortingStyle.radio}>
            <RadioInput label="Выбор"
                      value='sorting'
                      />
            <RadioInput label='Пузырек'
                      value='bubble' />
          </div>
          <div className={sortingStyle.button}>
            <Button text='По возрастанию' />
            <Button text='По убыванию' />
          </div>
          <Button text='Новый массив'
                  type='submit' />
       </form>
    </SolutionLayout>
  );
};
