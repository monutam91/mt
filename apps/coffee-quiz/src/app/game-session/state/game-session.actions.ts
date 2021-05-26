import { createAction, props } from '@ngrx/store';

export const createSession = createAction('[Game Session] Create', props<{ name: string }>());

export const createSessionSuccess = createAction(
    '[Game Session] Creation Successfull',
    props<{ name: string; token: string }>()
);

export const createSessionFailed = createAction('[Game Session] Creation Failed', props<{ reason: Error }>());

export const resetSession = createAction('[Game Session] Reset');

export const resetSessionFailed = createAction('[Game Session] Reset Failed', props<{ reason: Error }>());

export const resetSessionSuccess = createAction('[Game Session] Reset Successful');
