import { render } from "../tools/render.js";
import { notFoundView } from "../views/not-found.js";

export function notFoundController() {
return render(notFoundView);
}