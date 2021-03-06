'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The public API for RelayCacheManager. Users should
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * pass an instance of this class to `injectCacheManager`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _CacheWriter = require('./CacheWriter');

var _CacheWriter2 = _interopRequireDefault(_CacheWriter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RelayCacheManager = function () {
  function RelayCacheManager(options) {
    _classCallCheck(this, RelayCacheManager);

    this.cacheWriter = new _CacheWriter2.default(options);
  }

  _createClass(RelayCacheManager, [{
    key: 'clear',
    value: function clear() {
      this.cacheWriter.clearStorage();
    }
  }, {
    key: 'getMutationWriter',
    value: function getMutationWriter() {
      return this.cacheWriter;
    }
  }, {
    key: 'getQueryWriter',
    value: function getQueryWriter() {
      return this.cacheWriter;
    }
  }, {
    key: 'getAllRecords',
    value: function getAllRecords() {
      return this.cacheWriter.cache.records;
    }
  }, {
    key: 'readNode',
    value: function readNode(id, callback) {
      var node = this.cacheWriter.readNode(id);
      setImmediate(callback.bind(null, null, node));
    }
  }, {
    key: 'readRootCall',
    value: function readRootCall(callName, callValue, callback) {
      this.cacheWriter.readRootCall(callName, callValue, callback);
    }
  }]);

  return RelayCacheManager;
}();

exports.default = RelayCacheManager;