'use client';

import { useTranslations } from 'next-intl';
import { Hero } from '@/components/media/Hero';
import { Intro } from '@/components/media/Intro';
import { MediaCarousel } from '@/components/media/MediaCarousel';
import { VideoSection } from '@/components/media/VideoSection';
import { MoreArticles } from '@/components/media/MoreArticles';
import { AnimatedSection } from '@/components/animated-section';
import { DotBackground } from '@/components/ui/dot-background';

export default function MediaPage() {
  const t = useTranslations('Media');

  const mediaCards = t.raw('cards.media');
  const pdfCards = t.raw('cards.pdfs');
  const allMedia = [...mediaCards, ...pdfCards];
  const tvVideos = t.raw('tv.videos');
  const radioVideos = t.raw('radio.videos');
  const moreArticles = t.raw('more.articles');

  return (
    <div className="relative">
      <DotBackground />
      <div className="relative z-10">
        <Hero
          title={t('hero.media')}
          subtitle={t('hero.life')}
          tickerText={t('hero.ticker')}
        />
        <AnimatedSection>
          <Intro
            headline={t('dontClose.line1')}
            subheadline={t('dontClose.line2')}
            paragraph={t('aboutText')}
          />
        </AnimatedSection>
        <AnimatedSection>
          <MediaCarousel cards={allMedia} title={t('weAttractMedia')} />
        </AnimatedSection>
        <AnimatedSection>
          <VideoSection
            id="tv"
            title={t('tv.title')}
            videos={tvVideos}
            isYoutube
          />
        </AnimatedSection>
        <AnimatedSection>
          <VideoSection
            id="radio"
            title={t('radio.title')}
            description={t('radio.description')}
            videos={radioVideos}
          />
        </AnimatedSection>
        <AnimatedSection>
          <MoreArticles title={t('more.title')} articles={moreArticles} />
        </AnimatedSection>
      </div>
    </div>
  );
}
