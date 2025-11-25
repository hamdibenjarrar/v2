
export interface DocumentLink {
  id: string;
  url: string;
}

export type DocumentCategory = {
  id: 'legal' | 'reports' | 'partnerships';
  documents: DocumentLink[];
};

export const transparencyDocuments: DocumentCategory[] = [
  {
    id: 'legal',
    documents: [
      { id: 'statutes', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'legal_licenses', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'jort', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'domiciliation_cnss', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'tax_status', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'org_chart', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
    ],
  },
  {
    id: 'reports',
    documents: [
      { id: 'reports_2013_2019', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'reports_2020_2022', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'narrative_report_2022', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'narrative_report_2023', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'financials_2023', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
    ],
  },
  {
    id: 'partnerships',
    documents: [
      { id: 'ministry_agreements', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'dutch_donations', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
      { id: 'foreign_donations_2021_2023', url: 'https://drive.google.com/drive/folders/1-0_O3Y_QF3J-CHdJ8xJjJqYvQYqYqYqY' },
    ],
  },
];
