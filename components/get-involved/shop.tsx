'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, Search, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/lib/types';

export function Shop() {
  const t = useTranslations('GetInvolved.shop');
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [supabase]);

  const stats = [
    { key: 'artisanalBoxes', value: '10+' },
    { key: 'organicProducts', value: '100%' },
    { key: 'schoolsSupported', value: '5' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const renderSkeletons = () => (
    Array.from({ length: 8 }).map((_, i) => (
       <motion.div key={i} variants={itemVariants}>
          <Card className="h-[450px] bg-secondary animate-pulse rounded-2xl"></Card>
       </motion.div>
    ))
  );

  const renderProducts = () => (
    products.map((product: Product) => (
      <motion.div key={product.id} variants={itemVariants}>
        <Card className="group overflow-hidden rounded-2xl shadow-md border h-full flex flex-col hover:shadow-xl transition-all duration-300">
          <CardHeader className="p-0">
            <div className="relative h-64 w-full">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-rose-500 hover:text-rose-600"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 className="mt-1 font-bold text-lg text-primary">{product.name}</h3>
            <p className="mt-2 text-sm text-gray-600 h-10 overflow-hidden text-ellipsis">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-lg text-primary">
                {product.price.toFixed(2)} DT
              </span>
              <div className="flex items-center gap-1">
                {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button className="w-full bg-accent hover:bg-accent/90">
              <ShoppingCart className="mr-2 h-4 w-4" /> {t('addToCart')}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    ))
  );

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 lg:py-32 bg-secondary/60">
        <div className="container text-center">
          <motion.p
            className="font-bold uppercase tracking-widest text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('officialPartner')}
          </motion.p>
          <motion.h1
            className="font-headline mt-4 text-4xl font-bold lg:text-5xl text-primary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button asChild size="lg">
              <Link href="#products">{t('discoverProducts')}</Link>
            </Button>
            <Button asChild size="lg" variant={'outline'}>
              <a href="/catalog.pdf" download>
                {t('downloadCatalog')}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                className="flex flex-col items-center p-6 bg-card rounded-xl shadow-sm border"
                variants={itemVariants}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                <p className="mt-2 text-muted-foreground">{t(stat.key)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="products" className="container py-12 md:py-24">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder={t('searchProducts')}
              className="pl-10 h-11"
            />
          </div>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder={t('allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                <SelectItem value="coffrets">{t('category.coffrets')}</SelectItem>
                <SelectItem value="evasion-bio">
                  {t('category.evasionBio')}
                </SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px] h-11">
                <SelectValue placeholder={t('newest')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t('newest')}</SelectItem>
                <SelectItem value="price-asc">{t('priceAsc')}</SelectItem>
                <SelectItem value="price-desc">{t('priceDesc')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {loading ? renderSkeletons() : renderProducts()}
        </motion.div>
      </section>
    </div>
  );
}
