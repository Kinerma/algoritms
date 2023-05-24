import {defaultColor, changingColor, modifiedColor, circle} from "../constants";

describe('Тестирование Строки', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get("input").should("be.empty")
    cy.contains("Развернуть").should("be.disabled")
  })
  it('Проверка, что строка разворачивается корректно', async () => {
    cy.clock()
    cy.get("input").type("1234").should("have.value", "1234")
    cy.contains('Развернуть').should("be.visible").click()
    cy.tick(1000)

    cy.get(circle).as("circle")
    cy.get("@circle").should(($circle) => {
      expect($circle).to.have.length(4)
      expect($circle.eq(0)).to.have.text("1").and.css("border-color", defaultColor)
      expect($circle.eq(1)).to.have.text("2").and.css("border-color", defaultColor)
      expect($circle.eq(2)).to.have.text("3").and.css("border-color", defaultColor)
      expect($circle.eq(3)).to.have.text("4").and.css("border-color", defaultColor)
    })
    cy.tick(1000)

    cy.get("@circle").should(($circle) => {
      expect($circle.eq(0)).to.have.text("1").and.css("border-color", changingColor)
      expect($circle.eq(1)).to.have.text("2").and.css("border-color", defaultColor)
      expect($circle.eq(2)).to.have.text("3").and.css("border-color", defaultColor)
      expect($circle.eq(3)).to.have.text("4").and.css("border-color", changingColor)
    })
    cy.tick(1000)

    cy.get("@circle").should(($circle) => {
      expect($circle.eq(0)).to.have.text("4").and.css("border-color", modifiedColor)
      expect($circle.eq(1)).to.have.text("2").and.css("border-color", changingColor)
      expect($circle.eq(2)).to.have.text("3").and.css("border-color", changingColor)
      expect($circle.eq(3)).to.have.text("1").and.css("border-color", modifiedColor)
    })
    cy.tick(1000)

    cy.get("@circle").should(($circle) => {
      expect($circle.eq(0)).to.have.text("4").and.css("border-color", modifiedColor)
      expect($circle.eq(1)).to.have.text("3").and.css("border-color", modifiedColor)
      expect($circle.eq(2)).to.have.text("2").and.css("border-color", modifiedColor)
      expect($circle.eq(3)).to.have.text("1").and.css("border-color", modifiedColor)
    })
  })
})