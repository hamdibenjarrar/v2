import { SupabaseClient } from '@supabase/supabase-js';

export const shopProducts = [
  {
    name: 'Coffret Lella',
    description: 'Une composition de produits du terroir dans un coffret en bois peint à la main.',
    price: 150,
    category: 'Coffrets',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/lella.webp',
  },
  {
    name: 'Coffret El Bey',
    description: 'Une sélection de produits d’exception dans un coffret artisanal.',
    price: 250,
    category: 'Coffrets',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/bey.webp',
  },
  {
    name: 'Zgougou',
    description: 'Crème de pin d’Alep, 100% naturelle.',
    price: 30,
    category: 'Évasion Bio',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/zgougou.webp',
  },
  {
    name: 'Miel de Romarin',
    description: 'Miel de romarin pur, récolté dans nos fermes.',
    price: 45,
    category: 'Évasion Bio',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/miel.webp',
  },
   {
    name: 'Bsissa',
    description: 'Mélange traditionnel de céréales et légumineuses.',
    price: 20,
    category: 'Évasion Bio',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/bsissa.webp',
  },
  {
    name: 'Dattes Farcies',
    description: 'Dattes Deglet Nour farcies aux fruits secs.',
    price: 35,
    category: 'Coffrets',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/dattes.webp',
  },
  {
    name: 'Huile d’Olive',
    description: 'Huile d’olive extra vierge, pressée à froid.',
    price: 50,
    category: 'Évasion Bio',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/huile.webp',
  },
  {
    name: 'Harissa Traditionnelle',
    description: 'Harissa faite maison, pimentée et savoureuse.',
    price: 15,
    category: 'Évasion Bio',
    is_organic: true,
    image_url: 'https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/public/products/harissa.webp',
  }
];

export async function seedDatabase(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from('products')
    .insert(shopProducts);

  if (error) {
    throw new Error(`Error seeding database: ${error.message}`);
  }

  return data;
}
