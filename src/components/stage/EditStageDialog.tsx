
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stage, StageFormData, RequiredField } from "@/types";
import { stageAPI } from "@/services/api";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import StageRequiredFields from "./StageRequiredFields";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  color: z.string().regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Cor inválida"),
  isWinStage: z.boolean().optional(),
  isLossStage: z.boolean().optional()
}).refine(data => {
  // Can't be both win and loss
  return !(data.isWinStage && data.isLossStage);
}, {
  message: "Uma etapa não pode ser de vitória e perda ao mesmo tempo",
  path: ["isWinStage"]
});

interface EditStageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stageId: string;
  onStageUpdated: (stage: Stage) => void;
}

const EditStageDialog = ({
  open,
  onOpenChange,
  stageId,
  onStageUpdated
}: EditStageDialogProps) => {
  const [stage, setStage] = useState<Stage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requiredFields, setRequiredFields] = useState<RequiredField[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#CCCCCC",
      isWinStage: false,
      isLossStage: false
    }
  });

  useEffect(() => {
    const loadStage = async () => {
      if (open && stageId) {
        setLoading(true);
        console.log("Carregando dados da etapa:", stageId);
        
        try {
          const stageData = await stageAPI.getById(stageId);
          console.log("Etapa carregada:", stageData);
          
          if (stageData) {
            setStage(stageData);
            setRequiredFields(stageData.requiredFields || []);
            form.reset({
              name: stageData.name,
              description: stageData.description || "",
              color: stageData.color || "#CCCCCC",
              isWinStage: stageData.isWinStage || false,
              isLossStage: stageData.isLossStage || false
            });
          }
        } catch (error) {
          console.error("Error loading stage:", error);
          toast.error("Erro ao carregar dados da etapa");
        } finally {
          setLoading(false);
        }
      }
    };

    loadStage();
  }, [open, stageId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!stage) {
      console.error("Stage data not loaded");
      toast.error("Dados da etapa não carregados");
      return;
    }
    
    try {
      console.log("Enviando atualização para a etapa:", stageId);
      console.log("Dados:", {
        name: values.name,
        description: values.description,
        funnelId: stage.funnelId,
        color: values.color,
        isWinStage: values.isWinStage,
        isLossStage: values.isLossStage,
        requiredFields: requiredFields
      });
      
      setIsSubmitting(true);
      
      const updatedStage = await stageAPI.update(stageId, {
        name: values.name,
        description: values.description,
        funnelId: stage.funnelId,
        color: values.color,
        isWinStage: values.isWinStage,
        isLossStage: values.isLossStage,
        requiredFields: requiredFields
      });
      
      console.log("Resposta da API:", updatedStage);
      
      if (updatedStage) {
        onStageUpdated(updatedStage);
        toast.success("Etapa atualizada com sucesso!");
        onOpenChange(false);
      } else {
        toast.error("Erro ao atualizar etapa");
      }
    } catch (error) {
      console.error("Error updating stage:", error);
      toast.error("Erro ao atualizar etapa");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Editar etapa</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="space-y-2">
            <div className="h-10 bg-muted animate-pulse rounded-md" />
            <div className="h-10 bg-muted animate-pulse rounded-md" />
            <div className="h-10 bg-muted animate-pulse rounded-md" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da etapa</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Qualificação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Etapa de qualificação de leads" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor da etapa</FormLabel>
                    <div className="flex items-center gap-4">
                      <FormControl>
                        <Input type="color" {...field} className="w-14 h-10 p-1" />
                      </FormControl>
                      <Input 
                        placeholder="#CCCCCC" 
                        value={field.value} 
                        onChange={e => field.onChange(e.target.value)}
                        className="font-mono"
                        maxLength={7}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isWinStage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Etapa de Vitória</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Oportunidades nesta etapa são consideradas ganhas
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isLossStage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Etapa de Perda</FormLabel>
                        <div className="text-xs text-muted-foreground">
                          Oportunidades nesta etapa são consideradas perdidas
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-4" />
              
              <StageRequiredFields 
                requiredFields={requiredFields}
                setRequiredFields={setRequiredFields}
                stageId={stageId}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar alterações"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditStageDialog;
