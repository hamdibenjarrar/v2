import { config } from 'dotenv';
config();

import '@/ai/flows/generate-impact-statistics.ts';
import '@/ai/flows/generate-hero-text.ts';
import '@/ai/flows/suggest-section-arrangement.ts';
import '@/ai/flows/request-document-access.ts';
import '@/ai/flows/verify-document-access.ts';
