export interface SiteMapOption {
  defaultChangeFreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  defaultPriority?: number
  hostname: string
  out?: string
}
