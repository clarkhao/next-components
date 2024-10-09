"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import json from "../../../data/zod.json";
import { PswValidate, TCompare, Validate } from "../../../lib/zod";
import { RootState } from "../../../store";
import { add, del } from "../../../store/slices/error";

export type TValue = string | number | readonly string[] | undefined;
export type TInputState = {
  isBlured: boolean;
  inputValue: TValue;
  /**
   * error is the error message from validating
   */
  error: Array<string>;
  result: string;
  compare: Array<TCompare>;
  requestErr: string | undefined;
};
type TInputPayload = {
  reset: undefined;
  "set-blur": boolean;
  "set-value": string | undefined;
  "add-error": { err: Array<string>; compare: Array<TCompare> };
  "clear-error": Array<TCompare>;
  "set-result": string;
  "add-requestErr": string;
  "clear-requestErr": undefined;
  "set-compare": Array<TCompare>;
};
export type IInputAction = {
  type: keyof TInputPayload;
  payload: TInputPayload[IInputAction["type"]];
};

function useInput(value: TValue, requestErr?: string, name?: string, validated?: boolean) {
  const dispatch = useDispatch();
  const errState = useSelector((state: RootState) => state.error.errors);
  const debounceTimer = React.useRef<number>(0);
  const initInputState: TInputState = {
    isBlured: false,
    inputValue: value ?? "",
    error: [],
    result: "prev",
    compare: [],
    requestErr: undefined,
  };
  const inputReducer = (state: TInputState, action: IInputAction) => {
    switch (action.type) {
      case "reset":
        return initInputState;
      case "set-blur":
        return {
          ...state,
          isBlured: action.payload as boolean,
        };
      case "set-value": {
        return {
          ...state,
          inputValue: action.payload as TValue,
        };
      }
      case "add-error": {
        return {
          ...state,
          error: (action.payload as TInputPayload["add-error"]).err,
          result: "error",
          compare: (action.payload as TInputPayload["add-error"]).compare,
        };
      }
      case "clear-error": {
        return {
          ...state,
          error: [],
          result: state.requestErr ? "error" : "success",
          compare: action.payload as TInputPayload["clear-error"],
        };
      }
      case "set-result":
        return {
          ...state,
          result: action.payload as string,
        };
      case "add-requestErr":
        return {
          ...state,
          requestErr: action.payload as string,
          result: "error",
        };
      case "clear-requestErr": {
        return {
          ...state,
          requestErr: undefined,
        };
      }
      case "set-compare":
        return {
          ...state,
          compare: action.payload as Array<TCompare>,
          error: [],
          result: "success",
        };
      default:
        return state;
    }
  };

  const [inputState, inputDispatch] = React.useReducer(inputReducer, initInputState);
  React.useEffect(() => {
    if (requestErr) {
      inputDispatch({
        type: "add-requestErr",
        payload: requestErr,
      });
    }
  }, [requestErr]);
  React.useEffect(() => {
    if (validated) {
      const verifyData = () => {
        const data = JSON.stringify(json);
        const key = JSON.parse(data)[`${name}`];
        const validate =
          name === "password"
            ? new PswValidate(key, name as string, (inputState.inputValue as string).length)
            : new Validate(key, name as string);
        const errors = validate.verify(inputState.inputValue);

        const msg = errors?.map((el) => {
          return el.message;
        });
        const { result, pass } = validate.compare(errors);
        console.log(result, pass);
        if (errors !== null && !pass) {
          if (!errState[`${name}-verify`]) {
            dispatch(
              add({
                from: `${name}-verify`,
                message: inputState.error.join("."),
              }),
            );
          }
          inputDispatch({
            type: "add-error",
            payload: { err: msg!, compare: result },
          });
        } else if (errors !== null && pass) {
          if (errState[`${name}-verify`]) dispatch(del(`${name}-verify`));
          inputDispatch({
            type: "set-compare",
            payload: result,
          });
        } else {
          if (errState[`${name}-verify`]) dispatch(del(`${name}-verify`));
          inputDispatch({
            type: "clear-error",
            payload: result,
          });
        }
      };
      if (inputState.inputValue && validated) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = window.setTimeout(() => {
          verifyData();
        }, 300);
      } else {
        inputDispatch({
          type: "reset",
          payload: undefined,
        });
      }
    }
    return () => clearTimeout(debounceTimer.current);
  }, [
    dispatch,
    inputState.inputValue,
    inputState.isBlured,
    inputState.requestErr,
    name,
    validated,
  ]);
  useEffect(() => {
    if (errState[`${name}`]) {
      dispatch(del(name as string));
      inputDispatch({ type: "clear-requestErr", payload: undefined });
    }
  }, [inputState.inputValue]);

  return { inputState, inputDispatch };
}

export { useInput };
