import { render } from "../tools/render.js";
import { contactView } from "../views/contact.js";

export function contactController() {
    return render(contactView);
}