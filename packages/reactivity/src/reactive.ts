import { ReactiveFlags } from './constants'
import _ from 'lodash'
// 方便判断特有标识
export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.RAW]?: any
}

// 用作reactive的缓存map
export const reactiveMap = new WeakMap<Target, any>()
// 1.1
export function reactive (target: Object) {
  return createReactiveObject(target, reactiveMap)
}
export function isReactive (target: Object) {

}

// 1.3
function createReactiveObject (target: Target, proxyMap: WeakMap<Target, any>, baseHandlers: ProxyHandler<any>) {
  // 基础类型直接返回
  if (_.isObject(target)) {
    return target
  }
  // 已经被代理过的直接返回
  if (target[ReactiveFlags.RAW]) {
    return target
  }
  // 命中缓存直接返回
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return target
  }
  // 进行代理
  const proxy = new Proxy(
    target,
    baseHandlers
  )
  // 设置缓存
  proxyMap.set(target, proxy)
  return proxy
}
export function toRaw<T> (observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}
