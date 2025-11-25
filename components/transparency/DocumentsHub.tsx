
'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DocumentCategory,
  transparencyDocuments,
} from '@/lib/transparency-documents';
import { Link } from '@/navigation';
import { FolderKanban, FileText, ExternalLink, Mail, KeyRound, Loader2, ShieldCheck, Eye, LogIn } from 'lucide-react';
import { AnimatedSection } from '../animated-section';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { requestDocumentAccess } from '@/ai/flows/request-document-access';
import { verifyDocumentAccess } from '@/ai/flows/verify-document-access';

const ICONS: Record<DocumentCategory['id'], React.ElementType> = {
  legal: FolderKanban,
  reports: FileText,
  partnerships: FolderKanban,
};

const requestAccessSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});
type RequestAccessForm = z.infer<typeof requestAccessSchema>;

const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});
type LoginForm = z.infer<typeof loginSchema>;


const DocumentCard = ({ docId, url }: { docId: string; url: string }) => {
  const tDocs = useTranslations('Transparency.documents');
  const tButtons = useTranslations('Transparency.buttons');
  const tAria = useTranslations('Transparency.aria');
  const documentName = tDocs(docId);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.03 }}
      className="relative group rounded-2xl overflow-hidden p-px"
      style={{
        background: 'linear-gradient(120deg, #FC841320, #fbc46d20)',
      }}
    >
       <div 
        className="absolute inset-0 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-lg transition-all duration-300"
      >
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          style={{
             background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3)) padding-box, linear-gradient(120deg, #FC8413, #fbc46d) border-box',
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative bg-white/60 dark:bg-black/60 backdrop-blur-xl p-6 h-full flex flex-col justify-between shadow-lg transition-all duration-300 rounded-[15px]">
        <div>
          <div className="p-3 bg-white/70 backdrop-blur-sm rounded-lg w-fit mb-4 border border-white/30 shadow-sm">
            <FileText className="w-6 h-6 text-brand-orange" />
          </div>
          <h3 className="text-md font-poppins font-semibold text-brand-navy">
            {documentName}
          </h3>
        </div>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tAria('viewDocument', { documentName })}
          className="relative z-10 mt-6 self-start inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-orange to-[#fbc46d] rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 transform-gpu"
        >
          {tButtons('open')}
          <ExternalLink className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};


export function DocumentsHub() {
  const t = useTranslations('Transparency');
  const [openItems, setOpenItems] = useState(['legal', 'reports']);
  const [view, setView] = useState<'request' | 'login' | 'granted' | 'pending' | 'checking'>('checking');
  const [emailForRequest, setEmailForRequest] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const hasAccess = localStorage.getItem('wwc-doc-access-granted');
    if (hasAccess === 'true') {
      setView('granted');
    } else {
      setView('request');
    }
  }, []);

  const requestForm = useForm<RequestAccessForm>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: { email: '' },
  });

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleRequestAccess = async (data: RequestAccessForm) => {
    try {
      const result = await requestDocumentAccess(data);
      if (result.status === 'success') {
        setEmailForRequest(data.email);
        setView('pending');
      } else {
        toast({
          variant: 'destructive',
          title: "Request Failed",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };
  
  const handleLogin = async (data: LoginForm) => {
    try {
        const result = await verifyDocumentAccess(data);
        if (result.status === 'success') {
            localStorage.setItem('wwc-doc-access-granted', 'true');
            setView('granted');
            toast({
                title: "Access Granted",
                description: "You can now view the documents.",
            });
        } else {
            toast({
                variant: 'destructive',
                title: "Login Failed",
                description: result.message,
            });
        }
    } catch (error) {
        toast({
            variant: 'destructive',
            title: "Error",
            description: "An unexpected error occurred during login.",
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const renderContent = () => {
    switch (view) {
      case 'checking':
        return <Loader2 className="h-12 w-12 animate-spin text-brand-navy mx-auto" />;
      case 'granted':
        return (
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="space-y-8"
          >
            {transparencyDocuments.map((category) => {
              const Icon = ICONS[category.id];
              const isOpen = openItems.includes(category.id);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <AccordionItem
                    value={category.id}
                    className="bg-white/60 backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-lg p-2"
                  >
                    <AccordionTrigger className="text-xl md:text-2xl font-poppins font-bold text-brand-navy hover:no-underline p-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: isOpen ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-6 h-6 text-brand-orange" />
                        </motion.div>
                        <span>{t(`sections.${category.id}`)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-2">
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {category.documents.map((doc) => (
                          <DocumentCard
                            key={doc.id}
                            docId={doc.id}
                            url={doc.url}
                          />
                        ))}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        );
      case 'pending':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200/80 max-w-2xl mx-auto">
            <ShieldCheck className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold font-poppins text-brand-navy">Request Submitted</h3>
            <p className="text-brand-navy/80 mt-2">Thank you, <span className="font-semibold">{emailForRequest}</span>. Your request for access has been received.</p>
            <p className="text-brand-navy/80 mt-1">Our team will review it, and you will receive an email with your access password upon approval.</p>
          </motion.div>
        );
      case 'request':
      case 'login':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200/80 max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
              {view === 'request' ? (
                  <motion.div key="request" exit={{ opacity: 0, x: -30 }}>
                    <div className="text-center">
                        <Eye className="w-12 h-12 text-brand-orange mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold font-poppins text-brand-navy">Request Access</h3>
                        <p className="text-brand-navy/80 mt-2 mb-6">To view our transparency documents, please request access by providing your email.</p>
                    </div>
                    <Form {...requestForm}>
                        <form onSubmit={requestForm.handleSubmit(handleRequestAccess)} className="space-y-4">
                            <FormField
                                control={requestForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                                                <Input placeholder="your.email@example.com" {...field} className="pl-10 rtl:pr-10 rtl:pl-3"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={requestForm.formState.isSubmitting}>
                                {requestForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Request Access
                            </Button>
                        </form>
                    </Form>
                     <p className="text-center text-sm text-brand-navy/70 mt-6">
                        Already have access?{' '}
                        <button onClick={() => setView('login')} className="font-semibold text-brand-orange hover:underline">
                            Login here
                        </button>
                    </p>
                  </motion.div>
              ) : (
                <motion.div key="login" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="text-center">
                        <LogIn className="w-12 h-12 text-brand-orange mx-auto mb-4"/>
                        <h3 className="text-2xl font-bold font-poppins text-brand-navy">Login</h3>
                        <p className="text-brand-navy/80 mt-2 mb-6">Enter your email and the password you received to view the documents.</p>
                    </div>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                                                <Input placeholder="your.email@example.com" {...field} className="pl-10 rtl:pr-10 rtl:pl-3"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 rtl:right-3 rtl:left-auto" />
                                                <Input type="password" placeholder="Password" {...field} className="pl-10 rtl:pr-10 rtl:pl-3"/>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                                {loginForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </Form>
                    <p className="text-center text-sm text-brand-navy/70 mt-6">
                        Don't have access?{' '}
                        <button onClick={() => setView('request')} className="font-semibold text-brand-orange hover:underline">
                            Request access
                        </button>
                    </p>
                </motion.div>
              )}
              </AnimatePresence>
          </motion.div>
        );
    }
  };


  return (
    <AnimatedSection as="div" className="py-24 md:py-32 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-extrabold text-brand-navy">
            {t('hub.title')}
          </h2>
          <p className="mt-4 text-lg text-brand-navy/80 max-w-2xl mx-auto">
            {t('hub.subtitle')}
          </p>
           <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-brand-orange to-[#fbc46d]" />
        </motion.div>
        
        {renderContent()}

      </div>
    </AnimatedSection>
  );
}
