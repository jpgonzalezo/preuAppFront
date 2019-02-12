export declare type TdParamType = 'param' | 'response' | 'body' | 'queryParams';
export declare const tdHttpRESTParam: Symbol;
/**
 * Abstract implementation of the http param decorator
 * @internal
 */
export declare function TdAbstractParam(type: TdParamType, param?: string): Function;
