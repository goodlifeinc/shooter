"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.diffDatesInSeconds = function (date1, date2) {
        var dif = date2.getTime() - date1.getTime();
        var Seconds_from_T1_to_T2 = dif / 1000;
        return Math.abs(Seconds_from_T1_to_T2);
    };
    return Util;
}());
exports.default = Util;
//# sourceMappingURL=Util.js.map