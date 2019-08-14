
import 'react';

/**
 * JSX Style with global params
 * ! _app.tsx
 */
declare module 'react' {
    interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
        jsx?: boolean;
        global?: boolean;
    }
}