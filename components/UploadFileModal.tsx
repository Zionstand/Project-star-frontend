"use client";
import React, { useRef, useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  IconCheck,
  IconFile,
  IconFileDescription,
  IconPlayerPauseFilled,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Loader } from "./Loader";

export interface FileWithMeta {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "completed" | "paused";
  progress: number;
  paused: boolean;
  isImage: boolean;
  preview?: string;
}

interface UploadFileModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onImport?: (file: FileWithMeta) => void;
}

export const UploadFileModal = ({
  isOpen = true,
  onClose,
  onImport,
}: UploadFileModalProps) => {
  const [file, setFile] = useState<FileWithMeta | null>(null);
  const [pending, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadInterval, setUploadInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const getFileType = (file: File): string => {
    const extension = file.name.split(".").pop()?.toUpperCase() || "FILE";
    return extension;
  };

  const isImageFile = (file: File): boolean => {
    return ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
      file.type
    );
  };

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (selectedFile: File) => {
    // Clear any existing upload
    if (uploadInterval) {
      clearInterval(uploadInterval);
    }

    const isImg = isImageFile(selectedFile);
    const preview = isImg ? await createPreview(selectedFile) : undefined;

    const fileWithMeta: FileWithMeta = {
      id: Math.random().toString(36).substr(2, 9),
      file: selectedFile,
      name: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(0) + "KB",
      type: getFileType(selectedFile),
      status: "uploading",
      progress: 0,
      paused: false,
      isImage: isImg,
      preview,
    };

    setFile(fileWithMeta);
    simulateUpload(fileWithMeta.id);
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFile((prev) =>
          prev && prev.id === fileId
            ? { ...prev, status: "completed", progress: 100 }
            : prev
        );
        setUploadInterval(null);
      } else {
        setFile((prev) => {
          if (prev && prev.id === fileId && !prev.paused) {
            return { ...prev, progress: Math.min(progress, 100) };
          }
          return prev;
        });
      }
    }, 300);

    setUploadInterval(interval);
  };

  const togglePause = () => {
    if (!file) return;

    setFile((prev) => {
      if (!prev) return prev;

      if (prev.paused) {
        simulateUpload(prev.id);
      } else {
        if (uploadInterval) {
          clearInterval(uploadInterval);
          setUploadInterval(null);
        }
      }
      return { ...prev, paused: !prev.paused };
    });
  };

  const removeFile = () => {
    if (uploadInterval) {
      clearInterval(uploadInterval);
      setUploadInterval(null);
    }
    setFile(null);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file || !onImport) return;
    startTransition(async () => {
      try {
        await onImport(file); // Wait for upload to finish
        if (onClose) onClose(); // ✅ Close only after success
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="flex flex-col gap-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5 space-y-4">
        <AlertDialogHeader className="flex flex-row items-center justify-between gap-1">
          <AlertDialogTitle>Upload File</AlertDialogTitle>
          <Button size="icon" variant={"ghost"} onClick={onClose}>
            <IconX />
          </Button>
        </AlertDialogHeader>
        <div className="overflow-y-auto whitespace-nowrap p-1">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <IconFile size={32} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Drop your file here, or{" "}
                  <button
                    onClick={handleBrowse}
                    className="text-primary hover:underline font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports: PDF, DOC, DOCX, TXT, PNG, JPG, JPEG, WEBP
                </p>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.csv,image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          {file && (
            <div className="mt-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                {/* File Icon or Image Preview */}
                <div className="size-10 rounded-lg overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
                  {file.isImage && file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconFileDescription size={24} className="text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <span className="text-xs text-muted-foreground ml-2 flex items-center gap-1">
                      <span className="text-primary font-semibold">
                        {file.type}
                      </span>
                      · {file.size}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <Progress value={file.progress} className={cn("h-1")} />
                  </div>
                  {file.progress < 100 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(file.progress)}%
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "completed" ? (
                    <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                      <IconCheck size={16} className="text-green-600" />
                    </div>
                  ) : (
                    <Button
                      size="icon"
                      variant={"ghost"}
                      onClick={togglePause}
                      className="hover:bg-gray-200"
                    >
                      {file.paused ? (
                        <IconPlayerPlay size={16} className="text-gray-600" />
                      ) : (
                        <IconPlayerPauseFilled
                          size={16}
                          className="text-gray-600"
                        />
                      )}
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant={"ghost"}
                    onClick={removeFile}
                    className="hover:bg-red-50"
                  >
                    <IconX size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <AlertDialogFooter className="border-t pt-4 sm:items-center">
          <AlertDialogCancel asChild>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || file.status !== "completed" || pending}
          >
            {pending ? <Loader text="Uploading..." /> : "Upload"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
