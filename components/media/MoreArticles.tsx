'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ArticleEntry = {
  title: string;
  source: string;
  link: string;
};

export function MoreArticles({
  title,
  articles,
}: {
  title: string;
  articles: ArticleEntry[];
}) {
  if (!Array.isArray(articles)) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <motion.a
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-sm font-semibold text-accent mb-2">
                      {article.source}
                    </p>
                    <h3 className="font-bold text-lg text-primary mb-4">
                      {article.title}
                    </h3>
                  </div>
                  <div className="text-sm font-bold text-accent/80 group-hover:text-accent transition-colors flex items-center mt-auto">
                    Read the article <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
