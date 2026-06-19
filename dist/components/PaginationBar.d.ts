export interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
    disabled?: boolean;
    maxVisiblePages?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    pageSizeLabel?: string;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}
export declare function PaginationBar({ currentPage, totalPages, disabled, maxVisiblePages, pageSize, pageSizeOptions, pageSizeLabel, onPageChange, onPageSizeChange, }: PaginationBarProps): import("react/jsx-runtime").JSX.Element;
