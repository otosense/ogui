import { createGlobalState } from "react-hooks-global-state";

const initialState = { nodesErrorMapping: [] };
let { setGlobalState, useGlobalState } = createGlobalState(initialState);
export { setGlobalState, useGlobalState };