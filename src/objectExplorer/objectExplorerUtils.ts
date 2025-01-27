/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as path from 'path';
import { TreeNodeInfo } from './treeNodeInfo';
import { IConnectionProfile } from '../models/interfaces';
import Constants = require('../constants/constants');
import LocalizedConstants = require('../constants/localizedConstants');

export class ObjectExplorerUtils {

    public static readonly rootPath: string = path.join(__dirname, 'objectTypes');

    public static iconPath(label: string): string {
        if (label) {
            if (label === Constants.disconnectedServerLabel) {
                // if disconnected
                label = `${Constants.serverLabel}_red`;
            } else if (label === Constants.serverLabel) {
                // if connected
                label += '_green';
            }
            return path.join(ObjectExplorerUtils.rootPath, `${label}.svg`);
        }
    }

    public static getNodeUri(node: TreeNodeInfo): string {
        const profile = <IConnectionProfile>node.connectionCredentials;
        return ObjectExplorerUtils.getNodeUriFromProfile(profile);
    }

    public static getNodeUriFromProfile(profile: IConnectionProfile): string {
        const uri = `${profile.server}_${profile.database}_${profile.user}_${profile.profileName}`;
        return uri;
    }

    public static getDatabaseName(node: TreeNodeInfo): string {
        if (node.nodeType === Constants.serverLabel) {
            return node.connectionCredentials.database;
        }
        while (node) {
            if (node.nodeType === Constants.databaseString) {
                return node.label;
            }
            node = node.parentNode;
        }
        return LocalizedConstants.defaultDatabaseLabel;
    }
}
