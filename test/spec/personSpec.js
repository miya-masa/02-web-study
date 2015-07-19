/* global describe, it, expect, app */
describe('人', function() {
  'use strict';
  it('挨拶をする', function() {
    var me = new app.Person('Miya', 'Hello');
    expect(me.name).toBe('Miya');
    expect(me.greeting).toBe('Hello');
    expect(me.helloMessage()).toBe('Hello Miya');

    var me = new app.Person('Masa', 'GoodMorning');
    expect(me.name).toBe('Masa');
    expect(me.greeting).toBe('GoodMorning');
    expect(me.helloMessage()).toBe('Masa GoodMorning');
  });

});
