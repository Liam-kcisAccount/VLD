# VLD Portfolio — Setup Guide

A plain HTML/CSS/JS site (no build step, no framework) with an admin
panel at `/admin` for editing content, and a public site that anyone
can read without logging in. This matches the assignment: you have
write access, your teacher has read-only access automatically (they
just visit the link — there's nothing for them to log into).

## How it works

- The public pages (`index.html`, `course-log.html`, `journal.html`,
  `bio.html`, `evidence.html`) read their content from JSON files in
  `/content/` at page load, using plain JavaScript `fetch()`.
- `/admin/` is [Decap CMS](https://decapcms.org) (the actively
  maintained fork of the old "Netlify CMS"). It gives you a form-based
  editor for those same JSON files. When you save, it commits the
  change to your GitHub repo, and Netlify automatically rebuilds and
  redeploys the site — usually within about a minute.
- Logging into `/admin/` requires **Netlify Identity**, restricted to
  people you personally invite. Nobody else can log in, and nobody
  needs to log in to just read the site.

## One-time setup (about 15–20 minutes)

1. **Create a GitHub repository.**
   Go to github.com → New repository → give it a name (e.g.
   `vld-portfolio`) → keep it **public or private, either works** →
   create it empty (no README/gitignore).

2. **Upload these files to the repo.**
   Easiest way with no command line: on the repo's GitHub page, click
   "Add file" → "Upload files", then drag in everything from this
   folder (keeping the folder structure: `css/`, `js/`, `content/`,
   `admin/`, plus the `.html` files, `netlify.toml`, and this
   `README.md`). Commit.

3. **Create the Netlify site from that repo.**
   In Netlify → "Add new site" → "Import an existing project" →
   choose GitHub → select your repo. Leave the build settings blank
   (there is no build command — publish directory is `.`, which
   `netlify.toml` already sets). Deploy.

4. **Turn on Identity.**
   In your new Netlify site → Site configuration → Identity → Enable
   Identity.

5. **Restrict who can register.**
   Identity → Registration → set to **Invite only**. This is the step
   that keeps everyone except you out of `/admin/`.

6. **Turn on Git Gateway.**
   Identity → Services → Git Gateway → Enable Git Gateway. This is
   what lets the CMS commit to GitHub on your behalf, using Netlify's
   own permissions rather than your personal GitHub password.

7. **Invite yourself.**
   Identity → Invite users → enter your own email (your school email
   is fine). You'll get an email with a confirmation link — click it,
   set a password.

8. **Log in and start editing.**
   Visit `https://YOUR-SITE-NAME.netlify.app/admin/`, log in, and
   you'll see five sections: Home Page, Course Log, Reflection
   Journal, Learner Bio, Evidence. Edit the seed/placeholder text in
   each — everything currently says "replace this" — then Save. The
   site rebuilds automatically.

9. **Give your teacher the plain site link, not the admin link.**
   `https://YOUR-SITE-NAME.netlify.app/` is all they need. They never
   see or need `/admin/`.

## Editing week to week

Every session: go to `YOUR-SITE-NAME.netlify.app/admin/`, log in,
open **Reflection Journal**, add a new entry under "Entries," fill in
the four fields, save. Do the same for **Course Log** whenever you
make real progress, and for **Evidence** whenever you finish
something worth showing.

## Notes

- Content lives as JSON in `/content/`. If you ever want to edit it
  by hand instead of through `/admin/`, that works too — just keep
  the same field names, or the pages won't know how to display it.
- `img/uploads/` is where Decap CMS would store any images you upload
  through the CMS media picker (not used by the seed content, but
  wired up in `admin/config.yml` in case you add photos/certificates
  later — remember the site's own safety rules about not posting
  identifying photos).
- If `/admin/` shows a blank screen, it's almost always because Git
  Gateway or Identity isn't enabled yet, or you haven't accepted your
  invite email.
