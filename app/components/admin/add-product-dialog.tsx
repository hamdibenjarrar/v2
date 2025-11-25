
'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  is_organic: z.boolean().default(false),
  image: z.any().refine((val) => val instanceof File || typeof val === 'string', {
    message: 'Image is required.',
  }),
});

type ProductFormData = z.infer<typeof productSchema>;

export function AddProductDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const supabase = createClient();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      is_organic: false,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      let imageUrl = '';
      if (typeof data.image === 'string') {
        imageUrl = data.image;
      } else if (data.image instanceof File) {
        const imageFile = data.image as File;
        const filePath = `public/${Date.now()}_${imageFile.name}`;
        
        const { error: uploadError } = await supabase.storage.from('products').upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
      
      const newProductData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        is_organic: data.is_organic,
        image_url: imageUrl,
      };

      const { error } = await supabase.from('products').insert([newProductData]);
      if (error) throw error;


      toast({
        title: 'Product Added!',
        description: `${data.name} has been added to the store.`,
      });
      form.reset();
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Product</DialogTitle>
          <DialogDescription>
            Fill out the details for the new product.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Artisan Honey" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product details..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price (DT)</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Coffrets" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) =>
                        onChange(e.target.files ? e.target.files[0] : null)
                      }
                      accept="image/*"
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex justify-end items-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
