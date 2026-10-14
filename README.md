# Agility Club website

Static site for the Agility Club (University of Lethbridge), hosted on GitHub Pages. No build step.

## Editing (no coding needed)

Almost everything you'll want to change is in **`assets/js/config.js`**:

| What | Where in `config.js` |
|---|---|
| "Become a member" Google Form | `links.join` |
| Discord invite | `links.discord` |
| Club email | `links.clubEmail` |
| Agility waiver / Moodle / training / booking links | `links.waiver`, `links.moodle`, `links.inPersonTraining`, `links.booking` |
| Executive names, roles, emails, "contact me about" | `team` |

Changing a link there updates every button on every page.

### Adding executive photos
1. Put the photo in `assets/team/`, e.g. `assets/team/andrew.jpg` (portrait/square, ~800px wide is plenty).
2. In `config.js`, set that person's `photo: "assets/team/andrew.jpg"`.

Photos show in a duotone tint and turn full colour on hover. With no photo, initials are shown instead.

### Adding executive emails
Set `email: "name@uleth.ca"` for the person in `config.js`. Until then, their contact buttons send to the club inbox with "Attn: Name (Role)" in the subject.

## Pages
- `index.html`: home
- `training.html`: step-by-step Innovation Zone training guide (3D printer walk-in track + general track)
- `team.html`: executive team + "who to contact"
- `collaborate.html`: for businesses, non-profits and organizations

## Publishing on GitHub Pages
Push to a GitHub repo, then **Settings → Pages → Deploy from a branch → `main` / root**.

## Preview locally
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000
