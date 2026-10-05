import { Matter, TimelineEvent, Finding, CaseDocument, BriefSection } from '../types';

export const mattersList: Matter[] = [
  {
    id: 'matter-01',
    name: 'Matter #01: Suresh Heights',
    suitNo: 'Civil Suit No. 142/2024',
    claimant: 'Rajesh Nair',
    respondent: 'Suresh Builders Pvt. Ltd.',
    claimantRole: 'Allottee, Unit #902, Tower B',
    respondentRole: 'Developer / CIN: U45200MH2012PTC229810',
    claimAmount: '₹65,00,000',
    paidAmount: '₹13,00,000',
    citationsCount: 48,
    counsel: 'Annette Vance',
    status: 'Active Matter',
  },
  {
    id: 'matter-02',
    name: 'Matter #02: Apex Infrastructure Arbitration',
    suitNo: 'Arb. Pet. 88/2024',
    claimant: 'Apex Infrastructure Ltd.',
    respondent: 'National Highways Authority',
    claimantRole: 'Concessionaire / EPC Contractor',
    respondentRole: 'Statutory Authority',
    claimAmount: '₹142,50,000',
    paidAmount: '₹88,20,000',
    citationsCount: 32,
    counsel: 'Annette Vance',
    status: 'In Hearing',
  },
  {
    id: 'matter-03',
    name: 'Matter #03: Kothari Estates Commercial Dispute',
    suitNo: 'Comm. Suit 19/2023',
    claimant: 'Kothari Estates LLP',
    respondent: 'Metropolitan Development Authority',
    claimantRole: 'Joint Venture Partner',
    respondentRole: 'Land Owning Agency',
    claimAmount: '₹410,00,000',
    paidAmount: '₹195,00,000',
    citationsCount: 64,
    counsel: 'Annette Vance',
    status: 'Pre-Trial Review',
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-01',
    eventNumber: 'Event #01',
    dateStr: '15 Mar 2021',
    timestampIso: '2021-03-15T11:30:00Z',
    title: 'Execution of Flat Buyer Agreement',
    description:
      'Parties executed registered agreement for Flat #1402, fixing completion deadline as Dec 31, 2022. Express covenant on elevator specifications (Schindler 7000 or equivalent German engineering) and occupancy handover schedule.',
    badgeLabel: 'Important Fact • Verified',
    badgeType: 'verified',
    sourceDoc: '03_Sale_Agreement_15Mar2022.pdf',
    pinpoint: 'Page 3, Recital C',
    exactQuote:
      'The Promoter unequivocally guarantees that Flat 1402 situated in Tower C shall be completed in all respects and possession handed over with valid Occupancy Certificate on or before December 31, 2022.',
    statusTag: 'Registered with Sub-Registrar VI',
    isCritical: false,
  },
  {
    id: 'event-02',
    eventNumber: 'Event #02',
    dateStr: '20 Dec 2022',
    timestampIso: '2022-12-20T14:15:00Z',
    title: 'Third Milestone Payment of Rs. 13,00,000/- Transferred',
    description:
      'Plaintiff transferred funds via RTGS as per architect handover stage notice. Complete compliance by purchaser established; total disbursement reached 95% of consideration prior to contractual default date.',
    badgeLabel: 'Payment Verified',
    badgeType: 'payment',
    currencyOrMetric: 'INR 13,00,000.00',
    sourceDoc: '07_Bank_Receipt_RTGS.pdf',
    pinpoint: 'Page 1, Ref UTR #92819',
    exactQuote:
      'UTR Number: UTIBR52022122092819. Debited to Suresh Heights Escrow A/C 990142010. Amount: 1,300,000.00. Status: Settlement Completed.',
    statusTag: 'Escrow Cleared Statement',
    isCritical: false,
  },
  {
    id: 'event-03',
    eventNumber: 'Event #03',
    dateStr: '31 Dec 2022',
    timestampIso: '2022-12-31T23:59:59Z',
    title: 'Contractual Possession Deadline Expired',
    description:
      'Builder failed to offer possession or obtain Occupancy Certificate from local municipal corporation. Tower C unfinished; common amenities including lifts, fire suppression, and perimeter road incomplete as of statutory midnight.',
    badgeLabel: 'Critical Default • Alleged Breach Date',
    badgeType: 'critical',
    currencyOrMetric: 'STATUTORY CAUSE OF ACTION',
    sourceDoc: '01_Plaint_OS142_2024.pdf',
    pinpoint: 'Page 8, Para 12',
    exactQuote:
      'Para 12: That the time was of the essence of contract. The statutory deadline of 31st December 2022 lapsed without either grant of Occupancy Certificate or tender of physical vacant possession of Suit Flat 1402.',
    statusTag: 'Day Zero for Interest Accrual',
    isCritical: true,
  },
  {
    id: 'event-04',
    eventNumber: 'Event #04',
    dateStr: '11 Mar 2023',
    timestampIso: '2023-03-11T10:00:00Z',
    title: 'Builder Written Letter Citing Cost Rationality for Equipment Substitution',
    description:
      'Builder formally wrote to all tower residents admitting unilateral elevator replacement from contracted Schindler 7000 high-speed units to domestic lifts, invoking supply chain volatility and pricing inflation.',
    badgeLabel: 'Adversary Admission • Verified',
    badgeType: 'admission',
    currencyOrMetric: 'EVIDENTIARY GOLD',
    sourceDoc: '04_Builder_Notice_11Mar2023.pdf',
    pinpoint: 'Page 2, Para 4',
    exactQuote:
      'Para 4: Due to unavoidable import constraints and unexpected cost escalation of overseas fixtures, the developer was compelled to substitute Schindler 7000 units with localized equivalent systems.',
    statusTag: 'Estoppel by Representation',
    isCritical: false,
  },
  {
    id: 'event-05',
    eventNumber: 'Event #05',
    dateStr: '20 Jan 2024',
    timestampIso: '2024-01-20T16:45:00Z',
    title: 'Service of Formal Legal Notice of Breach',
    description:
      'Plaintiff issued 30-day notice demanding possession or liquidated damages along with statutory interest at 18% p.a. Postal delivery confirmed on Jan 23 at registered corporate address of the promoter.',
    badgeLabel: 'Notice Served',
    badgeType: 'notice',
    currencyOrMetric: 'POSTAL CONSIGNMENT #EK882910',
    sourceDoc: '04_Legal_Notice_20Jan2023.pdf',
    pinpoint: 'Page 1 + Postal Ack',
    exactQuote:
      'Notice: You are hereby called upon to execute possession within 30 days failing which proceedings under Section 18 of RERA & Suit for Specific Performance shall be instituted forthwith.',
    statusTag: 'Delivered 23 Jan 2024',
    isCritical: false,
  },
];

export const initialFindings: Finding[] = [
  {
    id: 'finding-104',
    findingCode: '#CN-104',
    category: 'contradiction',
    impactBadge: 'Statement Contradiction · High Evidentiary Impact',
    impactVariant: 'red',
    title: 'Discrepancy regarding primary cause of project delay',
    narrative:
      'Opposing counsel claims project delay was caused by pandemic force majeure and cement supply halt (Para 19), whereas contemporary Q2 Investor Presentation (Slide 18) indicates supply chain materials were stockpiled 120 days in advance.',
    sourceFile: '02_Written_Statement_Defendant.pdf',
    sourcePage: 'Page 14 of 48 • Certified Copy',
    quoteSnippet:
      '“Unavoidable concrete pouring moratorium imposed by district administration caused severe cascading stoppage from March through July 2023, constituting a statutory force majeure event beyond the answering Defendant\'s reasonable contemplation.”',
    courtHeader: 'IN THE COURT OF SR. CIVIL JUDGE, BOMBAY',
    courtCase: 'C.S. 142/2024',
    leadPara: '18. The Defendant submits that all development schedule milestones were pursued diligently with commercial expedience.',
    courtPara: 'Para 19',
    tailPara: '20. Consequently, invocation of Clause 14 liquidated damages is premature and untenable at law.',
    coordinates: 'Page 14, Paragraph 19',
    ocrParity: '99.4%',
    boxA: {
      label: 'Court Filing · Para 19, Page 14',
      docName: '02_Written_Statement.pdf',
      quote:
        '“The completion was severely impeded by unforeseen district administration concrete moratoriums and acute supply embargoes...”',
    },
    boxB: {
      label: 'Investor Presentation · Slide 18',
      docName: '05_Investor_Deck.pdf',
      quote:
        '“Zero supply chain impediments; raw materials stockpiled 120 days in advance of monsoon cycle with zero delivery bottlenecks observed.”',
    },
    reviewStatus: 'pending',
  },
  {
    id: 'finding-309',
    findingCode: '#AD-309',
    category: 'admission',
    impactBadge: 'Party Admission · Lawyer Verified',
    impactVariant: 'blue',
    title: 'Builder conceded failure to install Schindler 7000 elevators',
    narrative:
      'Admitted in Defendant Written Statement (Para 21, Page 12) that domestic substitutes were deployed due to cost escalations without plaintiff consent.',
    sourceFile: '04_Reply_to_Notice_12Feb2023.pdf',
    sourcePage: 'Page 3 of 6 • Para 7',
    quoteSnippet:
      '“Due to cost escalation and vendor delay, developer substituted domestic lifts with comparable safety ratings without requiring additional consideration from allottees.”',
    courtHeader: 'FORMAL ADVOCATE REPLY TO STATUTORY NOTICE',
    courtCase: 'RE: FLAT 1402 DISPUTE',
    leadPara: '6. With respect to amenities specifications in Schedule D, Developer has made commercially viable adjustments.',
    courtPara: 'Para 7',
    tailPara: '8. The substitution does not degrade structural safety certificates issued by the municipal lift inspectorate.',
    coordinates: 'Page 3, Paragraph 7',
    ocrParity: '99.8%',
    legalRelevance:
      'Direct admission under Section 18 Indian Evidence Act. Shifts burden of proof onto developer regarding habitability standards.',
    reviewStatus: 'accepted',
    verifiedNote: 'Verified by Annette Vance on Oct 12 · Included in Case Brief',
  },
  {
    id: 'finding-082',
    findingCode: '#EV-082',
    category: 'fact',
    impactBadge: 'Important Fact · Verified',
    impactVariant: 'emerald',
    title: '₹13,00,000/- third milestone payment confirmed received',
    narrative:
      'Payment verified through certified bank ledger statement and RTGS transaction settlement reference UTIBR52022122092819 to builder designated project escrow.',
    sourceFile: 'Ex-P7_Bank_Ledger_Confirmation.pdf',
    sourcePage: 'Page 2 of 4 • Bank RTGS Record',
    quoteSnippet:
      '“UTR #92819 credited INR 13,00,000/- to Escrow Account #400192 on 14-Aug-2022 towards Tower B Completion milestone.”',
    courtHeader: 'HDFC BANK COMMERCIAL BANKING DIVISION',
    courtCase: 'ESCROW RECONCILIATION CERTIFICATE',
    leadPara: 'Client Account: Suresh Heights Master Real Estate Project Escrow 990142010.',
    courtPara: 'Ref #92819',
    tailPara: 'Transaction final, non-recallable, audited under RBI Clearing Guidelines.',
    coordinates: 'Page 2, Record Row 14',
    ocrParity: '100%',
    factDetails: {
      instrument: 'Bank RTGS UTR #92819',
      source: 'Ex-P7, Page 2',
      clearedDate: '14 Aug 2022',
      linkedClause: 'Linked to Builder Agreement Clause 4.2 (Certified Record)',
    },
    reviewStatus: 'accepted',
    verifiedNote: 'Verified against Bank Ledger Exhibit Ex-P7',
  },
  {
    id: 'finding-105',
    findingCode: '#CN-105',
    category: 'contradiction',
    impactBadge: 'Contradiction · High Priority',
    impactVariant: 'red',
    title: 'Possession date contradiction',
    narrative:
      'Defendant\'s written statement claims possession handover was extended by mutual oral understanding, whereas the registered Sale Agreement (Clause 4.2) and Legal Notice mandate strict handover by 31 December 2022.',
    sourceFile: '03_Sale_Agreement_15Mar2022.pdf',
    sourcePage: 'Page 4, Clause 4.2',
    quoteSnippet:
      '“Any amendment, alteration or extension of the possession handover date shall only be binding if made in writing and executed with equal solemnity as this registered deed.”',
    courtHeader: 'SUB-REGISTRAR VI, BOMBAY',
    courtCase: 'REG DEED 1042/2021',
    courtPara: 'Clause 4.2',
    coordinates: 'Page 4, Clause 4.2',
    ocrParity: '99.6%',
    boxA: {
      label: 'Defendant Written Statement Para 19',
      docName: '02_Written_Statement.pdf',
      quote:
        '“The parties mutually arrived at an oral understanding that possession would be phased during Q2 2023.”',
    },
    boxB: {
      label: 'Registered Sale Agreement Clause 4.2',
      docName: '03_Sale_Agreement.pdf',
      quote:
        '“Time is of the essence. No oral variance or informal understanding shall have legal effect.”',
    },
    reviewStatus: 'pending',
  },
];

export const caseDocuments: CaseDocument[] = [
  {
    id: 'doc-01',
    title: '03_Sale_Agreement_15Mar2022.pdf',
    category: 'Agreements',
    pages: 42,
    fileSize: '8.4 MB',
    uploadedDate: '12 Oct 2024',
    ocrAccuracy: 99.6,
    exhibitCode: 'Ex-C1',
    hash: 'SHA256: 9a2f7c01b...14e28',
    verified: true,
    provenance: 'Registered Sub-Registrar VI Mumbai',
  },
  {
    id: 'doc-02',
    title: '01_Plaint_OS142_2024.pdf',
    category: 'Pleadings',
    pages: 28,
    fileSize: '4.2 MB',
    uploadedDate: '12 Oct 2024',
    ocrAccuracy: 99.4,
    exhibitCode: 'Ex-C2',
    hash: 'SHA256: 4b1c88d22...99d12',
    verified: true,
    provenance: 'Commercial Court Bombay Registry',
  },
  {
    id: 'doc-03',
    title: '02_Written_Statement_Defendant.pdf',
    category: 'Pleadings',
    pages: 34,
    fileSize: '6.1 MB',
    uploadedDate: '14 Oct 2024',
    ocrAccuracy: 98.9,
    exhibitCode: 'Ex-R1',
    hash: 'SHA256: 71dc401a...23b90',
    verified: true,
    provenance: 'Defendant Counsel Service Copy',
  },
  {
    id: 'doc-04',
    title: '07_Bank_Receipt_RTGS.pdf',
    category: 'Financial & Banking',
    pages: 4,
    fileSize: '1.2 MB',
    uploadedDate: '12 Oct 2024',
    ocrAccuracy: 100,
    exhibitCode: 'Ex-P7',
    hash: 'SHA256: 3c8e90ff...8812a',
    verified: true,
    provenance: 'HDFC Escrow Direct Branch Clearance',
  },
  {
    id: 'doc-05',
    title: '04_Builder_Notice_11Mar2023.pdf',
    category: 'Notices & Postal',
    pages: 6,
    fileSize: '1.8 MB',
    uploadedDate: '13 Oct 2024',
    ocrAccuracy: 99.1,
    exhibitCode: 'Ex-C4',
    hash: 'SHA256: bb401e12...7701c',
    verified: true,
    provenance: 'Circulated to Resident Allottees',
  },
  {
    id: 'doc-06',
    title: '04_Legal_Notice_20Jan2023.pdf',
    category: 'Notices & Postal',
    pages: 9,
    fileSize: '2.5 MB',
    uploadedDate: '13 Oct 2024',
    ocrAccuracy: 99.3,
    exhibitCode: 'Ex-C3',
    hash: 'SHA256: ee02441a...84a91',
    verified: true,
    provenance: 'India Post Speed Post Delivery Proof',
  },
  {
    id: 'doc-07',
    title: '05_Investor_Deck_FY23.pdf',
    category: 'Agreements',
    pages: 38,
    fileSize: '14.2 MB',
    uploadedDate: '15 Oct 2024',
    ocrAccuracy: 97.8,
    exhibitCode: 'Ex-C11',
    hash: 'SHA256: f11928cc...9011e',
    verified: true,
    provenance: 'Public Corporate Disclosure Series-A',
  },
  {
    id: 'doc-08',
    title: 'Ex-P14_Postal_Ack_Slip.pdf',
    category: 'Notices & Postal',
    pages: 2,
    fileSize: '820 KB',
    uploadedDate: '16 Oct 2024',
    ocrAccuracy: 92.4,
    exhibitCode: 'Ex-P14',
    hash: 'SHA256: aa771801...4401f',
    verified: false,
    provenance: 'Speed Post Consignment Receipt #EK882910',
  },
];

export const briefSections: BriefSection[] = [
  {
    id: 'sec-1',
    num: '01',
    title: 'Matter Identification & Parties',
    tag: '3 Verified Citations',
    content:
      'The Claimant, Rajesh Nair, residing at Flat 401, Nilgiri Towers, Andheri West, Mumbai, is the individual allottee of Unit No. 902 in Wing B of the project known as \'Suresh Heights\'.',
    subContent:
      'The Respondent, Suresh Builders Private Limited, is an incorporated corporate developer with Corporate Identity Number U45200MH2012PTC229810, having its registered corporate headquarters at 12th Floor, Nariman Point Commercial Complex, Mumbai 400021.',
    citations: [
      {
        token: '[Sale Agmt. p. 2]',
        ref: 'Sale Agmt. p. 2',
        doc: 'Exhibit C-1: 03_Sale_Agreement_15Mar2022.pdf',
        snippet: 'Rajesh Nair, an Indian inhabitant, residing at Mumbai, hereinafter referred to as the Allottee / Purchaser.',
      },
      {
        token: '[Plaint p. 3]',
        ref: 'Plaint p. 3',
        doc: 'Exhibit C-2: 01_Plaint_OS142_2024.pdf',
        snippet: 'Respondent SBPL is a real estate developer company registered under Companies Act with office at Nariman Point.',
      },
      {
        token: '[ROC Search Exh. C-5]',
        ref: 'ROC Search Exh. C-5',
        doc: 'Exhibit C-5: ROC Master Extract',
        snippet: 'Master data extract Ministry of Corporate Affairs for SBPL showing active status and registered office address.',
      },
    ],
  },
  {
    id: 'sec-2',
    num: '02',
    title: 'Nature of the Dispute & Jurisdiction',
    tag: '2 Citations',
    content:
      'The dispute arises from the persistent failure of SBPL to deliver vacant physical possession of Unit #902 along with requisite Occupancy Certification, alongside unauthorized unilateral alterations to common elevator amenities.',
    subContent:
      'Arbitration jurisdiction is invoked under Clause 21.2 of the registered Agreement for Sale dated February 14, 2021, which provides that any unsettled disputes shall be referred to a Sole Arbitrator seated in Mumbai under the Arbitration and Conciliation Act, 1996. The Commercial Division of the Hon\'ble High Court of Bombay confirmed the appointment via Section 11(6) Order dated January 18, 2024.',
    citations: [
      {
        token: '[Sale Agmt. Clause 21.2]',
        ref: 'Sale Agmt. Clause 21.2',
        doc: 'Exhibit C-1: 03_Sale_Agreement_15Mar2022.pdf',
        snippet: 'All disputes arising out of or touching this Agreement shall be referred to Sole Arbitrator appointed in accordance with Indian Arbitration & Conciliation Act 1996. Seat: Mumbai.',
      },
      {
        token: '[HC Order p. 4]',
        ref: 'HC Order p. 4',
        doc: 'Exhibit C-4: High Court Section 11 Order',
        snippet: 'Order appointing Retd. Justice D.K. Mehta as Sole Arbitrator for adjudication of claims between parties.',
      },
    ],
  },
  {
    id: 'sec-3',
    num: '03',
    title: 'Summary of the Contractual Relationship',
    tag: '3 Citations',
    content:
      'The contractual nexus is governed by the registered Agreement for Sale executed on February 14, 2021, and registered at the Sub-Registrar of Assurances, Andheri-3, under Document No. 1042/2021.',
    subContent:
      'Total agreed transaction consideration was fixed at ₹65,00,000 (Rupees Sixty Five Lakhs Only) inclusive of dedicated parking rights for stilt slot S-14. The terms tied incremental disbursements strictly to slab casting certifications issued by the Respondent\'s independent structural engineer.',
    citations: [
      {
        token: '[Sale Agmt. p. 1]',
        ref: 'Sale Agmt. p. 1',
        doc: 'Exhibit C-1: 03_Sale_Agreement_15Mar2022.pdf',
        snippet: 'Agreement executed 14th Feb 2021 between Suresh Builders Pvt Ltd and Rajesh Nair. Reg Doc 1042/2021.',
      },
      {
        token: '[Sale Agmt. Clause 3.1]',
        ref: 'Sale Agmt. Clause 3.1',
        doc: 'Exhibit C-1: 03_Sale_Agreement_15Mar2022.pdf',
        snippet: 'The total agreed consideration for said Apartment and Stilt Parking S-14 is Rs. 65,00,000 payable as per construction milestones in Schedule C.',
      },
      {
        token: '[Sale Agmt. Sched. C]',
        ref: 'Sale Agmt. Sched. C',
        doc: 'Exhibit C-1: 03_Sale_Agreement_15Mar2022.pdf',
        snippet: 'Schedule C specifies payment linked to 7th slab casting, brickwork, and handover stage.',
      },
    ],
  },
  {
    id: 'sec-4',
    num: '04',
    title: 'Critical Milestone Dates & Deadlines',
    tag: '4 Citations',
    content:
      'The agreed possession deadline expired on December 31, 2022. The 6-month grace window concluded on June 30, 2023. As of date of statement, SBPL has neither acquired the full Occupancy Certificate nor tendered lawful possession.',
    citations: [
      {
        token: '[Sale Agmt. Cl. 7.1]',
        ref: 'Sale Agmt. Cl. 7.1',
        doc: 'Exhibit C-1',
        snippet: 'Handover shall be completed by 31 December 2022 with valid Occupancy Certificate.',
      },
      {
        token: '[Sale Agmt. Cl. 7.2]',
        ref: 'Sale Agmt. Cl. 7.2',
        doc: 'Exhibit C-1',
        snippet: 'Grace period not exceeding six months may be invoked solely for force majeure.',
      },
      {
        token: '[Legal Notice Exh. C-3]',
        ref: 'Legal Notice Exh. C-3',
        doc: 'Exhibit C-3',
        snippet: 'Statutory demand notice served upon default of primary and grace periods.',
      },
      {
        token: '[Written Stmt. p. 8]',
        ref: 'Written Stmt. p. 8',
        doc: 'Exhibit R-1: Written Statement',
        snippet: 'Respondent acknowledges occupancy certificate application was held in abeyance pending municipal water approvals.',
      },
    ],
  },
  {
    id: 'sec-5',
    num: '05',
    title: 'Chronology of Material Events',
    tag: 'Synthesized from Timeline',
    content: 'Full chronological progression synthesized across 18 docket events:',
    listItems: [
      {
        title: '14 Feb 2021',
        desc: 'Execution and registration of Agreement for Sale; booking deposit of ₹6,50,000 paid [Sale Agmt. p. 4].',
        citation: '[Sale Agmt. p. 4]',
      },
      {
        title: '22 Nov 2021',
        desc: 'Claimant pays second construction tranche of ₹6,50,000 upon 7th slab casting certificate [HDFC Bank Tr. #92819].',
        citation: '[HDFC Bank Tr. #92819]',
      },
      {
        title: '31 Dec 2022',
        desc: 'Contractual possession date lapses without notice of delay or extension application to RERA Authority.',
      },
      {
        title: '18 May 2023',
        desc: 'SBPL sends unilateral circular notifying substitution of Otis high-speed elevators with regional generic vendor lifts due to cost overrun [SBPL Circular 18/05].',
        citation: '[SBPL Circular 18/05]',
      },
      {
        title: '14 Sep 2023',
        desc: 'Claimant serves formal Demand & Notice of Dispute under Clause 21, claiming refund or immediate possession with 18% p.a. delayed interest [Notice Track Report].',
        citation: '[Notice Track Report]',
      },
    ],
    citations: [
      {
        token: '[Sale Agmt. p. 4]',
        ref: 'Sale Agmt. p. 4',
        doc: 'Exhibit C-1',
        snippet: 'Receipt of booking sum acknowledged.',
      },
      {
        token: '[HDFC Bank Tr. #92819]',
        ref: 'HDFC Bank Tr. #92819',
        doc: 'Exhibit C-6',
        snippet: 'NEFT remittance voucher to Suresh Builders Pvt Ltd escrow account.',
      },
      {
        token: '[SBPL Circular 18/05]',
        ref: 'SBPL Circular 18/05',
        doc: 'Exhibit C-7',
        snippet: 'Notice to allottees notifying equipment supply chain alteration.',
      },
      {
        token: '[Notice Track Report]',
        ref: 'Notice Track Report',
        doc: 'Exhibit C-8',
        snippet: 'India Post Speed Post delivery confirmation signed at Nariman Point office.',
      },
    ],
  },
  {
    id: 'sec-6',
    num: '06',
    title: 'Payments & Financial Considerations',
    tag: 'Fully Reconciled',
    content:
      'Claimant has disbursed a cumulative sum of ₹13,00,000 (20% of consideration) as confirmed in audited escrow banking entries:',
    tableRows: [
      {
        date: '14 Feb 2021',
        instrument: 'Advance Earnest (Cheque #102914)',
        amount: '₹6,50,000',
        citation: '[Sale Agmt. Cl. 3.2]',
      },
      {
        date: '22 Nov 2021',
        instrument: 'Slab 7 Milestone (NEFT HDFC #92819)',
        amount: '₹6,50,000',
        citation: '[Receipt #402 SBPL]',
      },
    ],
    subContent:
      'Respondent SBPL admits receipt of both installments in Paragraph 12 of its Statement of Defense without reservation.',
    citations: [
      {
        token: '[Sale Agmt. Cl. 3.2]',
        ref: 'Sale Agmt. Cl. 3.2',
        doc: 'Exhibit C-1',
        snippet: 'Receipt of Rs 6,50,000 acknowledged at execution.',
      },
      {
        token: '[Receipt #402 SBPL]',
        ref: 'Receipt #402 SBPL',
        doc: 'Exhibit C-6',
        snippet: 'Official stamped receipt SBPL confirming clearance.',
      },
      {
        token: '[Written Stmt. Para 12]',
        ref: 'Written Stmt. Para 12',
        doc: 'Exhibit R-1',
        snippet: 'Respondent does not contest receipt of Rs 13,00,000 from the Claimant.',
      },
    ],
  },
  {
    id: 'sec-7',
    num: '07',
    title: 'Obligations of the Parties',
    tag: 'Contract Specs',
    content:
      'Claimant Obligations: Timely payment of demand milestones subject to minimum 15 days written notice with accompanying engineer architect progress certifications [Clause 4.1].',
    subContent:
      'Respondent Obligations: Complete project per approved sanction plan MCGM/EB/4291/WS, install high-speed Otis/Schindler elevators per Schedule D Specification, acquire Occupancy Certificate from Municipal Corporation of Greater Mumbai, and deliver vacant possession by Dec 31, 2022 [Clause 14 & Schedule D].',
    citations: [
      {
        token: '[Sale Agmt. Cl. 4.1]',
        ref: 'Sale Agmt. Cl. 4.1',
        doc: 'Exhibit C-1',
        snippet: 'Allottee shall pay demanded milestones within 15 days of verified demand notice.',
      },
      {
        token: '[Sale Agmt. Sched. D]',
        ref: 'Sale Agmt. Sched. D',
        doc: 'Exhibit C-1',
        snippet: 'Specifications: Twin high-speed 16 passenger Otis/Schindler automated elevators.',
      },
    ],
  },
  {
    id: 'sec-8',
    num: '08',
    title: 'Alleged Breaches & Defaults',
    tag: '2 Primary Defaults',
    content:
      'Default 1: Possessory Delay Exceeding 18 Months — Failure to complete construction, procure Full Occupancy Certificate, or hand over Unit #902 within contractual or extended grace timelines. Breach of Section 18 of Real Estate (Regulation and Development) Act, 2016 [Plaint Para 16].',
    subContent:
      'Default 2: Material Spec Downgrade Without Written Consent — Unilateral replacement of specified Otis brand elevators with substandard regional brand units in contravention of Clause 14.3 and statutory requirement under Section 14(2)(ii) of RERA [Architect Inspection Report].',
    citations: [
      {
        token: '[Plaint Para 16]',
        ref: 'Plaint Para 16',
        doc: 'Exhibit C-2',
        snippet: 'Claimant asserts continuous possessory default from 1 Jan 2023 onwards.',
      },
      {
        token: '[Architect Inspection Report]',
        ref: 'Architect Inspection Report',
        doc: 'Exhibit C-9',
        snippet: 'Site verification confirms installation of non-conforming local elevator brand.',
      },
    ],
  },
  {
    id: 'sec-9',
    num: '09',
    title: 'Opponent Admissions',
    tag: '3 Verified Admissions',
    content:
      'The following concessions have been made formally in the Respondent\'s filed pleadings and contemporaneous letters:',
    listItems: [
      {
        title: 'Admission of Delay',
        desc: 'SBPL admits in correspondence dated June 20, 2023, that the project suffered a minimum 14-month construction stoppage due to municipal plan amendments [SBPL Letter 20/06/23].',
        citation: '[SBPL Letter 20/06/23]',
      },
      {
        title: 'Admission of Elevator Brand Substitution',
        desc: 'In Written Statement Paragraph 21, SBPL explicitly concedes substituting Otis lifts due to "global vendor semiconductor supply constraints" [Written Stmt. Para 21].',
        citation: '[Written Stmt. Para 21]',
      },
      {
        title: 'Admission of Funds Receipt',
        desc: 'Full admission of having received ₹13,00,000 from the Claimant without raising any counter demand for outstanding payments before September 2023 [Written Stmt. Para 12].',
        citation: '[Written Stmt. Para 12]',
      },
    ],
    citations: [
      {
        token: '[SBPL Letter 20/06/23]',
        ref: 'SBPL Letter 20/06/23',
        doc: 'Exhibit C-10',
        snippet: 'SBPL states delay was occasioned by external municipal planning hold-ups.',
      },
      {
        token: '[Written Stmt. Para 21]',
        ref: 'Written Stmt. Para 21',
        doc: 'Exhibit R-1',
        snippet: 'Respondent admits procuring alternate lift brand to prevent further handover delays.',
      },
      {
        token: '[Written Stmt. Para 12]',
        ref: 'Written Stmt. Para 12',
        doc: 'Exhibit R-1',
        snippet: 'Payments by allottee acknowledged as received on ledger dates.',
      },
    ],
  },
  {
    id: 'sec-10',
    num: '10',
    title: 'Identified Conflicts & Inconsistencies',
    tag: 'Forensic Finding',
    content:
      'Conflict: Force Majeure Claim vs. Commercial Investor Pitch — In its Statement of Defense (Para 14), SBPL pleads complete stagnation during Q1-Q3 2022 on grounds of regional cement shortages and force majeure events. However, the Claimant has produced the Respondent\'s audited Series-A Investor Pitch Deck dated August 2022 stating Suresh Heights was "progressing 4 months ahead of schedule with 90% structural completion" [Investor Presentation p. 19] vs. [Written Stmt. Para 14].',
    citations: [
      {
        token: '[Investor Presentation p. 19]',
        ref: 'Investor Presentation p. 19',
        doc: 'Exhibit C-11',
        snippet: 'Investor deck explicitly declaring Suresh Heights fully capitalized and running ahead of delivery schedules.',
      },
      {
        token: '[Written Stmt. Para 14]',
        ref: 'Written Stmt. Para 14',
        doc: 'Exhibit R-1',
        snippet: 'Pleading total paralysis and impossibility under Force Majeure.',
      },
    ],
  },
  {
    id: 'sec-11',
    num: '11',
    title: 'Statutory & Regulatory Clearances',
    tag: 'Regulatory Status',
    content:
      'MahaRERA Project Registration No. P51800028192 listed an original completion date of December 31, 2022. While MahaRERA granted a generic 6-month pandemic-related extension for ongoing projects, no project-specific extension was formally applied for after June 2023 [MahaRERA Portal Sheet].',
    subContent:
      'Chief Fire Officer (CFO) provisional clearance was issued on Oct 11, 2020. However, Final Fire Safety NOC has remained withheld due to inadequate refuge area width on Floors 7 and 14 [MCGM Fire Dept Letter].',
    citations: [
      {
        token: '[MahaRERA Portal Sheet]',
        ref: 'MahaRERA Portal Sheet',
        doc: 'Exhibit C-12',
        snippet: 'MahaRERA web extract showing lapsed date without active project renewal.',
      },
      {
        token: '[MCGM Fire Dept Letter]',
        ref: 'MCGM Fire Dept Letter',
        doc: 'Exhibit C-13',
        snippet: 'Inspection report identifying 3 non-compliance items preventing final fire clearance.',
      },
    ],
  },
  {
    id: 'sec-12',
    num: '12',
    title: 'Notice & Communications Exchange',
    tag: 'Formal Notice Proven',
    content:
      'Formal Advocate Legal Notice of Demand & Arbitral Invocation was dispatched by Advocate Annette Vance on behalf of Claimant via Speed Post (Consignment #EM92819201IN) and registered email on September 14, 2023 [Legal Notice 14/09].',
    subContent:
      'Delivery was successfully confirmed on September 16, 2023, per India Post tracking report and signed acknowledgment receipt stamped at SBPL corporate front office [India Post Track p. 2]. Respondent issued an evasive interim reply on October 12, 2023, failing to cure the default within the 30-day window [SBPL Reply Letter].',
    citations: [
      {
        token: '[Legal Notice 14/09]',
        ref: 'Legal Notice 14/09',
        doc: 'Exhibit C-3',
        snippet: 'Formal notice invoking clause 21 arbitration and demanding cure within 30 days.',
      },
      {
        token: '[India Post Track p. 2]',
        ref: 'India Post Track p. 2',
        doc: 'Exhibit C-8',
        snippet: 'Delivered at Nariman Point corporate branch.',
      },
      {
        token: '[SBPL Reply Letter]',
        ref: 'SBPL Reply Letter',
        doc: 'Exhibit R-2',
        snippet: 'Interim response seeking 90 day forbearance.',
      },
    ],
  },
  {
    id: 'sec-13',
    num: '13',
    title: 'Summary of Filed Exhibits & Provenance',
    tag: 'Dossier Provenance',
    content:
      'All 5 primary evidentiary document packages cross-referenced in this brief have undergone digital OCR verification, page hashing, and chain-of-custody logging: Exh. C-1 (42 pages, MD5: 9a2f...14e), Exh. C-2 (28 pages, MD5: 4b1c...99d), Exh. C-3 (9 pages, MD5: ee02...84a), and Exh. R-1 (34 pages, MD5: 71dc...23b).',
    citations: [
      {
        token: '[Exhibit Hash Manifest]',
        ref: 'Exhibit Hash Manifest',
        doc: 'Docket Register',
        snippet: 'SHA-256 and MD5 forensic checksum log verified on 16-Oct-2024.',
      },
    ],
  },
  {
    id: 'sec-14',
    num: '14',
    title: 'Uncontested Facts',
    tag: 'Hearing Foundation',
    content:
      'The following essential core facts are admitted or uncontroverted by both Claimant and Respondent in their filed pleadings: 1. Valid execution and registration of Agreement for Sale on Feb 14, 2021. 2. Receipt of ₹13,00,000 by Respondent without disputed dishonor. 3. Lapsing of the primary delivery date (31 Dec 2022) without physical handover of Unit #902. 4. Non-issuance of Final Occupancy Certificate by MCGM as of the statement date.',
    citations: [
      {
        token: '[Common Core Record]',
        ref: 'Common Core Record',
        doc: 'Joint Agreed Minute',
        snippet: 'Signed joint statement of undisputed factual matrix.',
      },
    ],
  },
  {
    id: 'sec-15',
    num: '15',
    title: 'Outstanding Verification Items',
    tag: '0 Pending',
    content:
      'All 15 Factual Sections Verified & Attested. Every extracted statement is tethered to filed exhibits. No pending OCR anomalies remain.',
    subContent: 'Signed by Annette Vance, Advocate on Record.',
    citations: [
      {
        token: '[Counsel Attestation]',
        ref: 'Counsel Attestation',
        doc: 'Bar Council Certified Token #AV-902',
        snippet: 'Digital signature applied with timestamp 2026-10-05T11:40:00Z.',
      },
    ],
  },
];
