// tools/validation.js === add the characters only no integers 

export function required(name, value) {
    if (!value || String(value).trim() === "") return `'${name}' is a required field.`;
  }
  
  export function minLength(min) {
    return (name, value) => {
      if (value && String(value).trim().length < min) {
        return `'${name}' must be at least ${min} characters.`;
      }
    };
  }
  
  export function maxLength(max) {
    return (name, value) => {
      if (value && String(value).trim().length > max) {
        return `'${name}' must be at most ${max} characters.`;
      }
    };
  }
  
  export function validateField(name, value, validators) {
    for (const validator of validators) {
      const error = validator(name, value);
      if (error) return error;
    }
  }
  
  export function validateSchema(formData, schema) {
    let isValid = true;
    const validated = {};
  
    const schemaEntries = Object.entries(schema);
    const errorEntries = schemaEntries.map(([key, { validators, displayName }]) => {
      const value = formData.get(key);
      const message = validateField(displayName || key, value, validators) || "";
  
      if (message) {
        isValid = false;
      } else {
        validated[key] = value;
      }
  
      return [key, { value, message, error: !!message }];
    });
  
    const errors = Object.fromEntries(errorEntries);
    return { errors, isValid, validated };
  }

  // these validators work with file objects from form submission
  //this is done to keep the file safe 
  export function isFileType(...allowedTypes) {
    return (name, file) => {
      if(!(file instanceof File)) return `'${name}' must be a file.`;
      if(!allowedTypes.includes(file.type)) {
        return `'${name}' must be one of: ${allowedTypes.join(", ")}`;
      }
    };
  }

  export function maxFileSize(maxBytes){
    return (name, file) => {
      if ((file instanceof File) && file.size > maxBytes) {
        return `'${name}' must be smaller than ${maxBytes / 1024}KB.`;
      }
    };
  }

  //staff schema for validation 
  //For file fields, we don't use required since the file size check will fail
  //if no file is provided 

  export const newStaffSchema = {
  name: {
    validators: [required, minLength(2), maxLength(100)],
    displayName: "Staff Name"
  },
  title: {
    validators: [required, minLength(2), maxLength(100)],
    displayName: "Job Title"
  },
  profileImage: {
    validators: [
      isFileType("image/jpeg", "image/png", "image/gif", "image/webp"),
      maxFileSize(5 * 1024 * 1024) // 5MB limit
    ],
    displayName: "Profile Image"
  }
};