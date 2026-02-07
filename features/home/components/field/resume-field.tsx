"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Trash2, ExternalLink } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { ProfileFormValues } from "../../lib/profile.validation";
import { errorToast } from "@/features/shared/errors/toast.error";
import { UploadDropzone } from "@/lib/uploadthing";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";

export function ResumeField() {
  const form = useFormContext<ProfileFormValues>();
  const [isOpenUploader, setIsOpenUploader] = useState(false);

  return (
    <FormField
      control={form.control}
      name="resumeUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Resume (PDF)</FormLabel>

          <FormControl>
            <div className="space-y-3">
              {field.value ? (
                <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/40">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm truncate max-w-50">
                      Resume uploaded
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => field.onChange("")}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => setIsOpenUploader(true)}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpenUploader(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Button>
              )}

              <DialogWrapper
                isOpen={isOpenUploader}
                title="Upload Resume"
                onOpenChange={setIsOpenUploader}
                className="w-[50%] h-[50%] p-9"
              >
                <UploadDropzone
                  className="w-full h-full"
                  endpoint="resumeUploader"
                  config={{
                    mode: "auto",
                  }}
                  onClientUploadComplete={(res) => {
                    const file = res?.[0];
                    if (!file) return;

                    field.onChange(file.ufsUrl);
                    setIsOpenUploader(false);
                    toast.success("Chnage resume successfully", {
                      id: "upload-resume",
                    });
                  }}
                  onUploadError={(error) => {
                    errorToast(error, "upload-resume");
                  }}
                  onUploadBegin={() => {
                    toast.loading("Uploading...", { id: "upload-resume" });
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
