The purpose of this application is to keep track of the external IP address of a server.

Every 5 minutes it polls for its external IP.

If it changes, it sends a post to the app.js server, which should be running on a machine with a static external IP.
