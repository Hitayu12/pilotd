import { AuthForm } from "@/components/shared/auth-form";

import { magicLinkAction, signupAction } from "../actions";

export default function SignupPage() {
  return <AuthForm mode="signup" action={signupAction} magicLinkAction={magicLinkAction} />;
}
