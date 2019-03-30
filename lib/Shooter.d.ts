declare class Shooter {
    _timeout: number;
    _success: (data: any) => void;
    _err: (err: any) => void;
    _promises: Array<Promise<any>>;
    _clearPromises: Function;
    constructor();
    setTimeout(value: number): void;
    setSucess(cb: (data: any) => void): void;
    setError(cb: (data: any) => void): void;
    aim(times: number, method: string, url: string, data?: any): void;
    shoot(cb?: (data?: any) => void): void;
}
export default Shooter;
