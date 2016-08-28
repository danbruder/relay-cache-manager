'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Manages all cached records, including read/write and
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * deserialization.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _GraphQLRange = require('react-relay/lib/GraphQLRange');

var _GraphQLRange2 = _interopRequireDefault(_GraphQLRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * These types are being copied from RelayInternalTypes.
 * Relay does not currently offer a way to use internal
 * type definitions. Since this library is essentially
 * mimicking internal data structures, we just copy what we
 * need manually until a better solution presents itself.
 *
 * https://github.com/facebook/relay/blob/master/src/tools/RelayInternals.js
 */

var CacheRecordStore = function () {
  function CacheRecordStore(records, rootCallMap) {
    _classCallCheck(this, CacheRecordStore);

    this.records = records || {};
    this.rootCallMap = rootCallMap || {};
  }

  _createClass(CacheRecordStore, [{
    key: 'writeRootCall',
    value: function writeRootCall(storageKey, identifyingArgValue, dataId) {
      this.rootCallMap[storageKey] = dataId;
    }
  }, {
    key: 'writeRecord',
    value: function writeRecord(dataId, record) {
      this.records[dataId] = record;
    }
  }, {
    key: 'getDataIdFromRootCallName',
    value: function getDataIdFromRootCallName(callName, callValue) {
      return this.rootCallMap[callName];
    }
  }, {
    key: 'readNode',
    value: function readNode(dataID) {
      return this.records[dataID] || null;
    }

    /**
     * Takes an object that represents a partially
     * deserialized instance of CacheRecordStore
     * and creates a new instance from it. This is required
     * so that __range__ values can be correctly restored.
     */

  }], [{
    key: 'fromJSON',
    value: function fromJSON(_ref) {
      var records = _ref.records;
      var rootCallMap = _ref.rootCallMap;

      for (var key in records) {
        var record = records[key];
        var range = record.__range__;
        if (range) {
          record.__range__ = _GraphQLRange2.default.fromJSON(range);
        }
      }
      return new CacheRecordStore(records, rootCallMap);
    }
  }]);

  return CacheRecordStore;
}();

exports.default = CacheRecordStore;