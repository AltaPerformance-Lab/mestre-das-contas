"use client";

import * as React from 'react';

// ===============================================
// 1. UTILS (cn, cva) - CORREÇÃO DE TIPAGEM CVA
// ===============================================

type ClassValue = string | boolean | undefined | null;

/** Concatena e resolve conflitos de classes Tailwind. */
const cn = (...inputs: ClassValue[]): string => {
  const classes = inputs.filter((x) => typeof x === 'string' && x.trim() !== '');
  return classes.join(' ');
};

type VariantConfig = Record<string, Record<string, string>>;
type DefaultVariants = Record<string, string>;

/** Simulação do Class Variance Authority (cva) para definir variantes. */
const cva = (
    base: string, 
    { variants, defaultVariants }: { variants: VariantConfig; defaultVariants?: DefaultVariants } // CORREÇÃO AQUI
) => {
  return (props: Record<string, string | undefined> = {}) => {
    let result = base;

    // 1. Aplica valores default se a propriedade não foi passada
    const mergedProps = { ...defaultVariants, ...props };

    // 2. Aplica as classes das variantes
    for (const key in variants) {
      const variantValue = mergedProps[key];
      if (variantValue && variants[key][variantValue]) {
        result = cn(result, variants[key][variantValue]);
      }
    }
    return result;
  };
};

// ===============================================
// 2. CONSTANTS, TYPES & HOOK LOGIC (use-toast.ts content)
// ===============================================

const TOAST_LIMIT = 10;
const DURATION = 3000; 

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'destructive';
};

export type Toast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  duration?: number;
  open?: boolean;
};

type Action =
  | { type: 'ADD_TOAST'; toast: Toast }
  | { type: 'DISMISS_TOAST'; toastId?: string }
  | { type: 'REMOVE_TOAST'; toastId: string };

type State = {
  toasts: Toast[];
};

type ToastFn = (props: Omit<Toast, 'id'>) => { id: string; dismiss: () => void };

// --- Reducer ---

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case 'DISMISS_TOAST':
      const { toastId } = action;
      let targetId = toastId;

      if (!targetId && state.toasts.length > 0) {
        targetId = state.toasts.find(t => t.open !== false)?.id;
      }
      
      if (!targetId) return state; 

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === targetId ? { ...t, open: false } : t
        ),
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

// --- Context e Provedor ---

let count = 0;
function genId() {
  count = (count + 1) % 1000;
  return `toast-${count}`;
}

interface ToastContextType extends State {
    toast: ToastFn;
    dismiss: (toastId?: string) => void;
}

const MOCK_TOAST_CONTEXT: ToastContextType = {
    toasts: [],
    toast: () => {
        return { id: '', dismiss: () => {} };
    },
    dismiss: () => {},
};

const ToastContext = React.createContext<ToastContextType>(MOCK_TOAST_CONTEXT);


// Hook para disparar Toasts
export function useToast() {
  return React.useContext(ToastContext); 
}

// Provedor que encapsula o estado e a lógica do toast
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] });

  const dismiss = React.useCallback((toastId?: string) => {
    dispatch({ type: 'DISMISS_TOAST', toastId });
  }, []);

  // Remove o toast da fila após a animação de saída (open: false)
  React.useEffect(() => {
    const closedToasts = state.toasts.filter((t) => t.open === false);

    if (closedToasts.length > 0) {
        const timer = setTimeout(() => {
            closedToasts.forEach(t => {
                dispatch({ type: 'REMOVE_TOAST', toastId: t.id });
            });
        }, 500); 

        return () => clearTimeout(timer);
    }
  }, [state.toasts]);


  const toast: ToastFn = React.useCallback(
    (props: Omit<Toast, 'id'>) => {
      const id = genId();
      const duration = props.duration ?? DURATION;

      dispatch({ type: 'ADD_TOAST', toast: { ...props, id, open: true, duration } });

      // Agenda o dismiss após a duração
      setTimeout(() => dismiss(id), duration);

      return { id, dismiss: () => dismiss(id) };
    },
    [dismiss]
  );

  const value = React.useMemo(
    () => ({ ...state, toast, dismiss }),
    [state, toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}


// ===============================================
// 3. TOAST PRIMITIVES (Visual Components - toast.tsx content)
// ===============================================

// 1. Definição dos estilos do Toast com variantes
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 shadow-2xl transition-all duration-300 ease-in-out sm:max-w-md',
  {
    variants: {
      variant: {
        default:
          'border-gray-200 bg-white text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50',
        destructive:
          'destructive border-red-500 bg-red-600 text-white dark:border-red-700 dark:bg-red-700 dark:text-gray-50',
      },
    },
    defaultVariants: {
      variant: 'default', // Sem erro 2353 agora, pois cva aceita
    },
  }
);

// 2. Componente principal do Toast (Wrapper)
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => {
    const variantClass = toastVariants({ variant: variant || 'default' }); // CORREÇÃO AQUI (Erro 2322)
    return (
      <div
        ref={ref}
        // Chamada direta com a string de classe garantida
        className={cn(variantClass, className)} 
        role="alert"
        tabIndex={-1} 
        {...props}
      />
    );
  }
);
Toast.displayName = 'Toast';

// 3. ToastViewport: O container onde os toasts são renderizados
const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] pointer-events-none overflow-y-auto',
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = 'ToastViewport';

// 4. ToastTitle: Título da notificação
const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm font-semibold [&+div]:mt-1', className)}
      {...props}
    />
  )
);
ToastTitle.displayName = 'ToastTitle';

// 5. ToastDescription: Descrição ou corpo da mensagem
const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
);
ToastDescription.displayName = 'ToastDescription';

// 6. ToastAction: Botão de ação opcional (ex: "Desfazer")
const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-900',
        className
      )}
      {...props}
    />
  )
);
ToastAction.displayName = 'ToastAction';

// 7. ToastClose: Botão de fechar (ícone 'X')
const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-full p-1 text-gray-500 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none dark:text-gray-400 dark:focus:ring-gray-300',
        'group-[.destructive]:text-red-50 group-[.destructive]:hover:text-white',
        className
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6L18 18" />
      </svg>
      <span className="sr-only">Fechar</span>
      {children}
    </button>
  )
);
ToastClose.displayName = 'ToastClose';


// ===============================================
// 4. TOASTER (The Renderer Component)
// ===============================================

/**
 * Toaster é o componente que renderiza todas as notificações ativas no ToastViewport.
 * Deve ser renderizado uma vez no layout principal, dentro do ToastProvider.
 */
export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <>
      {toasts.map(({ id, title, description, action, variant, open }) => {
        const isClosed = open === false;
        
        return (
          <Toast
            key={id}
            variant={variant}
            className={
              isClosed
                ? 'opacity-0 translate-x-full' 
                : 'opacity-100 translate-x-0'  
            }
            style={{
              pointerEvents: isClosed ? 'none' : 'auto', 
              transition: 'all 300ms cubic-bezier(0.65, 0.05, 0.36, 1)',
              marginBottom: isClosed ? '0' : '0.5rem', 
            }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose onClick={() => dismiss(id)} />
          </Toast>
        );
      })}
      <ToastViewport />
    </>
  );
}


// ===============================================
// 5. DEMO APPLICATION (Para testar o componente)
// ===============================================

function DemoComponent() {
    const { toast } = useToast();
    
    const handleDefault = () => {
        toast({
            title: 'Notificação Padrão',
            description: 'Esta é uma mensagem de sucesso ou informação geral.',
        });
    };

    const handleDestructive = () => {
        toast({
            title: 'Erro de Processamento',
            description: 'Houve um problema ao salvar seus dados.',
            variant: 'destructive',
            action: (
              <ToastAction onClick={() => console.log("Ação desfeita")} className="text-white hover:bg-red-700">
                Desfazer
              </ToastAction>
            )
        });
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sistema de Toast (shadcn/ui)</h1>
            <p className="text-gray-600 dark:text-gray-400">Clique nos botões para disparar notificações.</p>
            
            <button
                onClick={handleDefault}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                Mostrar Toast Padrão
            </button>
            
            <button
                onClick={handleDestructive}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
                Mostrar Toast Destrutivo (Com Ação)
            </button>
            
            <button
                onClick={() => toast({ title: 'Toast Curto', duration: 1500 })}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition"
            >
                Mostrar Toast Rápido (1.5s)
            </button>
        </div>
    );
}

// O componente principal da aplicação
export default function App() {
    return (
        <ToastProvider>
            <DemoComponent />
            <Toaster />
        </ToastProvider>
    )
}