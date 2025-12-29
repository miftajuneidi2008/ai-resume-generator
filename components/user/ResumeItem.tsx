"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import ResumePreview from "./ResumePreview";
import { mapToResumeValues } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";
import { useReactToPrint } from "react-to-print";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVertical, Printer, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteResume } from "@/data/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingButton from "./form/LoaadingButton";

interface ResumeItemProps {
  resume: ResumeServerData;
}
const ResumeItem = ({ resume }: ResumeItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const wasUpadate = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group bg-secondary hover:border-border relative rounded-lg border border-transparent p-3 transition-colors">
      <div className="space-y-3">
        <Link
          href={`create-resume?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No Title"}
          </p>
          {resume.description && (
            <p className="line-clamp-1 text-sm">
              {resume.description || "des"}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            {wasUpadate ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`create-resume?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            contentRef={contentRef}
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
};

export default ResumeItem;

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0.5 right-0.5 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationDialog
        resumeId={resumeId}
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmationDialogProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast.success("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
