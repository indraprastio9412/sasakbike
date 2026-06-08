import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { RegionItem } from "@/lib/indonesia-regions";

type RegionSearchSelectProps = {
  label: string;
  placeholder: string;
  searchPlaceholder?: string;
  options: RegionItem[];
  value: RegionItem | null;
  onChange: (item: RegionItem) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
};

const RegionSearchSelect = ({
  label,
  placeholder,
  searchPlaceholder = "Ketik untuk mencari...",
  options,
  value,
  onChange,
  disabled,
  loading,
  error,
}: RegionSearchSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-muted-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled || loading}
            className={cn(
              "w-full justify-between h-11 font-normal bg-input border-border hover:bg-input",
              !value && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            <span className="truncate text-left text-sm">
              {loading ? "Memuat..." : value?.name ?? placeholder}
            </span>
            {loading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-50" />
            ) : (
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(100vw-2rem,var(--radix-popover-trigger-width))] p-0" align="start">
          <Command shouldFilter>
            <CommandInput placeholder={searchPlaceholder} className="h-10" />
            <CommandList>
              <CommandEmpty>Tidak ditemukan. Coba kata kunci lain.</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4 shrink-0", value?.id === item.id ? "opacity-100" : "opacity-0")}
                    />
                    <span className="truncate">{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default RegionSearchSelect;
