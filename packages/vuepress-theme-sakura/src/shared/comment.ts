import type {Object as AVObject} from "leancloud-storage";

export interface QueryResult<T> extends AVObject {
  results: T[]
}


