import { render } from "../tools/render.js";
import { staffView } from "../views/staff.js";
import { getStaff, createStaff } from "../models/staff.js";
import { storeFile } from "../models/file.js";
import { validateSchema } from "../tools/validation.js";
import { newStaffSchema } from "../tools/validation.js";
import { redirect } from "../tools/redirect.js";

export function staffController() {
 const staff = getStaff();
 return render(staffView, { staff });
}

export async function createStaffController({ request }) {
 const formData = await request.formData();
 
 const { isValid, errors, validated } = validateSchema(formData,
newStaffSchema);
 if (!isValid) {
 const staff = getStaff();
 return render(staffView, { staff, errors }, 400);
 }
 // All valid - store the file and create the staff member
 const fileId = await storeFile(validated.profileImage);
 createStaff({
 name: validated.name,
 title: validated.title,
 profileImageId: fileId
 });
 return redirect("/staff");
}
// import { render } from "../tools/render.js";
// import { getStaff, createStaff } from "../models/staff.js";
// import { storeFile } from "../models/file.js";
// import { validateSchema, newStaffSchema } from "../tools/validation.js";
// import { staffView } from "../views/staff.js";

// export function staffController() {
//   const staff = getStaff();
//   return render(staffView, { staff });
// }

// export async function createStaffController({ request }) {
//   const formData = await request.formData();

//   const { isValid, errors, validated } = validateSchema(formData, newStaffSchema);

//   if (!isValid) {
//     const staff = getStaff();
//     return render(staffView, { staff, errors }, 400);
//   }

//   const fileId = await storeFile(validated.profileImage);

//   createStaff({
//     name: validated.name,
//     title: validated.title,
//     profileImageId: fileId
//   });

//   return new Response(null, {
//     status: 303,
//     headers: {
//       Location: "/staff"
//     }
//   });
// }