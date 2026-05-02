"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import {
  validateFileType,
  processImages,
  type CompressedImage,
} from "@/lib/image-compression";
import {
  Download,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessingStage = "idle" | "uploading" | "compressing" | "completed" | "error";

export default function ImageToolContent() {
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>(
    []
  );
  const [zipFile, setZipFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(60);
  const [fileList, setFileList] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [stage, setStage] = useState<ProcessingStage>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageUpload = useCallback((files: FileList | File[]) => {
    const filesArray = Array.from(files);
    const validFiles = filesArray.filter(validateFileType);

    if (validFiles.length === 0) {
      setErrorMessage("Please upload only JPEG, PNG, or WebP images.");
      setStage("error");
      setTimeout(() => setStage("idle"), 5000);
      return;
    }

    setErrorMessage("");
    setStage("uploading");
    setUploadProgress(0);
    setCompressedImages([]);
    setProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(uploadInterval);
          return 90;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    // After upload simulation, move to compression
    setTimeout(() => {
      clearInterval(uploadInterval);
      setUploadProgress(100);
      setFileList(validFiles);
      setStage("compressing");
    }, 800);
  }, []);

  useEffect(() => {
    const processFilesAsync = async () => {
      if (fileList.length === 0 || stage !== "compressing") return;

      setLoading(true);
      try {
        const { compressedImages: newCompressedImages, zipFile: newZipFile } =
          await processImages(fileList, quality, (compressionProgress) => {
            setProgress(compressionProgress);
          });

        setCompressedImages(newCompressedImages);
        setZipFile(newZipFile);
        setStage("completed");
        setProgress(100);
      } catch (error) {
        console.error("Error processing images:", error);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Error processing images. Please try again."
        );
        setStage("error");
      } finally {
        setLoading(false);
      }
    };

    processFilesAsync();
  }, [fileList, quality, stage]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageUpload(e.target.files);
    }
  };

  const downloadImage = (image: CompressedImage) => {
    const link = document.createElement("a");
    link.href = image.content;
    link.download = image.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadZip = () => {
    if (!zipFile) return;

    const url = URL.createObjectURL(zipFile);
    const link = document.createElement("a");
    link.href = url;
    link.download = "compressed-images.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const resetCompression = () => {
    setFileList([]);
    setCompressedImages([]);
    setZipFile(null);
    setProgress(0);
    setUploadProgress(0);
    setQuality(60);
    setStage("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-vln bg-vln-sage/10 p-3">
              <ImageIcon className="h-8 w-8 text-vln-sage" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-vln-white">
            Image Compressor
          </h1>
          <p className="mx-auto max-w-2xl text-vln-gray">
            Compress your images while maintaining quality. Support for JPEG,
            PNG, and WebP formats.
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Upload Section */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "rounded-vln border-2 border-dashed transition-all",
              dragActive
                ? "border-vln-sage bg-vln-sage/10"
                : "border-vln-bluegray/30 bg-vln-bg-light hover:border-vln-sage/50"
            )}
          >
            <div className="px-8 py-12 text-center">
              <Upload className="mx-auto mb-4 h-8 w-8 text-vln-sage" />
              <h2 className="mb-2 text-xl font-semibold">
                Drop images here or click to upload
              </h2>
              <p className="mb-6 text-vln-gray">
                Supports JPEG, PNG, and WebP formats
              </p>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileInputChange}
                className="hidden"
                id="file-input"
              />
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                Select Images
              </Button>
            </div>
          </div>

          {/* Quality Slider */}
          {fileList.length > 0 && (
            <div className="rounded-vln border border-vln-bluegray/20 bg-vln-bg-light p-6">
              <label className="mb-4 block">
                <span className="mb-3 block font-semibold text-vln-white">
                  Compression Quality: {quality}%
                </span>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                  disabled={loading}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-vln-bluegray/20"
                  style={{
                    background: `linear-gradient(to right, rgb(166, 195, 167) 0%, rgb(166, 195, 167) ${quality}%, rgb(107, 114, 128) ${quality}%, rgb(107, 114, 128) 100%)`,
                  }}
                />
              </label>
              <p className="text-sm text-vln-gray">
                Higher quality = larger file size. Lower quality = smaller file
                size but less detail.
              </p>
            </div>
          )}

          {/* Status Bar - Upload & Compression Progress */}
          {stage === "uploading" && (
            <div className="rounded-vln border border-vln-bluegray/20 bg-vln-bg-light p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-vln-bluegray/30 border-t-vln-bluegray" />
                <h3 className="font-semibold text-vln-white">Uploading files...</h3>
              </div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-vln-bluegray/20">
                <div
                  className="h-full bg-gradient-to-r from-vln-bluegray to-vln-sage transition-all duration-300"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                />
              </div>
              <p className="text-right text-sm text-vln-gray">
                {Math.round(uploadProgress)}%
              </p>
            </div>
          )}

          {/* Status Bar - Compression Progress */}
          {stage === "compressing" && (
            <div className="rounded-vln border border-vln-sage/20 bg-vln-bg-light p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-vln-sage/30 border-t-vln-sage" />
                <h3 className="font-semibold text-vln-white">
                  Compressing {fileList.length} image
                  {fileList.length !== 1 ? "s" : ""}...
                </h3>
              </div>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-vln-sage/20">
                <div
                  className="h-full bg-gradient-to-r from-vln-sage to-vln-amber transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-right text-sm text-vln-gray">{progress}% complete</p>
            </div>
          )}

          {/* Status Bar - Completed */}
          {stage === "completed" && (
            <div className="rounded-vln border border-vln-sage/20 bg-vln-sage/10 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-vln-sage" />
                <div className="flex-1">
                  <h3 className="font-semibold text-vln-sage">
                    Compression complete!
                  </h3>
                  <p className="text-sm text-vln-gray">
                    {compressedImages.length} image
                    {compressedImages.length !== 1 ? "s" : ""} ready for download
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Bar - Error */}
          {stage === "error" && (
            <div className="rounded-vln border border-red-500/30 bg-red-500/10 p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-500">Error</h3>
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {compressedImages.length > 0 && !loading && (
            <div className="space-y-6">
              {/* Download All Button */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={downloadZip}
                  disabled={!zipFile}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download All as ZIP
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={resetCompression}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Compress More
                </Button>
              </div>

              {/* Compressed Images Grid */}
              <div className="rounded-vln border border-vln-bluegray/20 bg-vln-bg-light p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  {compressedImages.length} Image
                  {compressedImages.length !== 1 ? "s" : ""} Compressed
                </h3>
                <div className="space-y-3">
                  {compressedImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-vln-bluegray/10 bg-vln-bg p-4 transition-all hover:border-vln-sage/30"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-vln-white">
                          {image.fileName}
                        </p>
                        <div className="mt-2 flex gap-4 text-sm text-vln-gray">
                          <span>
                            Original:{" "}
                            {(image.originalImageSize / 1024).toFixed(2)} KB
                          </span>
                          <span>
                            Compressed:{" "}
                            {(image.compressedImageSize / 1024).toFixed(2)} KB
                          </span>
                          <span
                            className={cn(
                              "font-semibold",
                              parseFloat(image.compressionPercentage) < 0
                                ? "text-vln-sage"
                                : "text-vln-amber"
                            )}
                          >
                            {parseFloat(image.compressionPercentage) < 0
                              ? "↓"
                              : "↑"}
                            {Math.abs(
                              parseFloat(image.compressionPercentage)
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => downloadImage(image)}
                        className="ml-4 flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {fileList.length === 0 && compressedImages.length === 0 && (
            <div className="rounded-vln border border-vln-bluegray/20 bg-vln-bg-light p-8 text-center">
              <p className="text-vln-gray">
                Upload images to get started with compression.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
