
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

export function JoinUsForm() {
  const t = useTranslations("JoinUs.form");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FILE_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  const skills = [
    'communication', 'graphicDesign', 'cleanEnergy', 'agriculture', 
    'entrepreneurship', 'childrensRights', 'psychology', 'accountingFinance',
    'videoEditing', 'projectManagement', 'education', 'healthNutrition',
    'environmentSustainability', 'itDigitalTools', 'fundraising'
  ];

  const formSchema = z.object({
    lastName: z.string().min(2, { message: t("validation.lastNameRequired") }),
    firstName: z.string().min(2, { message: t("validation.firstNameRequired") }),
    age: z.coerce.number().min(16, { message: t("validation.ageRequired") }),
    email: z.string().email({ message: t("validation.emailInvalid") }),
    phone: z.string().min(10, { message: t("validation.phoneInvalid") }),
    status: z.string({ required_error: t("validation.statusRequired") }),
    otherStatus: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    skills: z.array(z.string()).optional(),
    otherSkill: z.string().optional(),
    message: z.string().min(10, { message: t("validation.messageRequired") }),
    cv: z.any()
      .refine((file) => file instanceof File, t("validation.cvRequired"))
      .refine((file) => file?.size <= MAX_FILE_SIZE, t("validation.cvSize"))
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), t("validation.cvType")),
    availability: z.string({ required_error: t("validation.availabilityRequired") }),
  }).refine(data => {
    if (data.status === 'other') {
      return !!data.otherStatus && data.otherStatus.length > 0;
    }
    return true;
  }, {
    message: t("validation.otherStatusRequired"),
    path: ['otherStatus'],
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      otherStatus: "",
      fieldOfStudy: "",
      skills: [],
      otherSkill: "",
      message: "",
    },
  });

  const watchStatus = form.watch("status");
  const watchSkills = form.watch("skills");

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    const formData = new FormData();
    
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'cv' && value instanceof File) {
        formData.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error(result.error || t("toast.errorDescription"));
      }
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
          <AlertDescription>
            {t("success.description")}
          </AlertDescription>
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
              src="https://www.youtube.com/embed/QyzKYzKvCWI?si=NCnCigf4XaW1-MHp&start=3" 
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
                    <FormItem><FormLabel>{t("age")}</FormLabel><FormControl><Input type="number" placeholder="25" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="sm:col-span-2"><FormLabel>{t("email")}</FormLabel><FormControl><Input placeholder="example@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>{t("phone")}</FormLabel><FormControl><Input placeholder="+216 12 345 678" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                
                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("status")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t("statusPlaceholder")} /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="student">{t("statusOptions.student")}</SelectItem>
                        <SelectItem value="professional">{t("statusOptions.professional")}</SelectItem>
                        <SelectItem value="volunteer">{t("statusOptions.volunteer")}</SelectItem>
                        <SelectItem value="entrepreneur">{t("statusOptions.entrepreneur")}</SelectItem>
                        <SelectItem value="researcher">{t("statusOptions.researcher")}</SelectItem>
                        <SelectItem value="ngo_member">{t("statusOptions.ngoMember")}</SelectItem>
                        <SelectItem value="retired">{t("statusOptions.retired")}</SelectItem>
                        <SelectItem value="other">{t("statusOptions.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                {watchStatus === 'other' && (
                  <FormField control={form.control} name="otherStatus" render={({ field }) => (
                    <FormItem><FormLabel>{t("otherStatus")}</FormLabel><FormControl><Input placeholder={t("otherStatusPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                )}

                <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (
                  <FormItem><FormLabel>{t("fieldOfStudy")}</FormLabel><FormControl><Input placeholder={t("fieldOfStudyPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField
                  control={form.control}
                  name="skills"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">{t("skills")}</FormLabel>
                        <FormDescription>{t("skillsDescription")}</FormDescription>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {skills.map((skill) => (
                          <FormField
                            key={skill}
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(skill)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), skill])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== skill
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{t(`skillsOptions.${skill}`)}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                         <FormItem className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0">
                           <FormControl><Checkbox checked={watchSkills?.includes('other')} onCheckedChange={(checked) => {
                              const currentSkills = form.getValues('skills') || [];
                              if (checked) {
                                form.setValue('skills', [...currentSkills, 'other']);
                              } else {
                                form.setValue('skills', currentSkills.filter(s => s !== 'other'));
                                form.setValue('otherSkill', '');
                              }
                           }} /></FormControl>
                           <FormLabel className="font-normal">{t("skillsOptions.other")}</FormLabel>
                         </FormItem>
                      </div>
                       {watchSkills?.includes('other') && (
                          <FormField control={form.control} name="otherSkill" render={({ field }) => (
                            <FormItem className="mt-4"><FormControl><Input placeholder={t("otherSkillPlaceholder")} {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField control={form.control} name="availability" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("availability")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder={t("availabilityPlaceholder")} /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="2h_week">{t("availabilityOptions.2h_week")}</SelectItem>
                        <SelectItem value="4h_week">{t("availabilityOptions.4h_week")}</SelectItem>
                        <SelectItem value="6h_week">{t("availabilityOptions.6h_week")}</SelectItem>
                        <SelectItem value="more_6h_week">{t("availabilityOptions.more_6h_week")}</SelectItem>
                        <SelectItem value="occasionally">{t("availabilityOptions.occasionally")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>{t("message")}</FormLabel><FormControl><Textarea placeholder={t("messagePlaceholder")} className="min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
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
