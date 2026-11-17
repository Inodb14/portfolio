# Inoussa Simporé — Portfolio website

A static website (HTML, CSS, JavaScript). No build step: upload the files and it works.

```
index.html          Home
about.html          About
experience.html     Experience
projects.html       Projects (filter + search)
project.html        One case study page, filled from data.js (project.html?id=...)
contact.html        Contact form
404.html            Page not found
assets/js/config.js   <- YOUR SETTINGS (email, CV, form)
assets/js/data.js     <- YOUR CONTENT (projects, experience, skills)
assets/img/           images
apps-script/Code.gs   code for the Google Sheet that stores form messages
```

---

## 1. Put the site online with GitHub Pages

1. On GitHub, create a new repository. Two choices:
   - Name it **`inodb14.github.io`** → the site will be at `https://inodb14.github.io/`
   - Or any name, e.g. `portfolio` → the site will be at `https://inodb14.github.io/portfolio/`
2. Click **Add file → Upload files**, and drag **everything inside this folder** (not the folder itself).
   `index.html` must be at the top level of the repository.
3. Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes and open the link GitHub shows you.

To update the site later: upload the changed files again (same names), commit, wait a minute.

---

## 2. Your CV button

1. Create the folder `assets/cv/` and put your PDF in it, e.g. `assets/cv/Inoussa_Simpore_CV.pdf`.
2. In `assets/js/config.js`, set:
   ```js
   cvUrl: 'assets/cv/Inoussa_Simpore_CV.pdf',
   ```
The "Download CV" buttons appear automatically. While `cvUrl` is empty, they are hidden.

---

## 3. Make the contact form save messages (Google Sheets, free)

Every message is saved as a row in your own Google Sheet, and you get an email.
Press **Reply** in Gmail to answer the person directly.

1. Go to <https://sheets.google.com> with **inousasimpore226@gmail.com** and create a blank sheet.
   Name it `Portfolio messages`.
2. In the sheet: **Extensions → Apps Script**.
3. Delete the code you see, and paste everything from `apps-script/Code.gs`. Click **Save** (disk icon).
4. At the top, choose the function **`setup`** and click **Run**.
   Google asks for permission: **Review permissions → your account → Advanced → Go to project (unsafe) → Allow**.
   (It says "unsafe" only because you wrote the script yourself; it only touches this sheet and sends you emails.)
   A tab **Messages** with headers is created.
5. Click **Deploy → New deployment**. Click the gear icon → **Web app**.
   - Description: `Contact form`
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy** and copy the **Web app URL** (it ends with `/exec`).
6. In `assets/js/config.js`, paste it:
   ```js
   form: {
     provider: 'google',
     endpoint: 'https://script.google.com/macros/s/XXXXXXXX/exec',
     web3formsKey: ''
   }
   ```
7. Upload `config.js` to GitHub again. Open your site, send yourself a test message, and check the sheet.

**Answering messages:** reply from the email you receive, then set the **Status** column to `Replied`.

**If you change Code.gs later:** Deploy → Manage deployments → edit (pencil) → Version: **New version** → Deploy. The URL stays the same.

### Other option: Formspree
Create a free form at <https://formspree.io>, then:
```js
form: { provider: 'formspree', endpoint: 'https://formspree.io/f/YOUR_ID', web3formsKey: '' }
```
Messages are emailed to you and kept in your Formspree dashboard.

While `endpoint` is empty, the form does not fail: it tells visitors it is not connected and offers to email you instead.

---

## 4. Add or change a project

Open `assets/js/data.js`. Each project is one block in `PROJECTS`.

- Copy a block, give it a new `id` (letters, numbers, dashes), change the text.
- Put the screenshot in `assets/img/` and point `card.image` and `heroImage.src` to it.
- `featured: true` shows it on the home page (the first 4).
- `published: false` hides it everywhere. The *Business Process Improvement* and *Customer Segmentation*
  projects are already there as drafts: fill them and switch them to `true` when ready.

The page for each project is created automatically at `project.html?id=<id>`.

---

## Features
- Responsive (phone, tablet, desktop), light and dark mode (remembered)
- Typing effect, animated counters, scroll animations, reading progress bar, back-to-top button
- Projects: filter by category, live search, shareable filter links (`projects.html#bi`)
- Case studies built from data, with previous / next navigation and click-to-zoom screenshots
- Contact form: validation, spam protection, draft kept while typing, loading and success states

---

## 5. English / French button

The **EN | FR** button in the header switches the whole site between English and French.
The visitor's choice is remembered on their browser.

- The French text lives in `assets/js/i18n-fr.js`: each line is `"English text": "French text"`.
- To change a French translation, edit the French side only.
- When you add or change English text (in an HTML page or in `data.js`), add the same English text
  with its French version to `i18n-fr.js`. Text that has no French entry stays in English.
