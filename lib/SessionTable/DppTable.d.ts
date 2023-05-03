/// <reference types="react" />
import { type PaginationOptions, type SessionFilterOptions, type SessionSortOptions, type Optional, type DppMetadata } from './types';
interface SearchFilters {
    filter: Optional<SessionFilterOptions>;
    sort: Optional<SessionSortOptions>;
    pagination: Optional<PaginationOptions>;
}
interface OtoTableProps {
    data: DppMetadata[];
    query?: Optional<SearchFilters>;
    isMultiSelect?: boolean;
    style?: Record<string, string>;
    onSelectDpp: (dpp: DppMetadata[]) => void;
}
export declare const DppTable: (props: OtoTableProps) => JSX.Element;
export {};
