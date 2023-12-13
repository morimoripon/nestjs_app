export declare type AuthUser = {
    uid: string;
    email?: string;
    provider: string;
    emailVerified: boolean;
};
export declare const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
