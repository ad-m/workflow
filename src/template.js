import ejs from 'ejs';

const macros = {
  randomInt: (low, high) => Math.floor(Math.random() * (high - low) + low),
};

export default function render(template, context) {
  return ejs(template, { ...context, ...macros });
}
