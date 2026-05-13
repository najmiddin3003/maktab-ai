export const SINF_OPTIONS = ['5-sinf', '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf'] as const;

export type SinfOption = (typeof SINF_OPTIONS)[number];
