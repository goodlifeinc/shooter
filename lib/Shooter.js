"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Util_1 = require("./Util");
var Shooter = /** @class */ (function () {
    function Shooter() {
        this._timeout = 180000;
        this._success = function () { };
        this._err = function () { };
        this._promises = [];
        this._clearPromises = function () {
            while (this._promises.length) {
                this._promises.pop();
            }
        };
    }
    Shooter.prototype.setTimeout = function (value) {
        this._timeout = value;
    };
    Shooter.prototype.setSucess = function (cb) {
        this._success = cb;
    };
    Shooter.prototype.setError = function (cb) {
        this._err = cb;
    };
    Shooter.prototype.aim = function (times, method, url, data) {
        var _this = this;
        for (var index = 0; index < times; index++) {
            var config = {
                method: method,
                timeout: this._timeout,
                url: url,
                data: data
            };
            this._promises.push(axios_1.default(config)
                .then(function (data) { return _this._success(data); })
                .catch(function (err) { return _this._err(err); }));
        }
    };
    Shooter.prototype.shoot = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = function (data) { }; }
        var startDate = new Date();
        console.log('started shooting at: ' + startDate.toString());
        Promise.all(this._promises).then(function (data) {
            if (cb && typeof cb === 'function') {
                cb(data);
            }
            var endDate = new Date();
            console.log('finished shooting at: ' + endDate.toString());
            console.log('Seconds elapsed: ' + Util_1.default.diffDatesInSeconds(startDate, endDate));
            _this._clearPromises();
        });
    };
    return Shooter;
}());
exports.default = Shooter;
//# sourceMappingURL=Shooter.js.map