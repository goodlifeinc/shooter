# @genata/shooter

[![npm (scoped)](https://img.shields.io/npm/v/@genata/shooter.svg)](https://www.npmjs.com/package/@genata/shooter)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@genata/shooter.svg)](https://www.npmjs.com/package/@genata/shooter)

Simple stress load shooter. Sends asynchronous requests with shooting technique.  
Aim it at targets, and shoot them.

## Install

```
$ npm install @genata/shooter
```

## Usage

```js
const Shooter = require("@genata/shooter");
const params = require('./params');

const shooter = new Shooter();

shooter.setError(onError);

shooter.aim(15, 'get', 'https://www.google.com/');
shooter.aim(15, 'post', 'http://localhost:8002/api/v1/account', params.searchAccountParams);

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
```

## Api

* `setTimeout(Number)` - in mileseconds
* `setError(fn)` - callback when request returns error(4xx, 5xx HTTP Status codes)
* `setSucecss(fn)` - callback when request returns success(2xx HTTP Status codes)
* `shoot(fn)` - method that performs all "aimed" operations. It accepts optional callback function. After shoot() is performed same instance of `Shooter` can be reused for new aims.