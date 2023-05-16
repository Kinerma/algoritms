import {Button} from "./button";
import {render, screen, fireEvent} from "@testing-library/react";
import renderer from 'react-test-renderer'

describe('Button', () => {
    it('Отрисовка кнопки с текстом', function () {
        const button = renderer.create(<Button text='text' />).toJSON()
        expect(button).toMatchSnapshot()
    });
    it('Отрисовка кнопки без текста', function () {
        const button = renderer.create(<Button />).toJSON()
        expect(button).toMatchSnapshot()
    });
    it('Отрисовка заблокированной кнопки', function () {
        const button = renderer.create(<Button disabled />).toJSON()
        expect(button).toMatchSnapshot()
    });
    it('Отрисовка кнопки с индикацией загрузки', function () {
        const button = renderer.create(<Button isLoader />).toJSON()
        expect(button).toMatchSnapshot()
    });
    it('Проверяем корректность вызова колбека при клике на кнопку', function () {
        const onClick = jest.fn()
        render(<Button onClick={onClick} />)
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    });
})
