import { useAuthState } from ".";
import { useUserState } from "../user";
import { Magic } from "magic-sdk";

export const magic = () =>
  typeof window !== "undefined"
    ? new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY as string)
    : undefined;

export const login = async (props: { email: string }) => {
  const authState = useAuthState;
  authState.setState({ isFetching: true });
  try {
    const token = await magic()?.auth.loginWithEmailOTP({
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
    const isLoggedIn = await magic()?.user.isLoggedIn();

    if (!isLoggedIn) {
      authState.getState().deleteEverything();
      userState.getState().deleteEverything();
    }

    authState.setState({ isFetching: false });
    return isLoggedIn;
  } catch (error) {}

  authState.setState({ isFetching: false });
};

export async function signOut() {
  const auth = useAuthState;
  const user = useUserState;
  auth.setState({ isFetching: true });
  try {
    await magic()?.user.logout();
    auth.getState().deleteEverything();
    user.getState().deleteEverything();
  } catch (error) {
    console.log(error);
  }
  auth.setState({ isFetching: false });
}
