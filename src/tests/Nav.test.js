/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Nav from '../components/nav/Nav';

it('matches snapshot', () => {
  const tree = renderer.create(
    <Nav />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
