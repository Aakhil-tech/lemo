export type NavView =
  | 'case-overview'
  | 'documents-verification'
  | 'findings-triage'
  | 'chronological-timeline'
  | 'structured-case-brief';

export interface Matter {
  id: string;
  name: string;
  suitNo: string;
  claimant: string;
  respondent: string;
  claimantRole: string;
  respondentRole: string;
  claimAmount: string;
  paidAmount: string;
  citationsCount: number;
  counsel: string;
  status: string;
}

export interface TimelineEvent {
  id: string;
  eventNumber: string;
  dateStr: string;
  timestampIso?: string;
  title: string;
  description: string;
  badgeLabel: string;
  badgeType: 'verified' | 'critical' | 'admission' | 'payment' | 'notice';
  currencyOrMetric?: string;
  sourceDoc: string;
  pinpoint: string;
  exactQuote: string;
  statusTag?: string;
  isCritical?: boolean;
}

export interface Finding {
  id: string;
  findingCode: string;
  category: 'contradiction' | 'admission' | 'fact' | 'evidence';
  impactBadge: string;
  impactVariant: 'red' | 'amber' | 'blue' | 'emerald' | 'gray';
  title: string;
  narrative: string;
  sourceFile: string;
  sourcePage: string;
  quoteSnippet: string;
  courtPara?: string;
  courtHeader?: string;
  courtCase?: string;
  leadPara?: string;
  tailPara?: string;
  coordinates?: string;
  ocrParity?: string;
  
  // Side-by-side comparison for contradictions
  boxA?: {
    label: string;
    docName: string;
    quote: string;
  };
  boxB?: {
    label: string;
    docName: string;
    quote: string;
  };

  // Legal relevance callout for admissions
  legalRelevance?: string;

  // Mini stats for facts
  factDetails?: {
    instrument: string;
    source: string;
    clearedDate: string;
    linkedClause: string;
  };

  // Review status
  reviewStatus: 'pending' | 'accepted' | 'contextual' | 'dismissed';
  verifiedNote?: string;
}

export interface CaseDocument {
  id: string;
  title: string;
  category: 'Pleadings' | 'Agreements' | 'Financial & Banking' | 'Notices & Postal';
  pages: number;
  fileSize: string;
  uploadedDate: string;
  ocrAccuracy: number;
  exhibitCode: string;
  hash: string;
  verified: boolean;
  provenance: string;
}

export interface BriefSection {
  id: string;
  num: string;
  title: string;
  tag: string;
  content: string;
  subContent?: string;
  citations: {
    token: string;
    ref: string;
    doc: string;
    snippet: string;
  }[];
  tableRows?: {
    date: string;
    instrument: string;
    amount: string;
    citation: string;
  }[];
  listItems?: {
    title: string;
    desc: string;
    citation?: string;
  }[];
}
