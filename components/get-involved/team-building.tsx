
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import {
  Check,
  Mail,
  Phone,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    nameKey: 'package1.name',
    descriptionKey: 'package1.description',
    durationKey: 'package1.duration',
    participants: '10-30',
  },
  {
    nameKey: 'package2.name',
    descriptionKey: 'package2.description',
    durationKey: 'package2.duration',
    participants: '10-30',
  },
  {
    nameKey: 'package3.name',
    descriptionKey: 'package3.description',
    durationKey: 'package3.duration',
    participants: '10-30',
  },
  {
    nameKey: 'package4.name',
    descriptionKey: 'package4.description',
    durationKey: 'package4.duration',
    participants: '10-30',
  },
  {
    nameKey: 'package5.name',
    descriptionKey: 'package5.description',
    durationKey: 'package5.duration',
    participants: '10-30',
  },
];

const processSteps = [
  {
    step: 1,
    titleKey: 'processSteps.step1.title',
    descriptionKey: 'processSteps.step1.description',
  },
  {
    step: 2,
    titleKey: 'processSteps.step2.title',
    descriptionKey: 'processSteps.step2.description',
  },
  {
    step: 3,
    titleKey: 'processSteps.step3.title',
    descriptionKey: 'processSteps.step3.description',
  },
  {
    step: 4,
    titleKey: 'processSteps.step4.title',
    descriptionKey: 'processSteps.step4.description',
  },
  {
    step: 5,
    titleKey: 'processSteps.step5.title',
    descriptionKey: 'processSteps.step5.description',
  },
];

export function TeamBuilding() {
  const t = useTranslations('GetInvolved.teamBuilding');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.panel');
    if (!scrollContainerRef.current) return;
    
    let scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollContainerRef.current!.offsetWidth * (sections.length -1),
      },
    });

    return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }, []);

  return (
    <div className="bg-background overflow-x-hidden">
      <section className="bg-secondary py-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary font-headline">
              {t('strengthenTeams')}
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              {t('discoverUnique')}
            </p>
            <div className="mt-8 flex gap-4">
              <Button>{t('requestQuote')}</Button>
              <Button variant="outline">{t('contactUs')}</Button>
            </div>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/impact/team.jpeg"
              alt="Team in a team-building training session"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div ref={scrollContainerRef} className="h-screen w-full relative overflow-hidden">
        <div className="w-[500vw] h-full flex items-center">
            {packages.map((pkg, i) => (
              <div key={i} className="panel w-screen h-full flex items-center justify-center p-8">
                <Card className="w-full max-w-sm bg-card shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">{t(pkg.nameKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-500 mb-4 h-20">
                        {t(pkg.descriptionKey)}
                        </p>
                         <div className="text-sm space-y-1 text-muted-foreground">
                            <p><span className="font-semibold text-primary">{t('duration')}:</span> {t(pkg.durationKey)}</p>
                            <p><span className="font-semibold text-primary">{t('participants')}:</span> {pkg.participants}</p>
                         </div>
                        <div className="mt-4 text-sm font-semibold text-primary">
                        {t('benefits')}
                        </div>
                        <ul className="mt-2 text-sm text-slate-600 space-y-2">
                        <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-green-500" />
                            <span>{t('benefit1')}</span>
                        </li>
                        <li className="flex items-start">
                            <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-green-500" />
                            <span>{t('benefit2')}</span>
                        </li>
                        </ul>
                        <div className="mt-4 text-xs font-semibold text-muted-foreground">
                        {t('logistics')}
                        </div>
                        <p className="mt-1 text-xs text-slate-600">
                        {t('logisticsDetails')}
                        </p>
                    </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
      

      <section className="bg-secondary py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline text-primary">
            {t('collaborationProcess')}
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div
              className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"
              aria-hidden="true"
            ></div>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative pl-12 pb-12"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute left-4 top-1 h-8 w-8 -translate-x-1/2 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>{t(step.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{t(step.descriptionKey)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">{t('readyToTransform')}</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              {t('contactUsToDiscuss')}
            </p>
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+216 27 068 084</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@wallahwecan.org</span>
              </div>
            </div>
          </div>

          <Card className="mt-12 max-w-4xl mx-auto shadow-2xl border">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{t('requestPersonalizedQuote')}</CardTitle>
              <p className="text-slate-500">
                {t('tellUsYourNeeds')}
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <h3 className="font-semibold text-lg border-b pb-2">{t('companyInformation')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t('companyName')} />
                  <Input placeholder={t('contactPerson')} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="email" placeholder={t('workEmail')} />
                  <Input type="tel" placeholder={t('phone')} />
                </div>

                <h3 className="font-semibold text-lg border-b pb-2 mt-8">{t('projectDetails')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="number" placeholder={t('teamSize')} />
                  <Input placeholder={t('preferredDates')} />
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('servicesOfInterest')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solidarity">{t('service.solidarity')}</SelectItem>
                      <SelectItem value="environmental">{t('service.environmental')}</SelectItem>
                      <SelectItem value="creative">{t('service.creative')}</SelectItem>
                      <SelectItem value="leadership">{t('service.leadership')}</SelectItem>
                      <SelectItem value="hackathons">{t('service.hackathons')}</SelectItem>
                      <SelectItem value="humanitarian">{t('service.humanitarian')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={t('estimatedBudget')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5k">{t('budget.1-5k')}</SelectItem>
                      <SelectItem value="5-10k">{t('budget.5-10k')}</SelectItem>
                      <SelectItem value="10-20k">{t('budget.10-20k')}</SelectItem>
                      <SelectItem value="20k+">{t('budget.20k+')}</SelectItem>
                      <SelectItem value="custom">{t('budget.custom')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea placeholder={t('yourMessage')} />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm">
                    {t('newsletterOptIn')}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms" className="text-sm">
                    {t('acceptTerms')}
                  </label>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {t('sendMyRequest')}
                </Button>
                <p className="text-xs text-center text-slate-500">
                  {t('responsePromise')}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

    