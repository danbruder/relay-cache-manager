'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  Implements the CacheWriter interface specified by
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  RelayTypes, uses an instance of CacheRecordStore
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  to manage the CacheRecord instances
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _CacheRecordStore = require('./CacheRecordStore');

var _CacheRecordStore2 = _interopRequireDefault(_CacheRecordStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CACHE_KEY = '__RelayCacheManager__';

var CacheWriter = function () {
  function CacheWriter() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CacheWriter);

    this.cacheKey = options.cacheKey || DEFAULT_CACHE_KEY;
    try {
      var localCache = localStorage.getItem(this.cacheKey);
      if (localCache) {
        localCache = JSON.parse(localCache);
        this.cache = _CacheRecordStore2.default.fromJSON(localCache);
      } else {
        this.cache = new _CacheRecordStore2.default();
      }
    } catch (err) {
      this.cache = new _CacheRecordStore2.default();
    }
  }

  _createClass(CacheWriter, [{
    key: 'clearStorage',
    value: function clearStorage() {
      localStorage.removeItem(this.cacheKey);
      this.cache = new _CacheRecordStore2.default();
    }
  }, {
    key: 'writeField',
    value: function writeField(dataId, field, value, typeName) {
      var record = this.cache.records[dataId];
      if (!record) {
        record = {
          __dataID__: dataId,
          __typename: typeName
        };
      }
      record[field] = value;
      this.cache.records[dataId] = record;
      try {
        var serialized = JSON.stringify(this.cache);
        localStorage.setItem(this.cacheKey, serialized);
      } catch (err) {
        /* noop */
      }
    }
  }, {
    key: 'writeNode',
    value: function writeNode(dataId, record) {
      this.cache.writeRecord(dataId, record);
    }
  }, {
    key: 'readNode',
    value: function readNode(dataId) {
      var record = this.cache.readNode(dataId);
      return record;
    }
  }, {
    key: 'writeRootCall',
    value: function writeRootCall(storageKey, identifyingArgValue, dataId) {
      this.cache.rootCallMap[storageKey] = dataId;
    }
  }, {
    key: 'readRootCall',
    value: function readRootCall(callName, callValue, callback) {
      var dataId = this.cache.rootCallMap[callName];
      setImmediate(callback.bind(null, null, dataId));
    }
  }]);

  return CacheWriter;
}();

exports.default = CacheWriter;