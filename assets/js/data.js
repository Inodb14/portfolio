/* ==========================================================
   CONTENT — projects, experience, skills.
   To add a project: copy one block in PROJECTS, change the id,
   and it appears on the Projects page and gets its own page
   at project.html?id=<id>. Set published:false to hide it.
   ========================================================== */

window.CATEGORIES = {
  ba: { label: 'Business Analysis', cls: 'tag-ba' },
  bi: { label: 'Business Intelligence', cls: 'tag-bi' },
  process: { label: 'Process Analysis', cls: 'tag-process' }
};

window.PROJECTS = [
  /* ------------------------------------------------------ */
  {
    id: 'uae-residential-investment',
    published: true,
    featured: true,
    category: 'bi',
    context: 'Investment case',
    title: 'UAE Residential Investment',
    accent: 'Where to buy, and why',
    card: {
      title: 'UAE Residential Investment — Where to buy',
      desc: '25K listings across 218 areas turned into a buy plan for an AED 50M budget: core mid-market, value satellites, selective prime.',
      result: 'AED 50M split 50 / 30 / 20 across 3 strategies',
      tools: ['Power BI', 'DAX', 'Investment analysis'],
      image: 'assets/img/uae-market-overview.jpg'
    },
    intro: 'An investment firm had a budget of AED 50M for UAE residential property. I analysed 25K listings across 218 areas and turned the results into a clear plan: how much to put in each type of area, and where.',
    tagline: 'Business Intelligence · Investment recommendation',
    meta: [
      { k: 'My role', v: 'Business Analyst' },
      { k: 'Client', v: 'Gulf Horizon Capital' },
      { k: 'Data', v: 'Asking prices 2022 – 2024' },
      { k: 'Tool', v: 'Power BI' }
    ],
    heroImage: { src: 'assets/img/uae-where-to-buy.jpg', alt: 'Where to buy page of the Power BI report: view premiums, price by property type, and areas plotted by price and gap versus Dubai, coloured by Core, Value and Prime' },
    sections: [
      {
        type: 'problem', eyebrow: '01 · Business problem', title: 'AED 50M to invest, no clear plan',
        paragraphs: [
          'The UAE market is big and uneven. Prices per sqft change a lot from one emirate to another, from one area to another, and even with the view. Without a structured analysis, the risk is to pay too much in the wrong place, or to buy property that is hard to resell.',
          'The investment committee needed a simple answer it could act on.'
        ],
        questionsTitle: 'What the committee asked',
        questions: [
          'Which emirates and areas give the best value per sqft?',
          'Which price range has the most listings, so the property is easy to resell?',
          'How much more do buyers pay for a view, and is it worth it?',
          'How should the AED 50M be split to balance return and risk?'
        ]
      },
      {
        type: 'stats', tone: 'muted', eyebrow: '02 · What the market shows', title: 'Dubai holds 3 in 4 listings and the highest price per sqft',
        stats: [
          { v: '25K', l: 'listings analysed in 218 areas' },
          { v: 'AED 2.1M', l: 'median asking price' },
          { v: 'AED 1K', l: 'median price per sqft' },
          { v: '36%', l: 'of listings under AED 1.5M' }
        ],
        image: { src: 'assets/img/uae-market-overview.jpg', alt: 'Market overview page: 25K listings, median AED/sqft by emirate from 1,622 in Dubai to 439 in Ajman, and share of listings by price band' },
        cards: [
          { t: 'Big price gaps between emirates', d: 'Median price per sqft is AED 1,622 in Dubai, 1,191 in Abu Dhabi and 948 in Sharjah, but only 473 in Umm Al Quwain and 439 in Ajman.' },
          { t: 'Most of the market is mid-priced', d: '57% of listings are between AED 0.75M and 3M. This is where buyers and tenants are, so it is the easiest segment to rent out and resell.' },
          { t: 'Views come at a high premium', d: 'Palm View is around AED 3.5K per sqft, more than double City or Park View (around 1.4K). Only the strongest views justify the extra cost.' }
        ]
      },
      {
        type: 'allocation', eyebrow: '03 · Business solution and recommendation', title: 'Core mid-market, value satellites, selective prime',
        intro: 'I split the AED 50M budget into three strategies. Each one has its own role in the portfolio.',
        parts: [
          { name: 'Core', pct: 50, amount: 'AED 25M', bg: '#1f6fb2', fg: '#ffffff', what: 'Liquid mid-market apartments.', why: 'This is the biggest part of the market, with steady demand from tenants and buyers.', benefit: 'Regular rental income and easy resale.' },
          { name: 'Value', pct: 30, amount: 'AED 15M', bg: '#5fd3c8', fg: '#0f2a44', what: 'Satellite areas priced 35–45% below Dubai for the same type of property.', why: 'Lower entry price per sqft, with room to grow as these areas develop.', benefit: 'Higher potential yield and capital growth.' },
          { name: 'Prime', pct: 20, amount: 'AED 10M', bg: '#0f2a44', fg: '#ffffff', what: 'A few selective water-view listings.', why: 'Water views hold their premium best, and prime areas sit above the Dubai average.', benefit: 'Long-term capital protection, with limited exposure.' }
        ]
      },
      {
        type: 'steps', tone: 'dark', eyebrow: 'My role as Business Analyst',
        steps: [
          { t: 'Frame the decision', d: 'Turned "where should we invest?" into 4 questions the committee could answer.' },
          { t: 'Prepare the data', d: 'Cleaned 25K listings and set clear measures: median price, price per sqft, gap vs Dubai.' },
          { t: 'Build the story', d: 'Report in 3 pages: market overview, where to buy, why to buy.' },
          { t: 'Recommend', d: 'A budget split the committee can approve, with the reason for each part.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: 'outdoor-gear-sales-excel',
    published: true,
    featured: true,
    category: 'bi',
    context: 'Excel project',
    title: 'Outdoor Gear Sales',
    accent: 'Dashboard in Excel',
    card: {
      title: 'Outdoor Gear Sales Dashboard',
      desc: 'One Excel dashboard showing what sells, where and when, across 4 European regions and 4 sales channels.',
      result: '$645K revenue, 46% margin, 4 recommendations',
      tools: ['Excel', 'Pivot tables', 'Slicers'],
      image: 'assets/img/sales-dashboard.png'
    },
    intro: 'An outdoor equipment retailer sells across Europe through four channels. I built one Excel dashboard so the sales team can see what sells, where and when, and decide where to put stock and marketing.',
    tagline: 'Business Intelligence · Excel',
    meta: [
      { k: 'My role', v: 'Business Analyst' },
      { k: 'Type', v: 'Sales performance' },
      { k: 'Scope', v: '12 months · 4 European regions' },
      { k: 'Tool', v: 'Excel (pivots, slicers, map)' }
    ],
    heroImage: { src: 'assets/img/sales-dashboard.png', alt: 'Excel sales dashboard: revenue, gross profit, average price and units sold, monthly revenue and profit, revenue by category, top 5 bestsellers and revenue by European country, with filters' },
    sections: [
      {
        type: 'problem', eyebrow: '01 · Business problem', title: 'Sales data, but no clear view',
        paragraphs: [
          'Sales were recorded in spreadsheets by order. To answer a simple question like "which products sell best in summer?" someone had to filter and sum by hand. The team could not quickly see which categories, countries or months drive revenue.',
          'Without that view, stock and marketing budget were planned on habit, not on data.'
        ],
        questionsTitle: 'What the sales team needed to know',
        questions: [
          'How much do we sell and how much do we earn on it?',
          'When are the high and low months?',
          'Which categories and products bring the most revenue?',
          'Which countries, customers and channels perform best?'
        ]
      },
      {
        type: 'qa', tone: 'muted', eyebrow: '02 · The dashboard', title: 'One page, every question answered',
        stats: [
          { v: '$645K', l: 'total revenue' },
          { v: '46%', l: 'gross margin ($296K profit)' },
          { v: '6,698', l: 'units sold' },
          { v: '$238', l: 'average price per unit' }
        ],
        rows: [
          { q: 'How much do we sell and earn?', a: 'Four KPI cards: revenue, gross profit, average price and units sold.' },
          { q: 'When are the high and low months?', a: 'Monthly revenue and gross profit lines, January to December.' },
          { q: 'What sells best?', a: 'Revenue by product category and top 5 bestsellers by units.' },
          { q: 'Where and to whom?', a: 'Map of revenue by country, plus filters for period, customer type, region and sales channel.' }
        ]
      },
      {
        type: 'recs', eyebrow: '03 · Business solution and recommendations', title: 'What the business should do',
        intro: 'Each recommendation starts from what the data shows and ends with the benefit for the business.',
        items: [
          { f: 'Camping and Hiking bring $377K, about 58% of revenue.', r: 'Protect these two categories first: keep the bestsellers always in stock and put most of the marketing budget here.', b: 'No lost sales on the products that drive the business.' },
          { f: 'Revenue doubles from February ($36K) to June ($70K), with a second peak in November ($66K).', r: 'Build stock from April for the summer peak, and plan a dedicated November campaign.', b: 'Stock is ready when demand arrives, without tying up cash in quiet months.' },
          { f: 'Trail Boots, Summit Backpack 45L and Compact Sleeping Bag are the top 3, each with 430+ units.', r: 'Sell them together as a trek bundle with a small discount.', b: 'Higher basket value and a higher average price per order.' },
          { f: 'The UK and Germany are the strongest markets on the map; several countries stay weak.', r: 'Keep investing in the UK and Germany, and test small campaigns in weaker markets before spending more.', b: 'Growth beyond two countries, with limited risk.' }
        ]
      },
      {
        type: 'steps', tone: 'dark', eyebrow: 'My role as Business Analyst',
        steps: [
          { t: 'Understand the need', d: 'Identified what the sales team decides on: stock, marketing and markets.' },
          { t: 'Define the KPIs', d: 'Turned the need into 4 questions and 4 KPIs: revenue, profit, price, units.' },
          { t: 'Build the dashboard', d: 'Excel pivot tables, charts, a map and slicers so users filter on their own.' },
          { t: 'Recommend', d: 'Turned the results into 4 actions the business can take.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: 'event-ticketing-brd',
    published: true,
    featured: true,
    category: 'ba',
    context: 'Requirements',
    title: 'Event Ticketing Platform',
    accent: 'Business Requirements Document',
    card: {
      title: 'Event Ticketing Platform — BRD',
      desc: 'Requirements for moving ticket sales from a manual office process to an online platform with external organizers and commission.',
      result: '25 requirements, 15 rules, 17 KPIs, fully traced',
      tools: ['MoSCoW', 'TO-BE process', 'Traceability'],
      thumb: 'brd'
    },
    intro: 'A complete BRD for moving ticket sales and event registration from a manual, office-based process to an online platform where customers buy tickets and external organizers sell theirs for a commission.',
    tagline: 'Business Analysis · Business Requirements',
    meta: [
      { k: 'My role', v: 'Business Analyst (author)' },
      { k: 'Document', v: 'BRD v1.0 · 14 pages' },
      { k: 'Date', v: 'September 2026' },
      { k: 'Methods', v: 'MoSCoW · Traceability · TO-BE' }
    ],
    heroStats: [
      { v: '12', l: 'stakeholder groups' }, { v: '10', l: 'business objectives' }, { v: '25', l: 'business requirements' },
      { v: '15', l: 'business rules' }, { v: '17', l: 'KPIs with owners' }, { v: '10', l: 'risks with mitigation' }
    ],
    sections: [
      {
        type: 'table', eyebrow: '01 · Context', title: 'Current state vs target state',
        paragraphs: [
          'Ticket sales and event registration were handled manually. Customers often had to visit the office to buy a ticket. That limited reach, took staff time and gave management little visibility of sales, attendance and revenue.',
          'The business wanted an online platform for customers, plus a way for external organizers to publish events and sell tickets for a commission.'
        ],
        headers: ['Area', 'Today', 'Target'],
        rows: [
          ['Sales channel', 'Mostly through the office', 'Online, 24/7'],
          ['Registration and payment', 'Manual steps by staff', 'Automated, far fewer steps'],
          ['Ticket verification', 'Paper or manual tickets', 'Unique ticket checked at every scan'],
          ['Reconciliation and payouts', 'Manual', 'Automatic, with payout reports'],
          ['Management reporting', 'No central view', 'Dashboards refreshed daily']
        ]
      },
      {
        type: 'steps', tone: 'muted', light: true, eyebrow: '02 · My approach', title: 'How I built the BRD',
        steps: [
          { t: 'Context and scope', d: 'Framed the business problem and agreed what is in and out of this release.' },
          { t: 'Stakeholders', d: 'Mapped 12 groups and what each one needs from the platform.' },
          { t: 'Objectives', d: 'Set 10 objectives with targets, and flagged unknown baselines.' },
          { t: 'Requirements', d: 'Wrote 25 business needs, prioritized with MoSCoW, plus 15 rules.' },
          { t: 'TO-BE and KPIs', d: 'Described the target process, exception flows and 17 KPIs.' },
          { t: 'Risks and trace', d: 'Built the risk register, open questions and traceability matrix.' }
        ]
      },
      {
        type: 'priority', eyebrow: '03 · Business requirements', title: '25 requirements, prioritized with MoSCoW',
        intro: 'Each requirement states a business need, not a system feature, and is linked to at least one objective.',
        segments: [
          { label: '16 Must', value: 16, bg: '#1f4e79', fg: '#fff' },
          { label: '6 Should', value: 6, bg: '#0b7d77', fg: '#fff' },
          { label: '2', value: 2, bg: '#e7a33e', fg: '#0f2a44' },
          { label: '1', value: 1, bg: '#d4e1ec', fg: '#0f2a44' }
        ],
        legend: ['Must: needed for launch', 'Should: important, workaround exists', 'Could: if time and budget allow', 'Won’t: resale marketplace, not this release'],
        cards: [
          { t: 'Customer experience', badge: '8 BR', d: 'Online channel, remote purchase, cards and wallets, unique ticket after payment, refunds and transfers, mobile.' },
          { t: 'Organizers and commission', badge: '5 BR', d: 'Organizers publish and manage events without developer help, commission model, real-time sales view.' },
          { t: 'Ticket integrity and entry', badge: '3 BR', d: 'Never sell over capacity, detect duplicate or forged tickets, validate fast even offline.' },
          { t: 'Finance, operations, reporting', badge: '4 BR', d: 'Less manual effort, automatic reconciliation and audit trail, daily dashboards.' },
          { t: 'Platform, compliance, transition', badge: '4 BR', d: 'Data protection and payment security, availability at on-sales, migration from the manual process.' },
          { t: 'Excluded from this release', badge: '1 BR', d: 'Ticket resale marketplace, kept out to control scope.' }
        ]
      },
      {
        type: 'kpis', tone: 'dark', eyebrow: '04 · KPIs and success measures', title: '17 KPIs, each with an owner and a frequency',
        items: [
          { v: '-70%', l: 'office visits in 6 months' }, { v: '-40%', l: 'event inquiries' }, { v: '< 10 s', l: 'average entry time per attendee' },
          { v: '0', l: 'duplicate or fake entries' }, { v: '100%', l: 'sales reconciled within 24 hours' }, { v: '20', l: 'active organizers in year 1' }
        ],
        note: 'Where a baseline was unknown I flagged it [TBC] instead of guessing, and listed it in the open questions for the Business Sponsor to confirm before sign-off.'
      },
      {
        type: 'list', eyebrow: '05 · What this shows', title: 'Key takeaways',
        items: [
          'Write business needs, not system features, so the FRD can follow cleanly.',
          'Link every requirement to an objective, and every objective to a KPI.',
          'Flag unknown values as [TBC] with a named owner instead of guessing.',
          'Keep scope tight: the resale marketplace is a clear Won’t for this release.'
        ]
      }
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: 'event-ticketing-frd',
    published: true,
    featured: true,
    category: 'ba',
    context: 'Functional analysis',
    title: 'Event Ticketing Platform',
    accent: 'Functional Requirements Document',
    card: {
      title: 'Event Ticketing Platform — FRD',
      desc: 'The BRD turned into system behaviour: functional requirements with testable acceptance criteria, main flows and open decisions.',
      result: '26 FRs + 6 NFRs, every in-scope BR traced',
      tools: ['Acceptance criteria', 'Functional flows', 'Traceability'],
      thumb: 'frd'
    },
    intro: 'I turned my BRD into system behaviour: what the platform must do, for whom, and how each requirement will be tested. Every functional requirement traces back to a business requirement.',
    tagline: 'Functional Analysis · Functional Requirements',
    meta: [
      { k: 'My role', v: 'Business Analyst (author)' },
      { k: 'Document', v: 'FRD v0.1 · draft' },
      { k: 'Date', v: 'October 2026' },
      { k: 'Source', v: 'Event Ticketing BRD v1.0' }
    ],
    heroStats: [
      { v: '26', l: 'functional requirements' }, { v: '6', l: 'non-functional requirements' }, { v: '9', l: 'actors and systems' },
      { v: '3', l: 'main functional flows' }, { v: '100%', l: 'in-scope BRs traced' }, { v: '14', l: 'open decisions with owners' }
    ],
    sections: [
      {
        type: 'chain', eyebrow: '01 · From business need to testable behaviour', title: 'How one requirement is built',
        intro: 'Each functional requirement has an ID, its source in the BRD, a priority and acceptance criteria that QA can test.',
        br: { id: 'BR-014', label: 'Business need', text: 'Tickets sold must never exceed the capacity of an event or ticket type.', note: 'Rule BRU-04: tickets held for [10 minutes] during checkout.' },
        fr: { id: 'FR-004', label: 'Functional requirement · Must', text: 'The system shall temporarily hold selected tickets while the customer completes checkout.' },
        criteria: ['When checkout starts, a hold is recorded with an expiry time.', 'If payment is not completed in time, the held tickets are released.', 'Concurrent checkouts never push confirmed sales above capacity.', 'Hold duration stays TBD until approved.']
      },
      {
        type: 'priority', tone: 'muted', eyebrow: '02 · Functional scope', title: '26 functional requirements in 6 areas',
        segments: [
          { label: '19 Must', value: 19, bg: '#1f4e79', fg: '#fff' },
          { label: '5 Should', value: 5, bg: '#0b7d77', fg: '#fff' },
          { label: '2', value: 2, bg: '#e7a33e', fg: '#0f2a44' }
        ],
        legend: ['Priorities inherited from the BRD', 'Could: promo codes and 3x volume growth', '+ 6 non-functional requirements'],
        cards: [
          { t: 'Customer purchase', badge: 'FR-001 to 006', d: 'Browse events, view details, select tickets, hold them, pay, receive a unique ticket.' },
          { t: 'Event lifecycle for customers', badge: 'FR-007 to 010', d: 'Online, in-person or hybrid format, reminders and change notices, refunds, transfers.' },
          { t: 'Organizers and commission', badge: 'FR-011 to 016', d: 'Verification before publishing, event and ticket set-up, commission, sales view, promo codes.' },
          { t: 'Entry validation', badge: 'FR-017 to 018', d: 'Clear valid / used / invalid result at the gate, offline mode with sync and duplicate flags.' },
          { t: 'Finance and reporting', badge: 'FR-019 to 022', d: 'Reconciliation with the payment provider, payout statement, locked audit trail, dashboards.' },
          { t: 'Compliance and transition', badge: 'FR-023 to 026', d: 'Data protection, availability during on-sales, growth in volume, migration from the manual process.' }
        ]
      },
      {
        type: 'flows', eyebrow: '03 · Main functional flows', title: 'Three flows, three actors',
        items: [
          { t: 'Customer purchase', a: 'Customer · Payment provider', steps: ['Browse events and open the details', 'Select ticket type and quantity', 'System checks limits and holds tickets', 'Pay through the provider', 'Ticket issued only after payment is confirmed'] },
          { t: 'Event publication', a: 'Organizer', steps: ['Complete verification', 'Blocked from publishing until verified', 'Enter details, format, ticket types, prices, capacity', 'System validates required fields', 'Publish; later price changes apply to new sales only'] },
          { t: 'Entry validation', a: 'Gate staff', steps: ['Scan or enter the ticket code', 'System checks event and usage', 'Accept and mark used, or refuse and log', 'Offline: validate locally, sync later, flag duplicates'] }
        ]
      },
      {
        type: 'cards', tone: 'dark', eyebrow: '04 · Key decisions I made', title: 'Where the BRD left gaps, I made them visible', cols: 2,
        cards: [
          { t: 'TBD instead of guessing', d: 'Hold time, ticket limit, refund window and commission rate were only proposals in the BRD. I kept them visible as TBD with an owner, so nobody builds on an unapproved value.' },
          { t: 'No overselling under load', d: 'I added an acceptance criterion that concurrent checkouts must never push confirmed sales above capacity. That is where ticketing systems usually break.' },
          { t: 'Audit trail that cannot be rewritten', d: 'Corrections are recorded as adjustment or reversal entries, never by editing the original transaction. Finance keeps a complete history.' },
          { t: 'Quality goals kept separate', d: 'Mobile use, availability and scalability had no measurable spec in the BRD, so I wrote them as non-functional requirements with what must be defined before testing.' }
        ]
      },
      {
        type: 'table', eyebrow: '05 · Traceability', title: 'Every in-scope BR is covered',
        paragraphs: ['All 24 in-scope business requirements map to at least one functional or non-functional requirement, and back to a business objective. 14 open decisions are logged with an owner, so the team knows exactly what blocks sign-off.'],
        headers: ['BRD', 'FRD', 'Objective'],
        rows: [
          ['BR-002', 'FR-003, 005, 006', 'OBJ-1'], ['BR-007', 'FR-009, 010', 'OBJ-1'], ['BR-011', 'FR-014, 020', 'OBJ-6'],
          ['BR-014', 'FR-003, 004, 013', 'OBJ-9'], ['BR-016', 'FR-017, 018', 'OBJ-9'], ['BR-018', 'FR-019, 020, 021', 'OBJ-10'], ['BR-022', 'NFR-002', 'OBJ-1, OBJ-8']
        ]
      }
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: 'electric-vehicle-market',
    published: true,
    featured: false,
    category: 'bi',
    context: 'Market analysis',
    title: 'Electric Vehicle',
    accent: 'Market Dashboard',
    card: {
      title: 'Electric Vehicle Market Dashboard',
      desc: 'Business questions on EV demand, customer location and competition, answered in one dashboard and turned into recommendations.',
      result: '150K EVs analysed; Tesla holds about 37% with 2 models',
      tools: ['Power BI', 'Power Query', 'Map visuals'],
      image: 'assets/img/ev-dashboard.png'
    },
    intro: 'A market analysis on EV registration data. I approached it as the Business Analyst for a company that wants to enter the EV market: define its questions, answer them in one dashboard, and turn the answers into recommendations.',
    tagline: 'Business Intelligence · Market analysis',
    meta: [
      { k: 'My role', v: 'Business Analyst' },
      { k: 'Type', v: 'Market analysis' },
      { k: 'Model years', v: '2010 – 2024' },
      { k: 'Tool', v: 'Power BI' }
    ],
    heroImage: { src: 'assets/img/ev-dashboard.png', alt: 'Electric vehicle Power BI dashboard: totals, fully electric vs hybrid share, vehicles by model year, map, top brands, clean-vehicle eligibility and top models' },
    sections: [
      {
        type: 'problem', eyebrow: '01 · Business problem', title: 'Decisions without a clear picture',
        paragraphs: [
          'The people who plan EV products, charging and marketing had data in several places. Nobody could quickly answer basic questions: is demand growing, where are the customers, who is the competition?',
          'Result: decisions were based on guesses, and each new question meant hours of manual work.'
        ],
        chipsLabel: 'Who needs the answer',
        chips: ['Management', 'Product planning', 'Charging / energy planning', 'Marketing'],
        questionsTitle: 'What they needed to know',
        questions: [
          'Is EV demand really growing, and how fast?',
          'Where are EV owners located?',
          'Which brands lead the market?',
          'What do customers choose: fully electric or hybrid, and with what range?'
        ]
      },
      {
        type: 'qa', tone: 'muted', eyebrow: '02 · The dashboard', title: 'One page that answers each question',
        stats: [
          { v: '150K', l: 'registered EVs analysed' }, { v: '78%', l: 'fully electric (BEV)' },
          { v: '22%', l: 'plug-in hybrid (PHEV)' }, { v: '67.9 km', l: 'average electric range' }
        ],
        rows: [
          { q: 'Is demand growing?', a: 'EVs by model year, 2010 to 2024.' },
          { q: 'Where are the customers?', a: 'Map by area, with filters by city and electricity provider.' },
          { q: 'Who leads the market?', a: 'Brand ranking and most popular models.' },
          { q: 'What do customers choose?', a: 'Fully electric vs hybrid split, average range, and eligibility for clean-vehicle incentives (CAFV).' }
        ]
      },
      {
        type: 'recs', eyebrow: '03 · Business solution and recommendations', title: 'What the business should do',
        intro: 'Each recommendation starts from something the data shows, and ends with the benefit for the business.',
        items: [
          { f: 'EVs per model year grew from almost zero in 2010 to about 37K in 2023. The last year is still incomplete.', r: 'Treat EVs as a long-term growth market and plan budget and capacity for it now.', b: 'The business is ready before demand arrives, not after.' },
          { f: '78% of EVs are fully electric, only 22% are plug-in hybrids.', r: 'Build the offer around fully electric vehicles first: models, charging and service.', b: 'Effort goes where most customers already are.' },
          { f: 'Tesla is far ahead. Model Y and Model 3 alone are about 56K vehicles, around 37% of the market. Nissan is second with 13.5K.', r: 'Do not compete head-on with Tesla. Serve Tesla owners (charging, service) and target the segments where Nissan, Chevrolet and Ford compete.', b: 'A realistic position next to the leader instead of against it.' }
        ]
      },
      {
        type: 'steps', tone: 'dark', eyebrow: 'My role as Business Analyst',
        steps: [
          { t: 'Understand the need', d: 'Identified who makes EV decisions and what they need to know.' },
          { t: 'Define the questions', d: 'Turned the need into 4 business questions and the KPIs that answer them.' },
          { t: 'Design the dashboard', d: 'One visual per question, with filters so users can explore on their own.' },
          { t: 'Recommend', d: 'Turned the findings into 3 actions the business can take.' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------ */
  {
    id: 'hotel-booking-performance',
    published: true,
    featured: false,
    category: 'bi',
    context: 'Internship · Deal Squard',
    title: 'Hotel Booking',
    accent: 'Performance Dashboard',
    card: {
      title: 'Hotel Booking Performance Dashboard',
      desc: 'Requirements and KPIs on room-type demand, city performance, seasonality and customer segments, turned into a filterable Power BI report.',
      result: '4 filters, period-over-period trends with DAX',
      tools: ['Power BI', 'DAX', 'Requirements'],
      thumb: 'hotel'
    },
    intro: 'Turning a hotel booking dataset into clear business requirements, measurable KPIs and a Power BI solution for management decisions.',
    tagline: 'Business Intelligence · Internship',
    meta: [
      { k: 'My role', v: 'Intern – Business Analyst' },
      { k: 'Company', v: 'Deal Squard · India' },
      { k: 'Duration', v: 'Jul – Aug 2024 (2 months)' },
      { k: 'Tools', v: 'Power BI · DAX' }
    ],
    sections: [
      {
        type: 'problem', eyebrow: '01 · Business problem', title: 'Data, but no answers for management',
        paragraphs: [
          'I worked on a simulated hotel booking dataset. The goal was to understand the business context, identify the key questions management was asking, and define the information needed to support their decisions.',
          'Raw booking data alone did not tell management which rooms, cities, seasons or customer types were driving performance. They needed clear requirements and KPIs before any dashboard could be useful.'
        ],
        questionsTitle: 'What management needed to know',
        questions: ['Which room types are most in demand?', 'Which cities perform best?', 'What are the seasonal patterns?', 'Which customer segments drive bookings?']
      },
      {
        type: 'steps', tone: 'dark', eyebrow: 'My role as Business Analyst',
        steps: [
          { t: 'Business context', d: 'Analyzed the dataset and identified the key business questions.' },
          { t: 'Requirements', d: 'Documented needs on room-type demand, city performance, seasonal patterns and customer segments.' },
          { t: 'KPIs', d: 'Translated each requirement into a measurable KPI and analysis need.' },
          { t: 'Solution', d: 'Built a Power BI report filtered by city, period, customer type and room type, with DAX for booking volume and period-over-period trends.' }
        ]
      }
    ]
  },

  /* ---- Drafts: set published:true once the content is ready ---- */
  {
    id: 'business-process-improvement',
    published: false,
    category: 'process',
    context: 'Case study',
    title: 'Business Process Improvement',
    accent: 'AS-IS to TO-BE',
    card: { title: 'Business Process Improvement', desc: 'AS-IS and TO-BE mapping, gap analysis and BPMN diagrams with recommendations.', result: '[KEY RESULT]', tools: ['BPMN', 'Bizagi', 'Excel'], thumb: 'process' },
    intro: 'Mapping how a process works today, finding the gaps, and designing a simpler target process.',
    tagline: 'Process Analysis · Case study',
    meta: [], sections: []
  },
  {
    id: 'customer-segmentation-python',
    published: false,
    category: 'bi',
    context: 'Personal project',
    title: 'Customer Segmentation',
    accent: 'with Python',
    card: { title: 'Customer Segmentation with Python', desc: 'Data cleaning with pandas, visual analysis with matplotlib and a customer segmentation model.', result: '[KEY RESULT]', tools: ['Python', 'pandas', 'matplotlib'], thumb: 'seg' },
    intro: 'Cleaning customer data and grouping customers into segments the business can act on.',
    tagline: 'Data Analysis · Personal project',
    meta: [], sections: []
  }
];

window.EXPERIENCE = [
  {
    title: 'Business Analyst', org: 'SRJ Real Estate', place: 'Dubai, UAE', dates: 'Nov 2025 – Present', icon: 'home',
    tags: ['Business Analysis', 'Data Analysis'],
    points: [
      'Analyzed real estate data from Property Finder, Dubai REST and DLD to identify investment opportunities and market trends.',
      'Developed Power BI dashboards to track property prices, rental yield and ROI.',
      'Prepared structured insights and comparisons to support investors’ decision-making.'
    ]
  },
  {
    title: 'Intern – Business Analyst', org: 'Deal Squard', place: 'India · On-site', dates: 'Jul 2024 – Aug 2024', icon: 'bars',
    tags: ['Business Analysis', 'Power BI'],
    points: [
      'Analyzed hotel booking data to identify key business questions.',
      'Documented requirements and translated them into measurable KPIs.',
      'Built a Power BI dashboard with DAX to track bookings and trends.'
    ]
  },
  {
    title: 'Functional Analysis Internship', org: 'Telia Informatique', place: 'Burkina Faso', dates: 'Jul 2022 – Sep 2022', icon: 'laptop',
    tags: ['Business Analysis', 'Documentation'],
    points: [
      'Contributed to requirements analysis and functional documentation.',
      'Prepared specifications for technical teams.',
      'Participated in testing and validation activities (UAT/SIT).'
    ]
  },
  {
    title: 'Business Development & Data Analysis (Internship)', org: 'Africa Dreamers', place: 'Burkina Faso', dates: 'Jul 2021 – Sep 2021', icon: 'bag',
    tags: ['Data Analysis', 'Business Analysis'],
    points: [
      'Developed Python scripts for data analysis and visualization.',
      'Worked on multiple projects related to data collection and processing.',
      'Supported the team in business development and market research activities.'
    ]
  }
];

window.EDUCATION = [
  { t: 'MBA in Business Analytics', org: 'Marwadi University · Rajkot, India', y: '2023 – 2025', note: 'NBA accredited' },
  { t: 'Bachelor in Computer Science and Entrepreneurship', org: 'Burkina Institute of Technology (BIT) · Burkina Faso', y: '2020 – 2023', note: '' }
];

window.SKILLS = [
  { name: 'Business Analysis', icon: 'doc', items: ['Requirements elicitation', 'BRD / FRD', 'Use cases', 'BPMN / UML', 'Gap analysis', 'UAT'] },
  { name: 'Data & Business Intelligence', icon: 'chart', items: ['Power BI', 'DAX', 'Power Query', 'SQL', 'Excel', 'Python', 'Data modeling', 'KPI design'] },
  { name: 'Tools & Collaboration', icon: 'team', items: ['Figma', 'Microsoft Office', 'Agile / Scrum', 'Monday.com', 'Bitrix24', 'Salesforce'] }
];

window.SERVICES = [
  { title: 'Business Requirements', sub: 'BRD / FRD', icon: 'doc', items: ['Structure business needs', 'BRD and FRD preparation', 'User stories, use cases, acceptance criteria'], link: 'project.html?id=event-ticketing-brd' },
  { title: 'Dashboards & Reporting', sub: 'Power BI · Excel', icon: 'chart', items: ['Data preparation', 'KPI definition and dashboards', 'Insights and recommendations'], link: 'project.html?id=uae-residential-investment' },
  { title: 'Process Analysis', sub: 'AS-IS / TO-BE', icon: 'flow', items: ['Process mapping', 'Gap analysis', 'Improvement recommendations'], link: 'projects.html' }
];

window.TOOLS = [
  { name: 'Power BI', abbr: 'BI', color: '#b8860b' }, { name: 'Excel', abbr: 'X', color: '#1e7a45' },
  { name: 'SQL', abbr: 'SQL', color: '#1f6fb2' }, { name: 'Python', abbr: 'Py', color: '#2b5d8a' },
  { name: 'Figma', abbr: 'F', color: '#c2410c' }, { name: 'Monday.com', abbr: 'M', color: '#be123c' },
  { name: 'Bitrix24', abbr: '24', color: '#0e7490' }, { name: 'Salesforce', abbr: 'SF', color: '#0369a1' }
];
