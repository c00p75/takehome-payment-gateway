/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Banner from '../components/banner/Banner';

it('matches snapshot', () => {
  const tree = renderer.create(
    <Banner />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
