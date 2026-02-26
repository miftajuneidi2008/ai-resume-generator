"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Upload, CheckCircle2, 
  Loader2, Lightbulb, TrendingUp, RotateCcw, Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeUploadInput, resumeUploadSchema } from "@/lib/ValidationSchema";
import { reviewResumeAction } from "@/services/action";

interface ReviewData {
  score: number;
  strengths: string[];
  "corrections/improvements": string[];
}

const ReviewResume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [result, setResult] = useState<ReviewData | null>(null);

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
    reset,
  } = useForm<ResumeUploadInput>({
    resolver: zodResolver(resumeUploadSchema),
    mode: "onChange",
  });

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setValue("resume", file, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      await trigger("resume");
      setUploadedFile(file);
      setResult(null); // Clear previous results on new file
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    handleFileChange(files[0]);
  }
}

  const onSubmit = async (data: ResumeUploadInput) => {
    setIsReviewing(true);
    try {
      const response = await reviewResumeAction(data);
      if (response.success && response.data) {
        // Ensure the data is parsed correctly
        const parsedData = JSON.parse(response.data) 
        setResult(parsedData);
      }
    } catch (error) {
      console.error("Error reviewing resume:", error);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setResult(null);
    reset();
  };

  const hasError = !!errors.resume?.message;

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="mb-8 text-center">
        <h2 className="text-foreground mb-2 text-3xl font-extrabold tracking-tight">
          AI Resume Analyzer
        </h2>
        <p className="text-muted-foreground text-lg">
          Get instant professional feedback and ATS optimization tips.
        </p>
      </div>

      {!result ? (
        <div className="mx-auto max-w-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0]); }}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed p-12 transition-all duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : hasError
                  ? "border-destructive bg-destructive/5"
                  : uploadedFile
                  ? "border-green-500 bg-green-50 dark:bg-green-950/10"
                  : "border-muted-foreground/25 hover:border-primary/50 bg-muted/30"
              }`}
            >
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleInputChange} className="hidden" />

              <div className="flex flex-col items-center justify-center space-y-4">
                {uploadedFile && !hasError ? (
                  <>
                    <div className="bg-green-500/10 rounded-full p-4">
                      <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-foreground text-lg font-bold">{uploadedFile.name}</p>
                      <p className="text-muted-foreground text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-primary/10 rounded-full p-4 text-primary">
                      <Upload className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                      <p className="text-foreground text-lg font-bold">Drop your resume here</p>
                      <p className="text-muted-foreground mt-1">PDF format (Max 3MB)</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isValid || isReviewing}
              className="mt-6 h-12 w-full text-lg font-semibold shadow-lg transition-all active:scale-[0.98]"
            >
              {isReviewing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                "Analyze My Resume"
              )}
            </Button>
          </form>

          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                <Target className="h-5 w-5 text-blue-500" />
                <span>ATS Optimization</span>
             </div>
             <div className="flex items-center gap-3 rounded-lg border p-3 text-sm">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Score Improvement</span>
             </div>
          </div>
        </div>
      ) : (
        /* RESULTS UI */
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-8 shadow-sm">
              <span className="text-muted-foreground mb-2 text-sm font-medium uppercase tracking-wider">Overall Score</span>
              <div className="relative flex items-center justify-center">
                 <svg className="h-32 w-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                    <circle 
                      cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                      strokeDasharray={364.4} 
                      strokeDashoffset={364.4 - (364.4 * result.score) / 100} 
                      className={`${result.score > 70 ? 'text-green-500' : 'text-amber-500'} transition-all duration-1000 ease-out`}
                    />
                 </svg>
                 <span className="absolute text-3xl font-black">{result.score}%</span>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Your resume is better than {result.score}% of applicants in this field.
              </p>
            </div>

            {/* Strengths Card */}
            <div className="md:col-span-2 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="font-bold">Key Strengths</h3>
              </div>
              <ul className="space-y-3">
                {result.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                    {str}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Improvements Section */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 dark:border-amber-900/30 dark:bg-amber-950/10">
            <div className="mb-4 flex items-center gap-2 text-amber-600">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-bold">Recommended Improvements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {result["corrections/improvements"].map((imp, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white/50 p-3 text-sm shadow-sm dark:bg-black/20">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                  {imp}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Check Another Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewResume;