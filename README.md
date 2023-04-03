# fudit-app

User story 1 - Bootstrap:

- User can load the app in the browser.
- User can see a loading indicator while the app is loading.
- User cannot see an icon indicating that the user is logged in.
- User is redirected to the login page if access token is invalid or missing.
- User is redirected to list of dietary plans if access token is valid.

User story 2 - Authentication:

- User can login to the app, by typing their username and password in text fields.
- User can see the username they logged in with on the page after login.
- User can see a button that says "Logout" on the page after login.
- User can click the logout button to logout.
- When a user logs out, they can no longer see the data they got from the API.
- When a user logs out, they can no longer see the "Logout" button.
- When a user logs out, they can see a button or a link to the login page.
- The app can handle login errors. For example when the server returns a 401 error because the password is wrong.
- The app makes a POST request to `https://localhost:3002/login` when the user clicks the login button.
- The app saves the token that it gets from the server in localStorage.
- When a user opens the app should try to fetch data from the API with the token that is saved in localStorage. If this request fails the user should be sent to the login page.
- User can reset their password by filling out a form with their email. They are sent an email with a link to a "reset password" page.
- User can update their profile by filling out a form with the first name, last name and email.
- User can see their profile information on a separate page.
