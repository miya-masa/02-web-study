/* global describe, it, expect, app */
describe('人', function() {
  'use strict';
  it('挨拶をする', function() {
    var me = new app.Person('Miya', 'Hello');
    expect(me.name).toBe('Miya');
    expect(me.greeting).toBe('Hello');
    expect(me.helloMessage()).toBe('Hello Miya');
  });

});
