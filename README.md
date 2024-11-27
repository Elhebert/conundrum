# Conundrum

A small web app to create private, encrypted and secure notes shareable with a link.

## How it works

The content of the notes is end-to-end encrypted using the browser [Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto).

A new password is randomly generated for each note. From that password and a random 12 bits salt I derive a new key. This ensures that each note is encrypted with a different key.
The salt, chiper and iv are stored in an SQLITE database, while the password is added the hash of the Link to ensure it is never send to the server.

The link contains the note ID. To avoid sequential IDs, we are using ulids instead of auto incremental integers. And to decrease risk even more, the note ID is encrypted on the server before returned to the user. This means you can't guess the id to a random note.

Thanks to all of this, nobody except the person with the link can access the content of the note. Not even people with access to the database or the server.

Once viewed (or after 24 hours) the note is deleted from the database, making it impossible to read again.

## Built with
- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Inertia](https://inertiajs.com)
- [Tailwind CSS](https://tailwindcss.com)
