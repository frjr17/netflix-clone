import { useAuthState } from ".";
import { magic } from "../../magic";

export const login = async (props: { email: string }) => {
  try {
    const token = await magic.auth.loginWithEmailOTP({
      email: props.email,
    });
    if (token) {
      useAuthState.setState({ email: props.email, token });
    }
  } catch (error) {}
};
