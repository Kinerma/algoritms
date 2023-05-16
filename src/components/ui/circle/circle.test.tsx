import {Circle} from "./circle";
import renderer from "react-test-renderer";
import {ElementStates} from "../../../types/element-states";

describe('Компонент Circle', () => {
    it('Корректная отрисовка элемента без буквы', function () {
        const element = renderer.create(<Circle />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента с буквами', function () {
        const element = renderer.create(<Circle letter='text' />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента с head', function () {
        const element = renderer.create(<Circle head='head' />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка с react-элементом в head', function () {
        const element = renderer.create(<Circle head={<Circle />} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента с tail', function () {
        const element = renderer.create(<Circle tail='tail' />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка с react-элементом в tail', function () {
        const element = renderer.create(<Circle tail={<Circle />} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента с index', function () {
        const element = renderer.create(<Circle index={0} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента с пропом isSmall === true', function () {
        const element = renderer.create(<Circle isSmall={true} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента в состоянии default', function () {
        const element = renderer.create(<Circle state={ElementStates.Default} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента в состоянии changing', function () {
        const element = renderer.create(<Circle state={ElementStates.Changing} />).toJSON()
        expect(element).toMatchSnapshot()
    });
    it('Корректная отрисовка элемента в состоянии modified', function () {
        const element = renderer.create(<Circle state={ElementStates.Modified} />).toJSON()
        expect(element).toMatchSnapshot()
    });
})