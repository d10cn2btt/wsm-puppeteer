import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
    set(data) {
        if (chrome !== undefined && chrome.storage !== undefined) {
            chrome.storage.local.set(data);
        }
    }

    get(key, callback) {
        if (chrome !== undefined && chrome.storage !== undefined) {
            chrome.storage.local.get(key, (items) => {
                callback(chrome.runtime.lastError ? null : items);
            })
        }
    }
}
