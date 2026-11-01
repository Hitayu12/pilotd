import { AuthForm } from "@/components/shared/auth-form";

import { loginAction, magicLinkAction } from "../actions";

export default function LoginPage() {
  return <AuthForm mode="login" action={loginAction} magicLinkAction={magicLinkAction} />;
}
