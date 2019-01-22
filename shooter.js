var axios = require("axios");

function diffDatesInSeconds(date1, date2) {
    const dif = date2.getTime() - date1.getTime();

    const Seconds_from_T1_to_T2 = dif / 1000;
    return Math.abs(Seconds_from_T1_to_T2);
}

const Shooter = function () {
    let _timeout = 180000;
    let _success = function () {};
    let _err = function () {};
    const _promises = [];
    const _clearPromises = function () {
        while (_promises.length) {
            _promises.pop();
        }
    }

    this.setTimeout = function (value) {
        _timeout = value;
    }

    this.setSucess = function (cb) {
        _success = cb;
    }

    this.setError = function (cb) {
        _err = cb;
    }

    this.aim = function (times, method, url, data) {
        for (let index = 0; index < times; index++) {
            _promises.push(
                axios({
                    method,
                    timeout: _timeout,
                    url,
                    data
                })
                .then(_success)
                .catch(_err)
            );
        }
    }

    this.shoot = function (cb = function () {}) {
        const startDate = new Date();
        console.log('started shooting at: ' + startDate.toString());

        Promise.all(_promises).then(data => {
            if (cb && typeof cb === 'function') {
                cb(data);
            }

            const endDate = new Date();
            console.log('finished shooting at: ' + endDate.toString());

            console.log('Seconds elapsed: ' + diffDatesInSeconds(startDate, endDate))

            _clearPromises();
        });
    }
};

module.exports = Shooter;