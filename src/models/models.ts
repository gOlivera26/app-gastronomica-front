export interface LoginRequest{
    username: string;
    password: string;
}

export interface LoginResponse{
    token: string;
}
export interface ForgotPasswordRequest{
    email: string;
}
export interface UpdateCredentialsResponse{
    token: string;
    newPassword: string;
}
export interface ForgotPasswordResponse{
    username : string;
}
export interface UpdateCredentialsRequest{
    username: string;
    verificationCode: string;
}