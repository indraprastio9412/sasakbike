import { useEffect, useState, type ChangeEvent } from "react";
import { Plus, Trash2, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategoryId,
  type ProductVariant,
  type ProductSpec,
} from "@/data/products";
import { generateProductId } from "@/lib/product-store";

type VariantDraft = ProductVariant;
type SpecDraft = ProductSpec;

const DEFAULT_COLOR = "#22c55e";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca gambar"));
    reader.readAsDataURL(file);
  });
}

function emptyVariant(): VariantDraft {
  return {
    id: `v-${Math.random().toString(36).slice(2, 8)}`,
    label: "",
    color: DEFAULT_COLOR,
    image: "",
  };
}

function emptySpec(): SpecDraft {
  return { label: "", value: "" };
}

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialProduct: Product | null;
  onSave: (product: Product) => void;
};

const ProductFormDialog = ({
  open,
  onOpenChange,
  initialProduct,
  onSave,
}: ProductFormDialogProps) => {
  const isEdit = Boolean(initialProduct);

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [price, setPrice] = useState("");
  const [sizesText, setSizesText] = useState("");
  const [keywordsText, setKeywordsText] = useState("");
  const [categories, setCategories] = useState<ProductCategoryId[]>([]);
  const [variants, setVariants] = useState<VariantDraft[]>([emptyVariant()]);
  const [specs, setSpecs] = useState<SpecDraft[]>([emptySpec()]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (initialProduct) {
      setName(initialProduct.name);
      setTagline(initialProduct.tagline);
      setPrice(String(initialProduct.price));
      setSizesText(initialProduct.sizes.join(", "));
      setKeywordsText((initialProduct.searchKeywords ?? []).join(", "));
      setCategories(initialProduct.categories as ProductCategoryId[]);
      setVariants(
        initialProduct.variants.length > 0
          ? initialProduct.variants.map((v) => ({ ...v }))
          : [emptyVariant()],
      );
      setSpecs(
        initialProduct.specs.length > 0
          ? initialProduct.specs.map((s) => ({ ...s }))
          : [emptySpec()],
      );
    } else {
      setName("");
      setTagline("");
      setPrice("");
      setSizesText("");
      setKeywordsText("");
      setCategories([]);
      setVariants([emptyVariant()]);
      setSpecs([emptySpec()]);
    }
  }, [open, initialProduct]);

  const toggleCategory = (id: ProductCategoryId) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const updateVariant = (index: number, patch: Partial<VariantDraft>) => {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    );
  };

  const handleVariantImage = async (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      updateVariant(index, { image: dataUrl });
    } catch {
      toast.error("Gagal memuat gambar");
    }
  };

  const addVariant = () => setVariants((prev) => [...prev, emptyVariant()]);
  const removeVariant = (index: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== index));

  const updateSpec = (index: number, patch: Partial<SpecDraft>) => {
    setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };
  const addSpec = () => setSpecs((prev) => [...prev, emptySpec()]);
  const removeSpec = (index: number) =>
    setSpecs((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Nama produk wajib diisi");
    if (!tagline.trim()) return toast.error("Tagline wajib diisi");
    const priceNum = Number(price);
    if (!price || Number.isNaN(priceNum) || priceNum <= 0)
      return toast.error("Harga harus berupa angka lebih dari 0");
    if (categories.length === 0)
      return toast.error("Pilih minimal 1 kategori");

    const cleanVariants = variants.filter((v) => v.label.trim() && v.image);
    if (cleanVariants.length === 0)
      return toast.error("Tambahkan minimal 1 varian dengan label dan gambar");

    const cleanSpecs = specs.filter((s) => s.label.trim() && s.value.trim());

    const sizes = sizesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const searchKeywords = keywordsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSaving(true);

    const id = initialProduct ? initialProduct.id : generateProductId(name);

    const product: Product = {
      id,
      name: name.trim(),
      tagline: tagline.trim(),
      price: priceNum,
      image: cleanVariants[0].image,
      color: cleanVariants[0].color || DEFAULT_COLOR,
      variants: cleanVariants,
      specs: cleanSpecs,
      sizes,
      categories: categories as Exclude<ProductCategoryId, "semua">[],
      searchKeywords: searchKeywords.length > 0 ? searchKeywords : undefined,
    };

    onSave(product);
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui detail produk ini. Perubahan langsung tampil di situs."
              : "Lengkapi detail produk baru. Produk akan langsung tampil di situs."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Info dasar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Nama Produk</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Mazara R633"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label>Tagline</Label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Contoh: Sporty • Kuat • Khas Lombok"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Harga (Rp)</Label>
              <Input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1500000"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Ukuran (pisahkan koma)</Label>
              <Input
                value={sizesText}
                onChange={(e) => setSizesText(e.target.value)}
                placeholder="20, 24, 26"
              />
            </div>
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRODUCT_CATEGORIES.filter((c) => c.id !== "semua").map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 text-sm rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-secondary/40"
                >
                  <Checkbox
                    checked={categories.includes(c.id)}
                    onCheckedChange={() => toggleCategory(c.id)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>

          {/* Varian */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Varian Warna &amp; Gambar</Label>
              <Button type="button" size="sm" variant="outline" onClick={addVariant} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Tambah Varian
              </Button>
            </div>

            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="rounded-lg border border-border p-3 grid grid-cols-[auto_1fr_auto] gap-3 items-start"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-14 w-14 rounded-md border border-border bg-secondary/30 overflow-hidden flex items-center justify-center">
                      {variant.image ? (
                        <img src={variant.image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <label className="text-[10px] text-primary underline cursor-pointer">
                      Pilih foto
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleVariantImage(index, e)}
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Input
                      value={variant.label}
                      onChange={(e) => updateVariant(index, { label: e.target.value })}
                      placeholder="Nama warna, contoh: Yellow Strike"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={variant.color || DEFAULT_COLOR}
                        onChange={(e) => updateVariant(index, { color: e.target.value })}
                        className="h-8 w-10 rounded border border-border bg-transparent cursor-pointer"
                      />
                      <span className="text-xs text-muted-foreground">
                        Warna aksen kartu produk
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeVariant(index)}
                    disabled={variants.length <= 1}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Spesifikasi */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Spesifikasi Produk</Label>
              <Button type="button" size="sm" variant="outline" onClick={addSpec} className="gap-1">
                <Plus className="h-3.5 w-3.5" /> Tambah Baris
              </Button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={spec.label}
                    onChange={(e) => updateSpec(index, { label: e.target.value })}
                    placeholder="Label, contoh: Frame"
                    className="w-2/5"
                  />
                  <Input
                    value={spec.value}
                    onChange={(e) => updateSpec(index, { value: e.target.value })}
                    placeholder="Nilai, contoh: Steel Frame"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSpec(index)}
                    disabled={specs.length <= 1}
                    className="text-destructive hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Kata kunci pencarian */}
          <div className="space-y-1.5">
            <Label>Kata Kunci Pencarian (opsional, pisahkan koma)</Label>
            <Textarea
              value={keywordsText}
              onChange={(e) => setKeywordsText(e.target.value)}
              placeholder="sepeda anak, bmx, dll"
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="gap-1.5">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Tambah Produk"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
