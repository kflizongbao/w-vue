import { Hello } from '../index';
test('My Hello', () => {
  expect(Hello('Carl')).toBe('Hello Carl');
});