import { render } from "../tools/render.js";
import { registrationFormView } from "../views/register.js";
import { createUser } from "../models/user.js";
import { login } from "../tools/auth.js";
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

export function registrationFormController(ctx) {
  return render(registrationFormView, {}, ctx);
}

export async function registrationController(ctx) {
  const { request } = ctx;
  const formData = await request.formData();
  const { isValid, errors, validated } = validateSchema(formData, userSchema);

  if (!isValid) {
    return render(registrationFormView, { errors }, ctx);
  }

  await createUser(validated);

  const headers = new Headers();
  login(headers, validated.username);
  return redirect("/", "User created", headers);
}