//what this does: Gets the staff member from the database
//Finds the image id stored in profileImage, 
// Loads the actual image from the files table, Sends the image back to the browser
import { getStaffById } from "../models/staff.js";
import { getFile } from "../models/file.js";

export function profileController({ staffId }) {
  const staff = getStaffById(staffId);

  if (!staff || !staff.profileImage) {
    return new Response("Not Found", { status: 404 });
  }

  const file = getFile(staff.profileImage);

  if (!file) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(file);
}