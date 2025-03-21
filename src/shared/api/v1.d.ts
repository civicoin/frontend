/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/system": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new system
         * @description Create a new system
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-0"]["createSystemSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["createSystemResponseSchema"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Login to a system
         * @description Login to a system
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-0"]["loginSystemSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["loginSystemResponseSchema"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system/systems": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get systems
         * @description Find systems by name
         */
        get: {
            parameters: {
                query?: {
                    name?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["systemResponseSchema"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get my system info
         * @description Get my system info
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["systemResponseSchema"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/system/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get public info of the system
         * @description Get public info of the system
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-0"]["systemResponseSchema"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/member": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new member
         * @description Create a new member
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-1"]["createMemberSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["createMemberResponseSchema"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/member/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Login to a member
         * @description Login to a member
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-1"]["loginMemberSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["loginMemberResponseSchema"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/member/private": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get member private key
         * @description Get member private key
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            encryptedPrivateKey?: string;
                            iv?: string;
                            salt?: string;
                            authTag?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/member/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get members
         * @description Find members by name
         */
        get: {
            parameters: {
                query?: {
                    name?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["memberResponseSchema"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/member/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get member of authed system
         * @description Get member of authed system
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-1"]["memberResponseSchema"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tx/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send coins to another member
         * @description Send coins to another member
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-2"]["sendTxSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tx/issue": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Issue coins to a member
         * @description Issue coins to a member
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["def-2"]["issueTxSchema"];
                };
            };
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/balance": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the balance of the current user
         * @description Get the balance of the current user
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Default Response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["def-3"]["balanceResponseSchema"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** system */
        "def-0": {
            createSystemSchema: {
                name: string;
                description?: string;
                coin: string;
                /** @enum {string} */
                restriction: "PUBLIC" | "PRIVATE";
                issuance: {
                    /** @enum {string} */
                    type: "LIMITED" | "UNLIMITED";
                    limit?: number;
                };
                password: string;
            };
            createSystemResponseSchema: {
                name: components["schemas"]["def-0"]["createSystemSchema"]["name"];
                description?: components["schemas"]["def-0"]["createSystemSchema"]["description"];
                coin: components["schemas"]["def-0"]["createSystemSchema"]["coin"];
                restriction: components["schemas"]["def-0"]["createSystemSchema"]["restriction"];
                issuance: components["schemas"]["def-0"]["createSystemSchema"]["issuance"];
                core: string;
                id: string;
                created: string;
                updated: string;
            };
            loginSystemSchema: {
                name: string;
                password: string;
            };
            loginSystemResponseSchema: {
                accessToken: string;
            };
            systemResponseSchema: {
                name: components["schemas"]["def-0"]["createSystemSchema"]["name"];
                description?: components["schemas"]["def-0"]["createSystemSchema"]["description"];
                coin: components["schemas"]["def-0"]["createSystemSchema"]["coin"];
                restriction: components["schemas"]["def-0"]["createSystemSchema"]["restriction"];
                issuance: components["schemas"]["def-0"]["createSystemSchema"]["issuance"];
                id: string;
                created: string;
                updated: string;
            };
        };
        /** member */
        "def-1": {
            createMemberSchema: {
                name: string;
                /** Format: uuid */
                systemId: string;
                password: string;
            };
            createMemberResponseSchema: {
                name: components["schemas"]["def-1"]["createMemberSchema"]["name"];
                id: string;
                created: string;
                updated: string;
            };
            loginMemberSchema: {
                name: string;
                systemId: components["schemas"]["def-1"]["createMemberSchema"]["systemId"];
                password: string;
            };
            loginMemberResponseSchema: {
                accessToken: string;
            };
            memberResponseSchema: {
                name: components["schemas"]["def-1"]["createMemberSchema"]["name"];
                id: string;
                /** @enum {string} */
                status: "VALIDATING" | "REJECTED" | "ACTIVE" | "DELETED";
                systemId: components["schemas"]["def-1"]["createMemberSchema"]["systemId"];
                created: string;
                updated: string;
            };
        };
        /** tx */
        "def-2": {
            sendTxSchema: {
                receiverId: string;
                amount: string;
                signature: string;
            };
            issueTxSchema: {
                receiverId: components["schemas"]["def-2"]["sendTxSchema"]["receiverId"];
                amount: components["schemas"]["def-2"]["sendTxSchema"]["amount"];
                signature: components["schemas"]["def-2"]["sendTxSchema"]["signature"];
            };
        };
        /** balance */
        "def-3": {
            balanceResponseSchema: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
