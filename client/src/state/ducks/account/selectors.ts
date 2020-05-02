import { ApplicationState } from '../index';

export const getUid = (state: ApplicationState) => state.account.user?.uid;