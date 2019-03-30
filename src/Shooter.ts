import axios from "axios";
import Util from './Util';


class Shooter {
    _timeout: number;
    _success: (data: any) => void;
    _err: (err: any) => void;
    _promises: Array<Promise<any>>;
    _clearPromises: Function;
    
    constructor() {
        this._timeout = 180000;
        this._success = () => {};
        this._err = () => {};
        this._promises = [];
        this._clearPromises = function(): void {
            while (this._promises.length) {
                this._promises.pop();
            }
        }
    }

    setTimeout(value: number) {
        this._timeout = value;
    }

    setSucess(cb: (data: any) => void) {
        this._success = cb;
    }

    setError(cb: (data: any) => void) {
        this._err = cb;
    }

    aim(times: number, method: string, url: string, data?: any): void {
        for (let index = 0; index < times; index++) {
            const config = {
                method,
                timeout: this._timeout,
                url,
                data
            };

            this._promises.push(
                axios(config)
                .then(data => this._success(data))
                .catch(err => this._err(err))
            );
        }
    }

    shoot(cb = function (data?: any) {}): void {
        const startDate = new Date();
        console.log('started shooting at: ' + startDate.toString());

        Promise.all(this._promises).then(data => {
            if (cb && typeof cb === 'function') {
                cb(data);
            }

            const endDate = new Date();
            console.log('finished shooting at: ' + endDate.toString());

            console.log('Seconds elapsed: ' + Util.diffDatesInSeconds(startDate, endDate))

            this._clearPromises();
        });
    }
}

export default Shooter;
