
'use client';

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function InternshipForm() {
  const t = useTranslations("Internship.form");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  const formSchema = z.object({
    lastName: z.string().min(2, { message: t("validation.lastNameRequired") }),
    firstName: z.string().min(2, { message: t("validation.firstNameRequired") }),
    age: z.coerce.number().min(16, { message: t("validation.ageRequired") }),
    email: z.string().email({ message: t("validation.emailInvalid") }),
    phone: z.string().min(8, { message: t("validation.phoneInvalid") }),
    university: z.string().min(2, { message: t("validation.universityRequired") }),
    fieldOfStudy: z.string().min(2, { message: t("validation.fieldOfStudyRequired") }),
    studyYear: z.string({ required_error: t("validation.studyYearRequired") }),
    otherStudyYear: z.string().optional(),
    internshipType: z.string({ required_error: t("validation.internshipTypeRequired") }),
    otherInternshipType: z.string().optional(),
    startDate: z.date({ required_error: t("validation.startDateRequired") }),
    endDate: z.date({ required_error: t("validation.endDateRequired") }),
    duration: z.string({ required_error: t("validation.durationRequired") }),
    message: z.string().min(10, { message: t("validation.messageRequired") }),
    cv: z.any()
      .refine((file) => file instanceof File, t("validation.cvRequired"))
      .refine((file) => file?.size <= MAX_FILE_SIZE, t("validation.cvSize"))
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), t("validation.cvType")),
  }).refine(data => {
    if (data.studyYear === 'other') return !!data.otherStudyYear && data.otherStudyYear.length > 0;
    return true;
  }, {
    message: t("validation.otherStudyYearRequired"),
    path: ['otherStudyYear'],
  }).refine(data => {
    if (data.internshipType === 'other') return !!data.otherInternshipType && data.otherInternshipType.length > 0;
    return true;
  }, {
    message: t("validation.otherInternshipTypeRequired"),
    path: ['otherInternshipType'],
  }).refine(data => data.endDate > data.startDate, {
    message: t('validation.endDateAfterStart'),
    path: ['endDate'],
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      university: "",
      fieldOfStudy: "",
      otherStudyYear: "",
      otherInternshipType: "",
      message: "",
    },
  });

  const watchStudyYear = form.watch("studyYear");
  const watchInternshipType = form.watch("internshipType");

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    const formData = new FormData();
    
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'cv' && value instanceof File) {
        formData.append(key, value, value.name);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch('/api/internship', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t("toast.errorDescription"));
      }
      
      setIsSuccess(true);
      form.reset();

    } catch (error) {
      toast({
        variant: "destructive",
        title: t("toast.errorTitle"),
        description: (error as Error).message || t("toast.errorDescription"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isSuccess) {
    return (
      <div className="container py-24">
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800 max-w-2xl mx-auto">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="font-bold">{t("success.title")}</AlertTitle>
          <AlertDescription>{t("success.description")}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="py-24 md:py-32">
      <div className="container max-w-4xl mx-auto">
        
        <motion.div 
          className="mb-16 shadow-lg rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-video">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/jGhB2XzDzHE?si=uo3eq8eOT21LAdLw&start=109" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
            </iframe>
          </div>
        </motion.div>

        <Card className="bg-card rounded-2xl shadow-xl border">
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>{t("lastName")}</FormLabel><FormControl><Input placeholder={t("lastNamePlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>{t("firstName")}</FormLabel><FormControl><Input placeholder={t("firstNamePlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>{t("age")}</FormLabel><FormControl><Input type="number" placeholder="21" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>{t("email")}</FormLabel><FormControl><Input placeholder="example@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>{t("phone")}</FormLabel><FormControl><Input placeholder="+216 12 345 678" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FormField control={form.control} name="university" render={({ field }) => (
                        <FormItem><FormLabel>{t("university")}</FormLabel><FormControl><Input placeholder={t("universityPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (
                        <FormItem><FormLabel>{t("fieldOfStudy")}</FormLabel><FormControl><Input placeholder={t("fieldOfStudyPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                 </div>

                <FormField control={form.control} name="studyYear" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studyYear")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t("studyYearPlaceholder")} /></SelectTrigger></FormControl>
                      <SelectContent>
                        {['bachelor1', 'bachelor2', 'bachelor3', 'masterProfessional', 'masterResearch', 'doctorate', 'recentGraduate', 'other'].map(item => (
                            <SelectItem key={item} value={item}>{t(`studyYearOptions.${item}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {watchStudyYear === 'other' && (
                  <FormField control={form.control} name="otherStudyYear" render={({ field }) => (
                    <FormItem><FormLabel>{t("otherStudyYear")}</FormLabel><FormControl><Input placeholder={t("otherStudyYearPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                )}

                 <FormField control={form.control} name="internshipType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("internshipType")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t("internshipTypePlaceholder")} /></SelectTrigger></FormControl>
                      <SelectContent>
                        {['academic', 'professional', 'voluntary', 'endOfStudy', 'summer', 'other'].map(item => (
                            <SelectItem key={item} value={item}>{t(`internshipTypeOptions.${item}`)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {watchInternshipType === 'other' && (
                  <FormField control={form.control} name="otherInternshipType" render={({ field }) => (
                    <FormItem><FormLabel>{t("otherInternshipType")}</FormLabel><FormControl><Input placeholder={t("otherInternshipTypePlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
                    <FormField control={form.control} name="startDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>{t("startDate")}</FormLabel>
                            <Popover><PopoverTrigger asChild>
                                <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left rtl:text-right font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>{t("pickDate")}</span>}
                                    <CalendarIcon className="ml-auto rtl:mr-auto rtl:ml-0 h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                            </Popover>
                        <FormMessage />
                        </FormItem>
                    )} />
                     <FormField control={form.control} name="endDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>{t("endDate")}</FormLabel>
                            <Popover><PopoverTrigger asChild>
                                <FormControl>
                                <Button variant={"outline"} className={cn("pl-3 text-left rtl:text-right font-normal", !field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>{t("pickDate")}</span>}
                                    <CalendarIcon className="ml-auto rtl:mr-auto rtl:ml-0 h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                            </PopoverContent>
                            </Popover>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="duration" render={({ field }) => (
                        <FormItem><FormLabel>{t("duration")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder={t("durationPlaceholder")} /></SelectTrigger></FormControl>
                            <SelectContent>
                                {['1_month', '2_months', '3_months', '6_months', 'more'].map(item => (
                                    <SelectItem key={item} value={item}>{t(`durationOptions.${item}`)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )} />
                </div>
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>{t("message")}</FormLabel><FormControl><Textarea placeholder={t("messagePlaceholder")} className="min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="cv" render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>{t("cv")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        onChange={e => onChange(e.target.files ? e.target.files[0] : null)} 
                        accept=".pdf,.docx"
                        {...rest} 
                      />
                    </FormControl>
                    <FormDescription>{t("cvDescription")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )} />

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                    {isSubmitting ? t("submitButton.sending") : t("submitButton.default")}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
