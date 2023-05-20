import {ElementStates} from "../../types/element-states";
import {Direction} from "../../types/direction";
import {bubbleSort, selectionSort} from "./sorting";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
    it('Сортировка пустого массива выбором по возрастанию', async () => {
        expect(await selectionSort([], Direction.Ascending)).toEqual([])
    });
    it('Сортировка пустого массива выбором по убыванию', async () => {
        expect(await selectionSort([], Direction.Descending)).toEqual([])
    });
    it('Сортировка пустого массива пузырьком по возрастанию', async () => {
        expect(await bubbleSort([], Direction.Ascending)).toEqual([])
    });
    it('Сортировка пустого массива пузырьком по убыванию', async () => {
        expect(await bubbleSort([], Direction.Descending)).toEqual([])
    });

    it('Сортировка массива из одного массива выбором по возрастанию', async () => {
        expect(await selectionSort([{value: 3, state: ElementStates.Default}], Direction.Ascending)).toEqual([{value: 3, state: ElementStates.Modified}])
    });
    it('Сортировка массива из одного массива выбором по убыванию', async () => {
        expect(await selectionSort([{value: 3, state: ElementStates.Default}], Direction.Descending)).toEqual([{value: 3, state: ElementStates.Modified}])
    });
    it('Сортировка массива из одного массива пузырьком по возрастанию', async () => {
        expect(await bubbleSort([{value: 3, state: ElementStates.Default}], Direction.Ascending)).toEqual([{value: 3, state: ElementStates.Modified}])
    });
    it('Сортировка массива из одного массива выбором по убыванию', async () => {
        expect(await bubbleSort([{value: 3, state: ElementStates.Default}], Direction.Descending)).toEqual([{value: 3, state: ElementStates.Modified}])
    });

    it('Сортировка массива из нескольких элементов массива выбором по возрастанию', async () => {
        expect(await selectionSort([
            {value: 1, state: ElementStates.Default},
            {value: 3, state: ElementStates.Default},
            {value: 6, state: ElementStates.Default}
        ], Direction.Ascending)).toEqual([
            {value: 1, state: ElementStates.Modified},
            {value: 3, state: ElementStates.Modified},
            {value: 6, state: ElementStates.Modified}
        ])
    });
    it('Сортировка массива из нескольких элементов массива выбором по убыванию', async () => {
        expect(await selectionSort([
            {value: 1, state: ElementStates.Default},
            {value: 3, state: ElementStates.Default},
            {value: 6, state: ElementStates.Default}
        ], Direction.Descending)).toEqual([
            {value: 6, state: ElementStates.Modified},
            {value: 3, state: ElementStates.Modified},
            {value: 1, state: ElementStates.Modified}
        ])
    });
    it('Сортировка массива из нескольких элементов массива пузырьком по возрастанию', async () => {
        expect(await bubbleSort([
            {value: 6, state: ElementStates.Default},
            {value: 3, state: ElementStates.Default},
            {value: 9, state: ElementStates.Default}
        ], Direction.Ascending)).toEqual([
            {value: 3, state: ElementStates.Modified},
            {value: 6, state: ElementStates.Modified},
            {value: 9, state: ElementStates.Modified}
        ])
    });
    it('Сортировка массива из нескольких элементов массива пузырьком по убыванию', async () => {
        expect(await bubbleSort([
            {value: 6, state: ElementStates.Default},
            {value: 3, state: ElementStates.Default},
            {value: 9, state: ElementStates.Default}
        ], Direction.Descending)).toEqual([
            {value: 9, state: ElementStates.Modified},
            {value: 6, state: ElementStates.Modified},
            {value: 3, state: ElementStates.Modified}
        ])
    });
})