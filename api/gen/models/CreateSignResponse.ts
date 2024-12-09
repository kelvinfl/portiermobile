/* tslint:disable */
/* eslint-disable */
/**
 * portier KeyOnTheGo Service
 * Add basic auth for authorization when using cloud server. Use Account Id and M2M token for username and password respectively.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { NetworkInterface } from './NetworkInterface';
import {
    NetworkInterfaceFromJSON,
    NetworkInterfaceFromJSONTyped,
    NetworkInterfaceToJSON,
    NetworkInterfaceToJSONTyped,
} from './NetworkInterface';

/**
 * 
 * @export
 * @interface CreateSignResponse
 */
export interface CreateSignResponse {
    /**
     * 
     * @type {string}
     * @memberof CreateSignResponse
     */
    requestId?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSignResponse
     */
    token?: string;
    /**
     * 
     * @type {Array<NetworkInterface>}
     * @memberof CreateSignResponse
     */
    interfaces?: Array<NetworkInterface>;
}

/**
 * Check if a given object implements the CreateSignResponse interface.
 */
export function instanceOfCreateSignResponse(value: object): value is CreateSignResponse {
    return true;
}

export function CreateSignResponseFromJSON(json: any): CreateSignResponse {
    return CreateSignResponseFromJSONTyped(json, false);
}

export function CreateSignResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateSignResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'requestId': json['request_id'] == null ? undefined : json['request_id'],
        'token': json['token'] == null ? undefined : json['token'],
        'interfaces': json['interfaces'] == null ? undefined : ((json['interfaces'] as Array<any>).map(NetworkInterfaceFromJSON)),
    };
}

export function CreateSignResponseToJSON(json: any): CreateSignResponse {
    return CreateSignResponseToJSONTyped(json, false);
}

export function CreateSignResponseToJSONTyped(value?: CreateSignResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'request_id': value['requestId'],
        'token': value['token'],
        'interfaces': value['interfaces'] == null ? undefined : ((value['interfaces'] as Array<any>).map(NetworkInterfaceToJSON)),
    };
}

