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
    join: "https://forms.gle/REPLACE_ME",

    // Discord invite link (e.g. https://discord.gg/abc123)
    discord: "https://discord.gg/REPLACE_ME",

    instagram: "https://www.instagram.com/ulethagilityclub/",
    clubEmail: "agility.club@uleth.ca",

    /* ---------- Agility Program links (owned by the University) ---------- */
    agility: "https://www.ulethbridge.ca/agility",
    innovationZone: "https://www.ulethbridge.ca/agility/innovation-zone",
    workshops: "https://www.ulethbridge.ca/agility/workshops-and-events",
    entrepreneurship: "https://www.ulethbridge.ca/agility/entrepreneurship",
    academicSupports: "https://www.ulethbridge.ca/agility/academic-supports",
    waiver:
      "https://powerforms.docusign.net/6261a2ec-8e4d-4350-aef2-4d33180abff5?env=na2&acct=18534017-a554-4bad-906f-f8d5a6419898&accountId=18534017-a554-4bad-906f-f8d5a6419898",
    moodle: "https://moodle.uleth.ca/course/view.php?id=4424",
    inPersonTraining: "https://forms.office.com/r/ipVSp4xhCX",
    booking:
      "https://library-booking.ulethbridge.ca/innovation_zone/index.php?view=day&view_all=1&area=1&room=53",
  },

  /* ---------- Executive team ----------
     - email: leave "" until they have one; the card will point to the club inbox.
     - photo: put the image in assets/team/ and write e.g. "assets/team/aadi.jpg".
              Square-ish photos work best. Leave "" to show initials.
              Tip: a PNG with the background removed lets the contour swirls show behind them.
     - badges: optional extra titles shown on their card, e.g. ["Co-Founder"].
     - contactFor: what an outside person should reach this person about.
  */
  team: [
    {
      id: "co-president-1",
      name: "Aadi D. Patel",
      badges: ["Co-Founder"],
      role: "Co-President",
      email: "",
      photo: "assets/team/aadi.png",
      contactFor: ["General club inquiries", "University & ULSU matters"],
    },
    {
      id: "co-president-2",
      name: "Ahmed Imtiaz Ibrahim",
      badges: ["Co-Founder"],
      role: "Co-President",
      email: "",
      photo: "",
      contactFor: ["General club inquiries", "Club programming"],
    },
    {
      id: "vp-community",
      name: "Andrew Tiet",
      badges: ["Co-Founder"],
      role: "VP Community Coordinator",
      email: "",
      photo: "",
      contactFor: ["Collaborations with organizations & clubs", "Community outreach"],
    },
    {
      id: "vp-finance",
      name: "Arlind Kuqi",
      role: "VP Finance",
      email: "",
      photo: "",
      contactFor: ["Sponsorships & funding", "Member reimbursements"],
    },
    {
      id: "secretary",
      name: "Nitya Ghehalot",
      role: "Secretary",
      email: "",
      photo: "",
      contactFor: ["Membership & attendance", "Meeting schedules"],
    },
    {
      id: "communications",
      name: "Nestor Fuentes",
      role: "Communications Director",
      email: "",
      photo: "",
      contactFor: ["Media, social & promotion", "Newsletter & event features"],
    },
  ],
};
