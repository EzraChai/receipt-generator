"use client";

import { forwardRef } from "react";
import type { Receipt } from "@/lib/invoice-types";
import {
  calculateSubtotal,
  calculateTotal,
  formatCurrency,
} from "@/lib/invoice-types";
import Image from "next/image";

interface ReceiptPreviewProps {
  receipt: Receipt;
}

export const ReceiptPreview = forwardRef<HTMLDivElement, ReceiptPreviewProps>(
  ({ receipt }, ref) => {
    const subtotal = calculateSubtotal(receipt.items);
    const total = calculateTotal(subtotal);

    return (
      <div
        ref={ref}
        className="bg-white text-[#1a1a2e] p-10 min-h-264 w-204 mx-auto"
        style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: 16 }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#1a1a2e] flex items-center justify-center">
              <Image src="/logo.jpg" alt="Logo" width={56} height={56} />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl print:text-xl font-semibold tracking-tight">
                波德申基督教长老会（芦骨） <br />
                社会关怀中心
              </h1>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl print:text-3xl font-bold tracking-tight text-green-600">
              RECEIPT
            </h2>
            <p className="text-xs print:text-xs uppercase tracking-widest text-green-600 font-semibold mt-1">
              PAID
            </p>
          </div>
        </div>

        {/* Center & Student Info */}
        <div className="grid grid-cols-2 gap-12 mb-10">
          <div>
            <h3 className="text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
              From
            </h3>
            <div className="text-sm space-y-1.5 print:text-sm">
              <p className="font-semibold text-[15px] print:text-[16px]">
                芦骨播伸堂社会关怀中心
              </p>
              <p className="text-gray-600 print:text-sm">
                48-1, Jln PPLU 3, Pusat Perniagaan Lukut Utama <br /> 71010 Port
                Dickson
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
              Received From
            </h3>
            <div className="text-sm space-y-1.5 print:text-sm">
              <p className="font-semibold text-[15px] print:text-[16px]">
                {receipt.student.name || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-10">
          <thead>
            <tr className="border-b-2 border-[#1a1a2e]">
              <th className="text-left py-3 text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.15em]">
                Subject
              </th>
              <th className="text-left py-3 text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.15em]">
                Description
              </th>
              <th className="text-right py-3 text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.15em]">
                Rate Per Month (RM)
              </th>
              <th className="text-right py-3 text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.15em]">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 font-medium print:text-sm">
                  {item.subject || "—"}
                </td>
                <td className="py-4 text-sm text-gray-500 print:text-sm">
                  {item.description || "—"}
                </td>
                <td className="py-4 text-right font-mono text-sm print:text-sm">
                  {formatCurrency(item.ratePerMonth)}
                </td>
                <td className="py-4 text-right font-mono text-sm print:text-sm">
                  {formatCurrency(item.ratePerMonth)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-10">
          <div className="w-72">
            <div className="flex justify-between py-2.5 text-sm print:text-sm">
              <span className="text-gray-500 uppercase tracking-wider text-xs print:text-xs">
                Subtotal
              </span>
              <span className="font-mono">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold bg-green-600 text-white px-4 -mx-4 mt-3 print:text-lg">
              <span className="uppercase tracking-wider text-sm print:text-sm">
                Amount Paid
              </span>
              <span className="font-mono">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {receipt.notes && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-[10px] print:text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
              Notes
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed print:text-sm">
              {receipt.notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-12 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest print:text-xs">
            Thank you
          </p>
        </div>
      </div>
    );
  },
);

ReceiptPreview.displayName = "ReceiptPreview";
