import { useToast } from '../context/ToastContext';

const icons = {
    success: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

const styles = {
    success: 'bg-emerald-500 text-white shadow-emerald-200/50 dark:shadow-emerald-900/30',
    error: 'bg-red-500 text-white shadow-red-200/50 dark:shadow-red-900/30',
    warning: 'bg-amber-500 text-white shadow-amber-200/50 dark:shadow-amber-900/30',
    info: 'bg-blue-500 text-white shadow-blue-200/50 dark:shadow-blue-900/30',
};

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
                        ${styles[toast.type] || styles.info}
                        animate-toast-in transition-all duration-300`}
                    role="alert"
                >
                    {icons[toast.type] || icons.info}
                    <span className="text-sm font-medium flex-1">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
                        aria-label="Dismiss"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}
