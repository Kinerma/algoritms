import React from "react";
import listStyle from './list-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form className={listStyle.form}>
        <div className={listStyle.value}>
          <Input placeholder='Введите значение'/>
          <Button text='Добавить в head'
                  extraClass={listStyle.valueButton}  />
          <Button text='Добавить в tail'
                  extraClass={listStyle.valueButton}  />
          <Button text='Удалить в head'
                  extraClass={listStyle.valueButton}  />
          <Button text='Удалить в tail'
                  extraClass={listStyle.valueButton}  />
        </div>
        <div className={listStyle.index}>
          <Input placeholder='Введите индекс' />
          <Button text='Добавить по индексу'
                  extraClass={listStyle.indexButton}  />
          <Button text='Удалить по индексу'
                  extraClass={listStyle.indexButton} />
        </div>
      </form>
      <div className={listStyle.circles}>
        <div>
          <Circle />
          <ArrowIcon />
        </div>
      </div>
    </SolutionLayout>
  );
};
