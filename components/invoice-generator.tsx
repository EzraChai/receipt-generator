"use client";

import { useState, useRef } from "react";
import { ReceiptForm } from "./receipt-form";
import { ReceiptPreview } from "./receipt-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, FileText, GraduationCap, Plus } from "lucide-react";
import type { Receipt } from "@/lib/invoice-types";
import { generateReceiptNumber } from "@/lib/invoice-types";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import Image from "next/image";

const getDefaultReceipt = (): Receipt => {
  return {
    receiptNumber: generateReceiptNumber(),
    student: {
      name: "",
    },
    items: [
      {
        id: crypto.randomUUID(),
        subject: "",
        ratePerMonth: 0,
        description: "",
      },
    ],
    notes: "",
  };
};

export function ReceiptGenerator() {
  const [receipt, setReceipt] = useState<Receipt>(getDefaultReceipt());
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      const imgWidth = 8.5;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${receipt.receiptNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleNewReceipt = () => {
    setReceipt(getDefaultReceipt());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={62}
                  height={62}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg  hidden lg:block font-semibold tracking-tight text-foreground">
                  Receipt Generator
                </h1>
                <p className="text-xs hidden lg:block uppercase tracking-widest text-muted-foreground">
                  波德申基督教长老会（芦骨） 社会关怀中心
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <>
                {/* Icon-only button for small screens (phone first) */}
                <Button
                  variant="outline"
                  onClick={handleNewReceipt}
                  className="h-10 w-10 px-0 text-sm font-medium lg:hidden"
                  aria-label="New Receipt"
                >
                  <Plus className="h-4 w-4" />
                </Button>

                {/* Full button for larger screens */}
                <Button
                  variant="outline"
                  onClick={handleNewReceipt}
                  className="h-10 px-4 text-sm font-medium hidden lg:inline-flex"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Receipt
                </Button>
              </>
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="h-10 px-5 text-sm font-medium bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Mobile Tabs */}
        <div className="lg:hidden">
          <Tabs defaultValue="form" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-secondary p-1">
              <TabsTrigger
                value="form"
                className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <FileText className="mr-2 h-4 w-4" />
                Edit Receipt
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="form" className="mt-0">
              <ReceiptForm receipt={receipt} onUpdate={setReceipt} />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <div className="border border-border bg-card overflow-auto shadow-sm">
                <ReceiptPreview ref={previewRef} receipt={receipt} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Split View */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <h2 className="text-sm uppercase tracking-widest font-semibold text-foreground">
                Receipt Details
              </h2>
            </div>
            <ReceiptForm receipt={receipt} onUpdate={setReceipt} />
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-2 sticky top-24">
              <span className="w-8 h-8 bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <h2 className="text-sm uppercase tracking-widest font-semibold text-foreground">
                Preview
              </h2>
            </div>
            <div className="border border-border bg-card overflow-auto sticky top-36 max-h-[calc(100vh-10rem)] shadow-sm">
              <ReceiptPreview ref={previewRef} receipt={receipt} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
