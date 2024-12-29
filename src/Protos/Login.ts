/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.20.3
 * source: User.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from 'google-protobuf';
import * as grpc_1 from '@grpc/grpc-js';
export namespace auth {
    export class LoginRequest extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(
            data?:
                | any[]
                | {
                      email?: string;
                      password?: string;
                  },
        ) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == 'object') {
                if ('email' in data && data.email != undefined) {
                    this.email = data.email;
                }
                if ('password' in data && data.password != undefined) {
                    this.password = data.password;
                }
            }
        }
        get email() {
            return pb_1.Message.getFieldWithDefault(this, 1, '') as string;
        }
        set email(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get password() {
            return pb_1.Message.getFieldWithDefault(this, 2, '') as string;
        }
        set password(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: { email?: string; password?: string }): LoginRequest {
            const message = new LoginRequest({});
            if (data.email != null) {
                message.email = data.email;
            }
            if (data.password != null) {
                message.password = data.password;
            }
            return message;
        }
        toObject() {
            const data: {
                email?: string;
                password?: string;
            } = {};
            if (this.email != null) {
                data.email = this.email;
            }
            if (this.password != null) {
                data.password = this.password;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.email.length) writer.writeString(1, this.email);
            if (this.password.length) writer.writeString(2, this.password);
            if (!w) return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LoginRequest {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
                message = new LoginRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup()) break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.email = reader.readString();
                        break;
                    case 2:
                        message.password = reader.readString();
                        break;
                    default:
                        reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): LoginRequest {
            return LoginRequest.deserialize(bytes);
        }
    }
    export class LoginResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(
            data?:
                | any[]
                | {
                      accessToken?: string;
                      refreshToken?: string;
                  },
        ) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == 'object') {
                if ('accessToken' in data && data.accessToken != undefined) {
                    this.accessToken = data.accessToken;
                }
                if ('refreshToken' in data && data.refreshToken != undefined) {
                    this.refreshToken = data.refreshToken;
                }
            }
        }
        get accessToken() {
            return pb_1.Message.getFieldWithDefault(this, 1, '') as string;
        }
        set accessToken(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get refreshToken() {
            return pb_1.Message.getFieldWithDefault(this, 2, '') as string;
        }
        set refreshToken(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: { accessToken?: string; refreshToken?: string }): LoginResponse {
            const message = new LoginResponse({});
            if (data.accessToken != null) {
                message.accessToken = data.accessToken;
            }
            if (data.refreshToken != null) {
                message.refreshToken = data.refreshToken;
            }
            return message;
        }
        toObject() {
            const data: {
                accessToken?: string;
                refreshToken?: string;
            } = {};
            if (this.accessToken != null) {
                data.accessToken = this.accessToken;
            }
            if (this.refreshToken != null) {
                data.refreshToken = this.refreshToken;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.accessToken.length) writer.writeString(1, this.accessToken);
            if (this.refreshToken.length) writer.writeString(2, this.refreshToken);
            if (!w) return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LoginResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes),
                message = new LoginResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup()) break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.accessToken = reader.readString();
                        break;
                    case 2:
                        message.refreshToken = reader.readString();
                        break;
                    default:
                        reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): LoginResponse {
            return LoginResponse.deserialize(bytes);
        }
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    export abstract class UnimplementedAuthServiceService {
        static definition = {
            Login: {
                path: '/auth.AuthService/Login',
                requestStream: false,
                responseStream: false,
                requestSerialize: (message: LoginRequest) => Buffer.from(message.serialize()),
                requestDeserialize: (bytes: Buffer) => LoginRequest.deserialize(new Uint8Array(bytes)),
                responseSerialize: (message: LoginResponse) => Buffer.from(message.serialize()),
                responseDeserialize: (bytes: Buffer) => LoginResponse.deserialize(new Uint8Array(bytes)),
            },
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract Login(call: grpc_1.ServerUnaryCall<LoginRequest, LoginResponse>, callback: grpc_1.sendUnaryData<LoginResponse>): void;
    }
    export class AuthServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedAuthServiceService.definition, 'AuthService', {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>) {
            super(address, credentials, options);
        }
        Login: GrpcUnaryServiceInterface<LoginRequest, LoginResponse> = (
            message: LoginRequest,
            metadata: grpc_1.Metadata | grpc_1.CallOptions | grpc_1.requestCallback<LoginResponse>,
            options?: grpc_1.CallOptions | grpc_1.requestCallback<LoginResponse>,
            callback?: grpc_1.requestCallback<LoginResponse>,
        ): grpc_1.ClientUnaryCall => {
            return super.Login(message, metadata, options, callback);
        };
    }
}
