import { useAuthState } from ".";
import { magic } from "../../magic";
import { useUserState } from "../user";

export const login = async (props: { email: string }) => {
  const authState = useAuthState;
  authState.setState({ isFetching: true });
  try {
    const token = await magic.auth.loginWithEmailOTP({
      email: props.email,
    });

    if (token) {
      useAuthState.setState({ email: props.email, token });
      authState.setState({ isFetching: false });
    } else {
      throw "Not token returned!";
    }

    return token;
  } catch (error) {
    useAuthState.setState({ error });
    authState.setState({ isFetching: false });
  }
};

export const verify = async () => {
  const authState = useAuthState;
  const userState = useUserState;

  authState.setState({ isFetching: true });
  try {
    const isLoggedIn = await magic.user.isLoggedIn();

    if (!isLoggedIn) {
      authState.getState().deleteEverything();
      userState.getState().deleteEverything();
    }

    authState.setState({ isFetching: false });
    return isLoggedIn;
  } catch (error) {}

  authState.setState({ isFetching: false });
};
