import { type PaginationOptions, type SessionFilterOptions, type SessionSortOptions, type Optional, type Session } from './types';
export declare const listSessions: (filter?: Optional<SessionFilterOptions>, sort?: Optional<SessionSortOptions>, pagination?: Optional<PaginationOptions>, sessions?: Session[]) => Session[];
export declare const listData: (sort?: Optional<SessionSortOptions>, pagination?: Optional<PaginationOptions>, data?: Array<Record<string, any>>) => Array<Record<string, any>>;
