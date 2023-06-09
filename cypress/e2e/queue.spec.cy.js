import {circle, defaultColor, changingColor, circleContent} from "../constants";

describe('Тестирование Очередь', () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get("input").should("be.empty")
    cy.contains("Добавить").should("be.disabled")
  })

  it('Проверка правильности добавления элемента в очередь', () => {
    for (let j = 0; j < 7; j++) {
      cy.get("input").should('be.empty').type(j).wait(500)
      cy.contains("Добавить").should("be.visible").click()
      cy.get(circle).as("circle")
      cy.get('[data-cy="border"]').as('border')
      cy.get('@border').eq(j).should('have.text', j).should('have.css', 'border-color', changingColor).parent().should("contain", "tail")
      cy.wait(500)
      cy.get('@border').eq(j).should("have.css", "border-color", defaultColor)
    }
    cy.get(circleContent).as("content")
    cy.get('@content').first().contains('head').should('contain', 'head')
  })

  it('Проверка правильности удаления элемента из очереди', () => {
    cy.get("input").type("12").should('have.value', '12')
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)
    cy.get("input").type("13").should('have.value', '13')
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)
    cy.get("input").type("14").should('have.value', '14')
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)

    cy.get(circle).as("circle").first()
    cy.contains("Удалить").should("be.visible").click()
    cy.get(`@circle`).should('have.css', 'border-color', changingColor).contains('1')
    cy.wait(500)
    cy.get(`@circle`).should('have.css', 'border-color', defaultColor).should('not.have.text')
    cy.get(`@circle`).eq(0).prev().should('not.have.text', 'head')
    cy.get(`@circle`).eq(1).prev().should('have.text', 'head')

  })

  it('Проверка поведения кнопки «Очистить».', () => {
    cy.get("input").type("123").should('have.value', '123')
    cy.contains("Добавить").should("be.visible").click()
    cy.wait(500)

    cy.get("input").type("15").should('have.value', '15')
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