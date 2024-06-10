interface ErrorState {
  resetKey: any;
  error: string;
  data?: undefined;
}

interface DataState {
  error: null;
  data: {
    id: string;
    bookIds: string[];
    title: string;
    authorId: string | null;
  };
  resetKey: string;
}

interface InitialState {
  error: null;
  resetKey: any;
}

type State = ErrorState | DataState | InitialState;

export default State;
