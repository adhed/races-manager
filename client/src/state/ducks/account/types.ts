import { UserInfo } from "firebase";

export interface AccountState {
    readonly isLoggedIn: boolean;
    readonly user: UserInfo | null;
}

export const AccountActionTypes = {
    SIGN_IN: '@@account/SIGN_IN',
    SIGN_OUT: '@@account/SIGN_OUT',
};
