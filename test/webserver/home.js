import test from 'ava';
import request from 'supertest';
import persistence from '../../src/persistence';
import app from '../../src/webserver/app';

test.before(async (t) => {
  await persistence;
  t.context.request = request(app.callback());
});

test('foo', async (t) => {
  const res = await t.context.request.get('/');
  t.true(res.status === 200);
  t.true(res.text.includes('<title>DAGFlow</title>'));
});
