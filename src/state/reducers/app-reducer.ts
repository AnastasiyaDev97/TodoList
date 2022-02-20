import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nullable } from "../../type/Nullable";
import { RequestStatusType } from "../../enum/index";

const { Idle } = RequestStatusType;

const initialState = {
  status: Idle,
  error: null as Nullable<string>,
  isInitialize: false,
};
export type appInitialStateType = {
  status: RequestStatusType;
  error: Nullable<string>;
  isInitialize: boolean;
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    toggleIsInitialize(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialize = action.payload.value;
    },

    setRequestStatus(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {state.status = action.payload.status;},

    setErrorText(state, action: PayloadAction<{ error: Nullable<string> }>) {
      state.error = action.payload.error;
    },
  },
});

export const { setRequestStatus, toggleIsInitialize, setErrorText } =
  slice.actions;
export const appReducer = slice.reducer;
