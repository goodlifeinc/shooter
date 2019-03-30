const Shooter = require('../lib');
const params = require('./params');

const shooter = new Shooter();

shooter.setTimeout(180000);
shooter.setError(onError);

shooter.aim(15, 'get', 'https://www.siteground.com/');

shooter.aim(15, 'post', 'http://localhost:8002/api/v1/cbs/account', params.searchAccountParams);

shooter.shoot(afterShoot);

const onError = function (error) {
    if (error.response && error.response.status != '400') {
        return {
            err: error.response.data.error.message
        };
    } else {
        console.log(error);
        return {
            err: error.message
        };
    }
};

const afterShoot = data => {
    const totalResponses = data.length;
    data = data.filter(i => i);
    const grouped = {};
    grouped['totalErrors'] = data.length;
    grouped['totalResponses'] = totalResponses;
    grouped['byMessages'] = data.reduce((memo, next) => {
        if (!memo[next.err]) memo[next.err] = 0;
        if (typeof next.err === 'undefined') {
            console.log(next);
        }
        memo[next.err] += 1;
        return memo;
    }, {});
    console.log(grouped);
};
