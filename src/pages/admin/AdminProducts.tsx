import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Livestock Vaccines", description: "High-quality vaccines for cattle, poultry, and farm animals.", category: "Livestock" },
  { id: 2, name: "Pet Supplements", description: "Nutritional supplements for optimal pet health.", category: "Pet" },
  { id: 3, name: "Surgical Instruments", description: "Professional-grade surgical tools for veterinarians.", category: "Vet Supplies" },
  { id: 4, name: "Animal Feed Additives", description: "Boost nutrition and growth in livestock.", category: "Livestock" },
  { id: 5, name: "Diagnostic Equipment", description: "Modern diagnostic tools for accurate results.", category: "Vet Supplies" },
  { id: 6, name: "Pet Grooming Supplies", description: "Everything needed for professional pet grooming.", category: "Pet" },
  { id: 7, name: "Livestock Dewormers", description: "Effective deworming solutions for all farm animals.", category: "Livestock" },
  { id: 8, name: "Veterinary Syringes", description: "Sterile, reliable syringes for all applications.", category: "Vet Supplies" },
  { id: 9, name: "Animal Antibiotics", description: "Trusted antibiotics for treating infections.", category: "Pet" },
];

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", description: "", category: "Livestock" });

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", description: "", category: "Livestock" });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, category: p.category });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)));
      toast({ title: "Product updated", description: "Action not available in demo mode" });
    } else {
      setProducts((prev) => [...prev, { id: Date.now(), ...form }]);
      toast({ title: "Product added", description: "Action not available in demo mode" });
    }
    setModalOpen(false);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Product deleted", description: "Action not available in demo mode" });
  };

  const categoryBadge: Record<string, string> = {
    Livestock: "bg-primary/10 text-primary",
    Pet: "bg-secondary/10 text-secondary",
    "Vet Supplies": "bg-purple-100 text-purple-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Button onClick={openAdd} className="gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <p className="text-xs text-muted-foreground mb-4">⚠️ This is UI only — no backend connection yet</p>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-semibold">Image</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Category</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-lg">🏥</div>
                  </td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryBadge[p.category] || ""}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Edit">
                        <Pencil size={15} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive" aria-label="Delete">
                            <Trash2 size={15} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{p.name}"?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteProduct(p.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Product Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Livestock">Livestock</SelectItem>
                <SelectItem value="Pet">Pet</SelectItem>
                <SelectItem value="Vet Supplies">Vet Supplies</SelectItem>
              </SelectContent>
            </Select>
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground text-sm">
              Image Upload (placeholder)
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
