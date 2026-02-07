"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { ProfileFormValues } from "../../lib/profile.validation";
import { errorToast } from "@/features/shared/errors/toast.error";
import { UploadDropzone } from "@/lib/uploadthing";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";

export function AvatarField() {
  const form = useFormContext<ProfileFormValues>();

  const [isOpenUploader, setIsOpenUploader] = useState(false);

  return (
    <FormField
      control={form.control}
      name="avatarUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Avatar</FormLabel>

          <FormControl>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="relative h-40 w-40 overflow-hidden rounded-full bg-muted">
                {field.value && (
                  <Image
                    src={field.value}
                    alt="Avatar"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpenUploader(true)}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Change avatar
              </Button>

              <DialogWrapper
                isOpen={isOpenUploader}
                title="Upload Image"
                onOpenChange={setIsOpenUploader}
                className="w-[50%] h-[50%] p-9"
              >
                <UploadDropzone
                  className="w-full h-full"
                  endpoint="avatarImage"
                  config={{
                    mode: "auto",
                  }}
                  onClientUploadComplete={(res) => {
                    const file = res?.[0];
                    if (!file) return;

                    field.onChange(file.ufsUrl);
                    setIsOpenUploader(false);
                    toast.success("Chnage avatar successfully", {
                      id: "upload-avatar",
                    });
                  }}
                  onUploadError={(error) => {
                    errorToast(error, "upload-avatar");
                  }}
                  onUploadBegin={() => {
                    toast.loading("Uploading...", { id: "upload-avatar" });
                  }}
                />
              </DialogWrapper>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
