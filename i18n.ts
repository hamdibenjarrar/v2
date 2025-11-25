
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './navigation';
 
// Can be imported from a shared config
const localeValues: readonly string[] = ['en', 'fr', 'ar'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!localeValues.includes(locale)) notFound();
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
