import { AccountActionTypes } from "./types";
import { action } from "typesafe-actions";
import { UserInfo } from "firebase";

export const signIn = (user: UserInfo | null) => action(AccountActionTypes.SIGN_IN, user);

export const setUser = (user: UserInfo) => action(AccountActionTypes.SET_USER, user);

export const signOut = () => action(AccountActionTypes.SIGN_OUT);

