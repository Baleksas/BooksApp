import { Collection } from "./Collection";

interface ErrorState {
  resetKey: any;
  error: string;
  data?: undefined;
}

export interface DataState {
  error: null;
  data: Collection;
  resetKey: string;
}

interface InitialState {
  error: null;
  resetKey: any;
}

type State = ErrorState | DataState | InitialState;

export default State;
