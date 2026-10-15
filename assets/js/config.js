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
    photo: "assets/team/nicole.png",
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
      photo: "assets/team/ahmed.png",
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
      photo: "assets/team/andrew.png",
      contactFor: ["Collaborations with organizations & clubs", "Community outreach"],
    },
    {
      id: "vp-finance",
      name: "Arlind Kuqi",
      year: 2,
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
      photo: "assets/team/nitya.png",
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
};
