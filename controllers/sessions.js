import { render } from "../tools/render.js";
import { loginFormView } from "../views/login.js";
import { validateCredentials } from "../models/user.js";
import { login, logout } from "../tools/auth.js";
import { validateSchema, required, minLength, maxLength } from "../tools/validation.js";
import { redirect } from "../tools/redirect.js";

const userSchema = {
  username: {
    validators: [required, minLength(2), maxLength(30)],
    displayName: "Username",
  },
  password: {
    validators: [required, minLength(6), maxLength(100)],
    displayName: "Password",
  },
};

export function loginFormController(ctx) {
  return render(loginFormView, {}, ctx);
}

export async function loginController(ctx) {
  const { request } = ctx;
  const formData = await request.formData();
  const { isValid, errors, validated } = validateSchema(formData, userSchema);

  if (!isValid) {
    return render(loginFormView, { errors }, ctx);
  }

  const { ok, err } = await validateCredentials(validated);

  if (!ok) {
    return render(loginFormView, { errors: { ...err, ...errors } }, ctx);
  }

  const headers = new Headers();
  login(headers, validated.username);
  return redirect("/", `logged in as '${validated.username}'`, headers);
}

export function logoutController(ctx) {
  const { session, request } = ctx;
  const headers = new Headers();

  if (session) {
    logout(headers, request);
  }

  return redirect("/", "logged out", headers);
}