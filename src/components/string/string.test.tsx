import {StringComponent} from './string'
import {BrowserRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('Корректный разворот строки', () => {
    it('с чётным количеством символов', async () => {
        render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId("input")
        const reverse = screen.getByTestId("reverse")
        const testString = "1234"
        userEvent.type(input, testString)
        userEvent.click(reverse)
        await waitFor(
            () => {
            const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
            expect(elements.join("")).toBe(Array(testString).reverse().join(""))
        }, {timeout: 1000})
    });
    it('с нечетным количеством символов', async () => {
        render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId("input")
        const reverse = screen.getByTestId("reverse")
        const testString = "12345"
        userEvent.type(input, testString)
        userEvent.click(reverse)
        await waitFor(() => {
            const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
            expect(elements.join("")).toBe(Array(testString).reverse().join(""))
        }, {timeout: 1000})
    });
    it('с одним символом', async () => {
        render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId("input")
        const reverse = screen.getByTestId("reverse")
        const testString = "1"
        userEvent.type(input, testString)
        userEvent.click(reverse)
        await waitFor(() => {
            const elements = screen.getAllByTestId("letter p").map((el) => el.textContent)
            expect(elements.join("")).toBe(Array(testString).reverse().join(""))
        }, {timeout: 1000})
    });
    it('пустую строку', async () => {
        render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId("input")
        const reverse = screen.getByTestId("reverse")
        userEvent.type(input, " ")
        expect(reverse).toBeDisabled()
    });
})

