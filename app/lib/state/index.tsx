import { StoreApi, UseBoundStore, create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { IForm, IUseForm, useForm } from "./form";

/**
 * Interface for the properties of a state object.
 */
export interface IStateProps<
  InitialState extends object,
  Functions extends object,
  Forms extends object
> {
  /** The initial state object. */
  initialState: InitialState;
  /** The functions object. */
  functions: Functions;
  /** The forms object. */
  forms: Forms;
  /** Optional persistence options. */
  persist?: PersistOptions<
    TStateStructure<InitialState, Functions, Forms>,
    TStateStructure<InitialState, Functions, Forms>
  >;
}

/**
 * Type that represents the state structure.
 */
export type TStateStructure<
  InitialState extends object,
  Functions extends object,
  Forms extends Record<string, any> & Partial<IForm<any>>
> = InitialState &
  Forms &
  Functions & {
    /** A boolean that indicates if the state is currently being fetched. */
    isFetching: boolean;
    /** An object that represents the error, if any. */
    error: any;
    /** Returns a specific form from the state based on its name. */
    // eslint-disable-next-line no-unused-vars
    useForm: (formName: keyof Forms) => IUseForm<Forms>;
    /**
     * A function that deletes everything except specified keys.
     * @param but - The keys to keep in the state object.
     */
    // eslint-disable-next-line no-unused-vars
    deleteEverything: (...but: string[]) => void;
  };

/**
 * Class that represents a state object.
 */
export default class State<
  InitialState extends object,
  Functions extends object,
  Forms extends Record<string, any> & Partial<IForm<any>>
> {
  /** The initial state object. */
  initialState: InitialState;
  /** The state object. */
  state: UseBoundStore<
    StoreApi<TStateStructure<InitialState, Functions, Forms>>
  > & { persist?: { clearStorage: () => void } };
  /** The forms object. */
  forms: Forms;

  /**
   * Constructor for the State class.
   * @param props - The properties of the state object.
   */
  constructor(props: IStateProps<InitialState, Functions, Forms>) {
    this.initialState = props.initialState;
    this.forms = props.forms;

    if (props.persist) {
      this.state = create<TStateStructure<InitialState, Functions, Forms>>()(
        persist(
          () => ({
            isFetching: false,
            error: undefined,
            ...this.initialState,
            ...props.functions,
            ...props.forms,
            deleteEverything: this.deleteEverything, // Adds deleteEverything function to the state object.
            useForm: this.useForm,
          }),
          { ...props.persist }
        )
      );
    } else {
      this.state = create<TStateStructure<InitialState, Functions, Forms>>()(
        () => ({
          isFetching: false,
          error: undefined,
          ...this.initialState,
          ...props.functions,
          ...props.forms,
          deleteEverything: this.deleteEverything, // Adds deleteEverything function to the state object.
          useForm: this.useForm,
        })
      );
    }
  }

  /**
   * Returns a specific form from the state based on its name.
   * @param formName - The name of the form to retrieve.
   * @returns The form object, or undefined if the form does not exist.
   */
  useForm = (formName: keyof Forms) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useForm<InitialState, Functions, Forms>(formName, this.state);
  };

  /**
   * A function that deletes everything except specified keys.
   * @param but - The keys to keep in the state object.
   */
  deleteEverything = (...but: string[]) => {
    if (this.state.persist) {
      this.state.persist.clearStorage(); // Clears the storage, if persistence is enabled.
    }
    if (!but.length) {
      // If no keys are specified, reset the state to its initial state.
      return this.state.setState({
        ...(this.initialState as TStateStructure<
          InitialState,
          Functions,
          Forms
        >),
        ...this.forms,
      });
    }

    const newState = { ...this.state.getState() };

    // Loops through each key in the initial state.
    for (let key in this.initialState) {
      // If the key is not included in the but array, reset its value in the state.
      if (!but.includes(key)) {
        newState[key as keyof TStateStructure<InitialState, Functions, Forms>] =
          this.initialState[key];
      }
    }
    this.state.setState({ ...newState, ...this.forms });
  };
}
