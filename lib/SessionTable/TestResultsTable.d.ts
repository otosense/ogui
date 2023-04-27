/// <reference types="react" />
import { type PaginationOptions, type SessionFilterOptions, type SessionSortOptions, type Optional, type TestResult } from './types';
interface SearchFilters {
    filter: Optional<SessionFilterOptions>;
    sort: Optional<SessionSortOptions>;
    pagination: Optional<PaginationOptions>;
}
interface OtoTableProps {
    data: TestResult[];
    query?: Optional<SearchFilters>;
    isMultiSelect?: boolean;
    style?: Record<string, string>;
    onSelectSessions: (sessions: TestResult[]) => void;
}
export declare const TestResultsTable: (props: OtoTableProps) => JSX.Element;
export {};
