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
/**
 * 
 * @export
 * @interface Issue
 */
export interface Issue {
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    number: string;
    /**
     * 
     * @type {number}
     * @memberof Issue
     */
    copy: number;
    /**
     * 
     * @type {string}
     * @memberof Issue
     */
    description?: string;
}

/**
 * Check if a given object implements the Issue interface.
 */
export function instanceOfIssue(value: object): value is Issue {
    if (!('number' in value) || value['number'] === undefined) return false;
    if (!('copy' in value) || value['copy'] === undefined) return false;
    return true;
}

export function IssueFromJSON(json: any): Issue {
    return IssueFromJSONTyped(json, false);
}

export function IssueFromJSONTyped(json: any, ignoreDiscriminator: boolean): Issue {
    if (json == null) {
        return json;
    }
    return {
        
        'number': json['number'],
        'copy': json['copy'],
        'description': json['description'] == null ? undefined : json['description'],
    };
}

export function IssueToJSON(json: any): Issue {
    return IssueToJSONTyped(json, false);
}

export function IssueToJSONTyped(value?: Issue | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'number': value['number'],
        'copy': value['copy'],
        'description': value['description'],
    };
}
