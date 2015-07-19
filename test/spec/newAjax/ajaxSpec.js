/* global describe, it, expect, app */
describe('非同期制御', function() {
  'use strict';
  var Counter = function() {
    this.count = 0;
  }
  Counter.prototype.getCount = function() {
    return this.count;
  }
  Counter.prototype.countUp = function() {
    this.count++;
  };

  beforeEach(function() {
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('非同期の挙動', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();
    var newAjax = app.newAjax;

    for (var i = 0; i < 5; ++i) {
      var no = i;
      newAjax.lightAjax().done(function() {
        console.log('no' + light.getCount() + ':new light Finished!!');
        light.countUp();
      });
      newAjax.randomAjax().done(function() {
        console.log('no' + random.getCount() + ':new random Finished!!');
        random.countUp();
      });
      newAjax.heavyAjax().done(function() {
        console.log('no' + heavy.getCount() + ':new heavy Finished!!');
        heavy.countUp();
      });
    }
    jasmine.clock().tick(10000);
  });

  it('非同期の順番制御。heavy -> random -> light', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();
    var newAjax = app.newAjax;
    var d = new $.Deferred();
    var p = d.promise();
    for (var i = 0; i < 5; i++) {
      p = p.then(newAjax.heavyAjax).then(function() {
        var d = new $.Deferred();
        console.log('no' + heavy.getCount() + ':new heavy Finished!!');
        heavy.countUp();
        return d.resolve();
      }).
      then(newAjax.randomAjax).then(function() {
        var d = new $.Deferred();
        console.log('no' + random.getCount() + ':new random Finished!!');
        random.countUp();
        return d.resolve();
      }).then(function() {
        var d = new $.Deferred();
        console.log('no' + light.getCount() + ':new light Finished!!');
        light.countUp();
        return d.resolve();
      }).then(newAjax.lightAjax);
    }

    d.resolve();
    jasmine.clock().tick(100000);
  });
});
