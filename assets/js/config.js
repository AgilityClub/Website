/* =====================================================================
   AGILITY CLUB — SITE SETTINGS
   ---------------------------------------------------------------------
   This is the ONE file to edit for links, emails and the team.
   Any link here updates every button on every page automatically.
   ===================================================================== */

window.AGILITY_CLUB = {
  /* ---------- Club links ---------- */
  links: {
    // Google Form for "Become a member". Paste the form's share link here.
    // While it still says REPLACE_ME, the button opens an email to the club instead.
    join: "https://docs.google.com/forms/d/e/1FAIpQLSdyccgfYsH_fNNrHPoo8qgNj7wHfa66p8WtPycCnXoihNCfSQ/viewform?usp=header",

    // Discord invite link (e.g. https://discord.gg/abc123)
    discord: "https://discord.gg/REPLACE_ME",

    instagram: "https://www.instagram.com/ulethagilityclub/",
    clubEmail: "agility.club@uleth.ca",

    /* ---------- Agility Program links (run by Agility, not the club) ---------- */
    agility: "https://www.ulethbridge.ca/agility",
    innovationZone: "https://www.ulethbridge.ca/agility/innovation-zone",
    workshops: "https://www.ulethbridge.ca/agility/workshops-and-events",
    entrepreneurship: "https://www.ulethbridge.ca/agility/entrepreneurship",
    academicSupports: "https://www.ulethbridge.ca/agility/academic-supports",
    waiver:
      "https://powerforms.docusign.net/6261a2ec-8e4d-4350-aef2-4d33180abff5?env=na2&acct=18534017-a554-4bad-906f-f8d5a6419898&accountId=18534017-a554-4bad-906f-f8d5a6419898",
    moodle: "https://moodle.uleth.ca/course/view.php?id=4424#section-1",
    inPersonTraining:
      "https://forms.cloud.microsoft/pages/responsepage.aspx?id=wmDTjIsGNk6NtSezV5L1P7O26U-Y6vFAt5YSoiH_H0dUNThZM0tHVzVFREpHSEpBRzA0MURSTzZTNSQlQCN0PWcu&route=shorturl",
    booking:
      "https://library-booking.ulethbridge.ca/innovation_zone/index.php?view=day&view_all=1&area=1&room=53",
  },

  /* ---------- Agility Staff Liaison (advisory, non-voting) ----------
     Shown in the Advisors section of the team page. Same fields as the team below.
  */
  liaison: {
    name: "Nicole Brink",
    major: "Computer Science graduate",
    role: "Agility Staff Liaison",
    email: "nicole.brink@uleth.ca",
    photo: "",
  },

  /* ---------- Executive team ----------
     - email: leave "" until they have one; the card will point to the club inbox.
     - photo: put the image in assets/team/ and write e.g. "assets/team/aadi.jpg".
              Square-ish photos work best. Leave "" to show initials.
              Tip: a PNG with the background removed lets the contour swirls show behind them.
     - year / major: shown under their name, e.g. year: 3, major: "Finance". Leave "" to hide.
     - badges: optional extra titles shown on their card, e.g. ["Co-Founder"].
     - contactFor: what an outside person should reach this person about.
  */
  team: [
    {
      id: "co-president-1",
      name: "Aadi D. Patel",
      year: 5,
      major: "Physics",
      badges: ["Co-Founder"],
      role: "Co-President",
      email: "aadi.patel@uleth.ca",
      photo: "assets/team/aadi.png",
      contactFor: ["General club inquiries", "University & ULSU matters"],
    },
    {
      id: "co-president-2",
      name: "Ahmed Imtiaz Ibrahim",
      year: 3,
      major: "Agricultural Biotechnology & Computer Science",
      badges: ["Co-Founder"],
      role: "Co-President",
      email: "ibrahima@uleth.ca",
      photo: "",
      contactFor: ["General club inquiries", "Club programming"],
    },
    {
      id: "vp-community",
      name: "Andrew Tiet",
      year: 4,
      major: "Therapeutic Recreation",
      badges: ["Co-Founder"],
      role: "VP Community Coordinator",
      email: "andrew.tiet@uleth.ca",
      photo: "",
      contactFor: ["Collaborations with organizations & clubs", "Community outreach"],
    },
    {
      id: "vp-finance",
      name: "Arlind Kuqi",
      year: 3,
      major: "Accounting",
      role: "VP Finance",
      email: "arlind.kuqi@uleth.ca",
      photo: "assets/team/arlind.png",
      contactFor: ["Sponsorships & funding", "Member reimbursements"],
    },
    {
      id: "secretary",
      name: "Nitya Ghehalot",
      year: 4,
      major: "Computer Science",
      role: "Secretary",
      email: "n.ghehalot@uleth.ca",
      photo: "",
      contactFor: ["Membership & attendance", "Meeting schedules"],
    },
    {
      id: "communications",
      name: "Nestor Fuentes",
      year: 1,
      major: "Pre-Education",
      role: "Communications Director",
      email: "nestor.fuentesmajano@uleth.ca",
      photo: "assets/team/nestor.png",
      contactFor: ["Media, social & promotion", "Newsletter & event features"],
    },
  ],

  /* ---------- Student Showcase (showcase.html) ----------
     One entry per project. To add a student, copy an entry and change it.
     - people: one or more makers. photo = face shot in assets/showcase/ (leave "" to show initials).
     - title / hook: project name and one short line about it.
     - status: optional small badge, e.g. "Taking requests" or "Looking for testers".
     - workPhoto: a picture of the project (website screenshot, print, drone...) in assets/showcase/.
       Wide (landscape) images work best. Leave "" for a placeholder.
     - link + linkLabel: where the button goes (their site, Instagram, portfolio...).
       No link? Set contactSubject instead and the button emails the club with that subject.
  */
  showcase: [
    {
      id: "mackenzie-masks",
      people: [{ name: "Mackenzie", major: "Computer Science", photo: "" }],
      title: "Making Masks",
      hook: "Custom masks, sketched, 3D-modelled and printed to fit your face. A computer science student turning code into wearable art.",
      status: "Taking requests",
      workPhoto: "",
      workAlt: "A custom 3D-printed mask by Mackenzie",
      link: "",
      linkLabel: "Request a mask",
      contactSubject: "Mask request for Mackenzie",
    },
    {
      id: "hunter-stockattack",
      people: [{ name: "Hunter", major: "Computer Science", photo: "" }],
      title: "StockAttack School Calendar",
      hook: "Every due date, every class, one calendar. Moodle, Outlook and your other calendars merged in one place, with the academic calendar on top.",
      status: "Looking for testers",
      workPhoto: "",
      workAlt: "Screenshot of the StockAttack School Calendar website",
      link: "https://stockattack.ca/",
      linkLabel: "Try it out",
      contactSubject: "",
    },
    {
      id: "lucas-ethan-drones",
      people: [
        { name: "Lucas", major: "", photo: "" },
        { name: "Ethan", major: "", photo: "" },
      ],
      title: "Drones & Revived Machines",
      hook: "Building drones and bringing old military and scientific laptops back to life. Next up: a drone that carries a barrel to plant tree seeds.",
      status: "Idea in progress",
      workPhoto: "",
      workAlt: "Lucas and Ethan's drone build",
      link: "",
      linkLabel: "Get in touch",
      contactSubject: "Lucas & Ethan's drone project",
    },
  ],
};
