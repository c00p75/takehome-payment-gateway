/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import Footer from '../components/footer/Footer';

it('matches snapshot', () => {
  const tree = renderer.create(
    <Footer />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
