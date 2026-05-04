"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Receipt, ReceiptItem, Student } from "@/lib/invoice-types";

interface ReceiptFormProps {
  receipt: Receipt;
  onUpdate: (receipt: Receipt) => void;
}

export function ReceiptForm({ receipt, onUpdate }: ReceiptFormProps) {
  const updateStudent = (field: keyof Student, value: string) => {
    onUpdate({
      ...receipt,
      student: { ...receipt.student, [field]: value },
    });
  };

  const updateItem = (
    id: string,
    field: keyof ReceiptItem,
    value: string | number,
  ) => {
    onUpdate({
      ...receipt,
      items: receipt.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    });
  };

  const addItem = () => {
    const newItem: ReceiptItem = {
      id: crypto.randomUUID(),
      subject: "",
      ratePerMonth: 0,
      description: "",
    };
    onUpdate({
      ...receipt,
      items: [...receipt.items, newItem],
    });
  };

  const removeItem = (id: string) => {
    onUpdate({
      ...receipt,
      items: receipt.items.filter((item) => item.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Student Details */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground border-b border-border pb-2">
          Student
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
              Student Name
            </label>
            <Input
              value={receipt.student.name}
              onChange={(e) => updateStudent("name", e.target.value)}
              placeholder="John Doe"
              className="h-11 bg-card border-border"
            />
          </div>
        </div>
      </section>

      {/* Receipt Number */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground border-b border-border pb-2">
          Receipt Info
        </h3>
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
            Receipt No.
          </label>
          <Input
            value={receipt.receiptNumber}
            onChange={(e) =>
              onUpdate({ ...receipt, receiptNumber: e.target.value })
            }
            className="h-11 bg-card border-border font-mono max-w-xs"
          />
        </div>
      </section>

      {/* Tuition Items */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Tuition Items
          </h3>
          <Button
            onClick={addItem}
            size="sm"
            variant="outline"
            className="h-8 text-xs uppercase tracking-wider"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Subject
          </Button>
        </div>
        <div className="space-y-4">
          {receipt.items.map((item, index) => (
            <div
              key={item.id}
              className="border border-border bg-card p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent">
                  Subject {index + 1}
                </span>
                {receipt.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                    Subject
                  </label>
                  <Input
                    value={item.subject}
                    onChange={(e) =>
                      updateItem(item.id, "subject", e.target.value)
                    }
                    placeholder="Mathematics"
                    className="h-10 bg-background border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                    Rate/Month (RM)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.ratePerMonth}
                    onChange={(e) =>
                      updateItem(
                        item.id,
                        "ratePerMonth",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-10 bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                  Description
                </label>
                <Input
                  value={item.description || ""}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="e.g., Algebra & Geometry - Grade 10"
                  className="h-10 bg-background border-border"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Info */}
      <section className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground border-b border-border pb-2">
          Additional Info
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
              Notes
            </label>
            <Textarea
              value={receipt.notes || ""}
              onChange={(e) => onUpdate({ ...receipt, notes: e.target.value })}
              placeholder="Payment received with thanks."
              rows={3}
              className="bg-card border-border resize-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
