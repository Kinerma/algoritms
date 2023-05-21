import {circle, defaultColor, changingColor} from "../constants";

describe('Тестирование Стэк', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get("input").should("be.empty")
    cy.contains("Добавить").should("be.disabled")
  })
  it('Проверка правильности добавления элемента в стек', () => {
    cy.get("input").type("123").should("have.value", "123")
    cy.contains("Добавить").should("be.visible").click()

    cy.get(circle).as("circle")
    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(1)
      expect($circle).to.contain("123").to.have.css("border-color", changingColor)
    })
    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(1)
      expect($circle).to.contain("123").to.have.css("border-color", defaultColor)
    })
  })
  it('Проверка правильности удаления элемента из стека', () => {
    cy.get("input").type("345").should("have.value", "345")
    cy.contains("Добавить").should("be.visible").click()

    cy.get(circle).as("circle")
    cy.contains("Удалить").should("be.visible").click()
    cy.get('@circle').should('have.css', 'border-color', changingColor)
    cy.get('@circle').should('have.length', 0);
  })
  it('Проверка поведения кнопки «Очистить».', () => {
    cy.get("input").type("123").should("have.value", "123")
    cy.contains("Добавить").should("be.visible").click()
    cy.get("input").type("24").should("have.value", "24")
    cy.contains("Добавить").should("be.visible").click()
    cy.get("input").type("345").should("have.value", "345")
    cy.contains("Добавить").should("be.visible").click()

    cy.get(circle).as("circle")
    cy.get("input").should("have.value", "")
    cy.contains("Очистить").should("be.visible").click()
    cy.get("@circle").should("have.length", 0)
  })
})