/// <reference types="react" />
import { type PaginationOptions, type SessionFilterOptions, type SessionSortOptions, type Optional, type Session } from './types';
interface SearchFilters {
    filter: Optional<SessionFilterOptions>;
    sort: Optional<SessionSortOptions>;
    pagination: Optional<PaginationOptions>;
}
interface SessionTableProps {
    data: Session[];
    query?: Optional<SearchFilters>;
    isMultiSelect?: boolean;
    style?: Record<string, string>;
    onSelectSessions: (sessions: Session[]) => void;
}
export declare const SessionTable: (props: SessionTableProps) => JSX.Element;
export {};
