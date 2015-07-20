/* global describe, it, expect, app */
xdescribe('オブジェクトのコンストラクタ', function() {
  'use strict';
  it('Objectのコンストラクタを理解する', function() {
    var obj = {};
    expect(obj.constructor).toBe(Object);
    expect(obj.prototype).toBe(undefined);
    expect(obj.constructor.prototype).toBe(Object.prototype);
  });

});
