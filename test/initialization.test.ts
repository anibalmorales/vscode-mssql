/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import assert = require('assert');
import vscode = require('vscode');

import * as Extension from '../src/extension';
import ConnectionManager from '../src/controllers/connectionManager';
import MainController from '../src/controllers/mainController';
import Telemetry from '../src/models/telemetry';

function ensureExtensionIsActive(): Promise<any> {
    return new Promise((resolve, reject) => {
        waitForExtensionToBeActive(resolve);
    });
}

function waitForExtensionToBeActive(resolve): void {
    if (typeof(vscode.extensions.getExtension('ms-mssql.mssql')) === 'undefined' ||
        !vscode.extensions.getExtension('ms-mssql.mssql').isActive) {
        setTimeout(waitForExtensionToBeActive.bind(this, resolve), 50);
    } else {
        resolve();
    }
}

suite('Initialization Tests', () => {
    setup(() => {
        // Ensure that telemetry is disabled while testing
        Telemetry.disable();
    });

    test('Connection manager is initialized properly', () => {
        // Wait for the extension to activate
        ensureExtensionIsActive().then(() => {
            // Verify that the connection manager was initialized properly
            let controller: MainController = Extension.getController();
            let connectionManager: ConnectionManager = controller.connectionManager;
            assert.notStrictEqual(undefined, connectionManager.client);
        });
    });
});
