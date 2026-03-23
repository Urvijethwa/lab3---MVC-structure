export function loginFormView({ errors = {} }) { 
    return `<section class="center">
    <h2>Sign in</h2>
    <p>
    Don't have an account?
    <a href="/register">Sign up here</a>
    </p>
    <form action="/sessions" method="POST" class="fancy">
    <span class="error">${errors.credentials || ""}</span>
    <label for="username">Username: </label>
    <input type="text" id="username" name="username"
   value="${errors.username?.value || ""}" required>
    <span class="error">${errors.username?.message || ""}</span>
    <label for="password">Password: </label>
    <input type="password" id="password" name="password"
   value="${errors.password?.value || ""}" required>
    <span class="error">${errors.password?.message || ""}</span>
    <button>sign in</button>
    </form>
   </section>`
   }