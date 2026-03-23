export function render(viewFunction, viewData = {}, ctx = {}) {
  const { session = null, status = 200 } = ctx;
  const content = viewFunction(viewData);

  const sessionMessage = session ? `Logged in as ${session.username}` : "";
  const authNav = session
    ? `<form method="POST" action="/logout"><button type="submit">Logout</button></form>`
    : `<a href="/login">Login</a>`;

  return new Response(
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Website</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="container">
      <header>
        <h1>My Website</h1>
      </header>

      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/staff">Staff</a></li>
          <li><a href="/items">Items</a></li>
          <li>${authNav}</li>
        </ul>
      </nav>

      <main>
        ${content}
      </main>

      <footer>
        <p>${sessionMessage}</p>
        <p>&copy; 2026 My Website. All rights reserved.</p>
      </footer>
    </div>
  </body>
</html>`,
    {
      headers: { "content-type": "text/html; charset=utf-8" },
      status
    }
  );
}

// export function render(viewFunction, viewData = {}) {
//     const content = viewFunction(viewData);
  
//     return new Response(
//       `<!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>My Website</title>
//       <link rel="stylesheet" href="/style.css">
//     </head>
//     <body>
//       <div class="container">
//       <header>
//         <h1>My Website</h1>
//       </header>
  
//       <nav>
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/about">About</a></li>
//           <li><a href="/contact">Contact</a></li>
//           <li><a href="/staff">Staff</a></li>
//           <li><a href="/items">Items</a></li>
//         </ul>
//       </nav>
  
//       <main>
//         ${content}
//       </main>
  
//       <footer>
//         <p>&copy; 2026 My Website. All rights reserved.</p>
//       </footer>
//       </div>
//     </body>
//   </html>`,
//       { headers: { "content-type": "text/html; charset=utf-8" } }
//     );
//   }
// // export function render(viewFunction, viewData = {}) {
// //     const content = viewFunction(viewData);
// //     return new Response(
// //     `<!DOCTYPE html>
// //     <html>
// //     <head>
// //     <meta charset="utf-8">
// //     <title>My Website</title>
// //     <link rel="stylesheet" href="style.css">
// //     </head>
// //     <body>
// //     <header>
// //     <h1>My Website</h1>
// //     </header>
// //     <nav>
// //     <ul>
// //         <li><a href="/">Home</a></li>
// //         <li><a href="/about">About</a></li>
// //         <li><a href="/contact">Contact</a></li>
// //         <li><a href="/items">Items</a></li>
// //     </ul>
// //     </nav>
// //     <main>
// //     ${content}
// //     </main>
// //     <footer>
// //     <p>&copy; 2026 My Website. All rights reserved.</p>
// //     </footer>
// //     </body>
// //     </html>`,
// // { headers: { "content-type": "text/html; charset=utf-8" } }
// // );
// // }