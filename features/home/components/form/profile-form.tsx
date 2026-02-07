"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  profileFormSchema,
  ProfileFormValues,
} from "../../lib/profile.validation";
import { updateProfile } from "../../server/update-profile";
import { errorToast } from "@/features/shared/errors/toast.error";
import { SocialLinksField } from "../field/social-link-field";
import { AvatarField } from "../field/avatar-field";
import { ResumeField } from "../field/resume-field";

interface ProfileFormProps {
  initialValues: ProfileFormValues;
  onClose?: () => void;
}

export function ProfileForm({
  initialValues: profile,
  onClose,
}: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: profile?.fullName ?? "",
      headline: profile?.headline ?? "",
      bio: profile?.bio ?? "",
      avatarUrl: profile?.avatarUrl ?? "",
      availability: profile?.availability ?? "",
      location: profile?.location ?? "",
      resumeUrl: profile?.resumeUrl ?? "",
      socials:
        profile?.socials.map((social) => ({
          url: social.url,
          label: social.label || "",
          order: social.order,
          isPrimary: social.isPrimary,
        })) ?? [],
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    startTransition(async () => {
      try {
        const res = await updateProfile(values);
        if (res?.success) {
          toast.success("Profile updated successfully");
          onClose?.();
        }
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="profile-form"
        className="flex flex-col h-full"
      >
        {/* Avatar Section */}
        <div className="mb-6">
          <AvatarField />
        </div>
        {/* Basic Info */}
        <div className="grid gap-6 md:grid-cols-2 space-y-6">
          <FormField
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Bio */}
        <FormField
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Separator />
        {/* Meta Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Separator />
        {/* Social Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Social links</h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                form.setValue("socials", [
                  ...form.getValues("socials"),
                  { url: "", label: "", isPrimary: false },
                ])
              }
            >
              <Plus className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
          <ResumeField />
          <SocialLinksField />
        </div>
        {/* FOOTER */}
        <div className="flex justify-between bg-background gap-2 py-4 sticky bottom-0 border-t">
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
