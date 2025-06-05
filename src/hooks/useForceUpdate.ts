import { useState, useCallback } from 'react'

export const useForceUpdate = () => {
  const [, setTick] = useState(0) // 仅需更新函数，忽略状态值

  const forceUpdate = useCallback(() => {
    setTick((prev) => prev + 1) // 基于前值更新，确保原子性
  }, []) // 空依赖数组保证函数引用稳定

  return forceUpdate
}
