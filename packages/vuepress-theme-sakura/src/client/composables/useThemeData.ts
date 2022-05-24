import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/client'
import type { SakuraThemeData } from '../../shared'

export const useThemeData = (): ThemeDataRef<SakuraThemeData> =>
  _useThemeData<SakuraThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<SakuraThemeData> =>
  _useThemeLocaleData<SakuraThemeData>()
