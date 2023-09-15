/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import PaymentForm from '../components/paymentForm/PaymentForm';

it('matches snapshot', () => {
  const setShowForm = jest.fn();
  const showPaymentForm = true;
  const tree = renderer.create(
    <PaymentForm setShowForm={setShowForm} showPaymentForm={showPaymentForm} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
