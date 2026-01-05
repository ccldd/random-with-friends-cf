"use client"

import { useCallback, useEffect, useState } from "react"
import {
  fetchBeacon,
  quicknetClient,
  type RandomnessBeacon,
} from "drand-client"

export type { RandomnessBeacon }

export type DrandClientResult = {
  randomness: RandomnessBeacon | null
  isLoading: boolean
  error: Error | null
}

export type DrandClientResultWithFetch = DrandClientResult & {
  fetchRandom: () => void
}

export function useDrandClient(): DrandClientResultWithFetch

export function useDrandClient(
  round: number | undefined,
): DrandClientResult

export function useDrandClient(round?: number) {
  const [randomness, setRandomness] = useState<RandomnessBeacon | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const performFetch = useCallback(async (targetRound?: number) => {
    setIsLoading(true)
    setRandomness(null)
    setError(null)
    try {
      const beacon = await fetchBeacon(quicknetClient(), targetRound)
      setRandomness(beacon)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchRandom = useCallback(() => {
    if (round === undefined) {
      performFetch()
    }
  }, [round, performFetch])

  useEffect(() => {
    if (round !== undefined) {
      performFetch(round)
    }
  }, [round, performFetch])

  return {
    randomness,
    isLoading,
    error,
    ...(round === undefined && { fetchRandom }),
  }
}
