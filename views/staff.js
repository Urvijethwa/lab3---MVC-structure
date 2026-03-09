import { escape } from "@std/html";

export function staffView({ staff = [], errors = {} }) {

  const staffHtml = staff.map(member => `
    <article class="staff-member">
      <figure>
        <img
          src="/staff/${member.id}/profile"
          alt="${escape(member.name)}"
          loading="lazy"
        >
        <figcaption>
          <h3>${escape(member.name)}</h3>
          <p class="title">${escape(member.title)}</p>
        </figcaption>
      </figure>
    </article>
  `).join("");

  return `
    <h2>Staff Directory</h2>

    <section class="staff-grid">
      ${staffHtml}
    </section>

    <section class="add-staff">
      <h3>Add New Staff Member</h3>

      <form method="POST" action="/staff" enctype="multipart/form-data">

        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value="${escape(errors.name?.value || "")}"
          >
          <span class="error">${errors.name?.message || ""}</span>
        </div>

        <div class="form-group">
          <label for="title">Job Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value="${escape(errors.title?.value || "")}"
          >
          <span class="error">${errors.title?.message || ""}</span>
        </div>

        <div class="form-group">
          <label for="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
          >
          <span class="error">${errors.profileImage?.message || ""}</span>
        </div>

        <button type="submit">Add Staff Member</button>

      </form>
    </section>
  `;
}

//important 
// form must include:
//enctype="multipart/form-data"