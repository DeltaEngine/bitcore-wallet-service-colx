'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var BlockchainExplorer = require('../lib/blockchainexplorer');

describe('Blockchain explorer', function() {
  describe('#constructor', function() {
    it('should return a blockchain explorer with basic methods', function() {
      var exp = new BlockchainExplorer({
        provider: 'insight',
        network: 'testnet',
        url: 'http://localhost'//'https://insight.colossusxt.org'
      });
      should.exist(exp);
      exp.should.respondTo('broadcast');
      exp.should.respondTo('getUtxos');
      exp.should.respondTo('getTransactions');
      exp.should.respondTo('getAddressActivity');
      exp.should.respondTo('estimateFee');
      exp.should.respondTo('initSocket');
      var exp = new BlockchainExplorer({
        provider: 'insight',
        network: 'livenet',
        url: 'http://localhost'//'https://insight.colossusxt.org'
      });
      should.exist(exp);
    });
    it('should fail on missing URL', function () {
        (function() {
            var exp = new BlockchainExplorer({
                provider: 'insight',
                network: 'testnet',
            });
        }).should.throw('Missing URL in config file');
    });
    it('should fail on missing provider', function () {
        (function() {
            var exp = new BlockchainExplorer({
                network: 'testnet',
                url: 'http://localhost'//'https://insight.colossusxt.org'
            });
        }).should.throw('Missing provider in config file');
    });
    it('should fail on missing network', function () {
        (function() {
            var exp = new BlockchainExplorer({
                provider: 'insight',
                url: 'http://localhost'//'https://insight.colossusxt.org'
            });
        }).should.throw('Missing network in config file');
    });
    it('should fail on unsupported provider', function() {
      (function() {
        var exp = new BlockchainExplorer({
          provider: 'dummy',
          network: 'testnet',
          url: 'http://localhost'//'https://insight.colossusxt.org'
        });
      }).should.throw('not supported');
    });
  });
});
