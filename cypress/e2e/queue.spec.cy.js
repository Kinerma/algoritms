import {circle, defaultColor, changingColor} from "../constants";

describe('Тестирование Очередь', () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get("input").should("be.empty")
    cy.contains("Добавить").should("be.disabled")
  })

  it('Проверка правильности добавления элемента в очередь', () => {

  })

  it('Проверка правильности удаления элемента из очереди', () => {

  })

  it('Проверка поведения кнопки «Очистить».', () => {
    cy.clock()
    cy.get("input").type("123")
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)

    cy.get("input").type("15")
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)

    cy.get("input").should("have.value", "")
    cy.contains("Очистить").should("be.visible").click()
    cy.get(circle).as("circle")
    cy.get('@circle').should(($circle) => {
      expect($circle).to.contain('').to.have.css("border-color", defaultColor)
    })
  })
})