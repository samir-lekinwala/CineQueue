/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Details } from '../api/types'
import {
  addToCompletedList,
  addToWatchlist,
  deleteFromCompletedList,
  deleteFromWatchlist,
  getCompletedList,
  getWatchlist,
} from '../api/dbApi'
import { useAuth0 } from '@auth0/auth0-react'
const { VITE_API_KEY } = import.meta.env

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${VITE_API_KEY}`,
  },
}

interface Props {
  details: Details
}

function TvShowDetails(props: Props) {
  const { details } = props

  const { user, getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub

  const toWatchList = {
    content_id: details.id,
    movie_or_show: 'show',
    auth_id: auth0Id,
  }

  const queryClient = useQueryClient()
  useEffect(() => {
    // Invalidate relevant queries when type or id changes
    queryClient.invalidateQueries(['completedOrNot', details])
    queryClient.invalidateQueries(['completedListChecker', details])
    queryClient.invalidateQueries(['watchedOrNot', details])
    queryClient.invalidateQueries(['watchlistChecker', details])
    // onWatchlistChecker()
  }, [queryClient, details])

  const {
    data: completed, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['completedOrNot'],
    queryFn: onCompletedListChecker,
  })

  const { data: completedList } = useQuery({
    queryKey: ['completedListChecker'],
    queryFn: totalCompletedList,
  })

  const {
    data: watched, //watchlist single item on list or not
  } = useQuery({
    queryKey: ['watchedOrNot'],
    queryFn: onWatchlistChecker,
  })

  const { data: watchlist } = useQuery({
    queryKey: ['watchlistChecker'],
    queryFn: totalWatchlist,
  })

  async function totalWatchlist() {
    const token = await getAccessTokenSilently()
    return await getWatchlist(token)
  }

  //function to add to watchlist

  async function handleWatchListClick() {
    const token = await getAccessTokenSilently()
    await addToWatchlist(toWatchList, token)
    queryClient.invalidateQueries(['watchlistChecker'])
  }

  async function handleWatchListClickDelete() {
    const token = await getAccessTokenSilently()
    await deleteFromWatchlist(toWatchList, token)
    queryClient.invalidateQueries(['watchlistChecker'])
  }

  function onWatchlistChecker() {
    const result = watchlist.filter((item) => item.content_id == details.id)
    if (result.length > 0) {
      return true
    } else return false
  }

  //for completed

  async function totalCompletedList() {
    const token = await getAccessTokenSilently()
    return await getCompletedList(token)
  }

  // //function to add to watchlist

  async function handleCompletedListClick() {
    const token = await getAccessTokenSilently()
    await addToCompletedList(toWatchList, token)
    queryClient.invalidateQueries(['completedListChecker'])
  }

  async function handleCompletedListClickDelete() {
    const token = await getAccessTokenSilently()
    await deleteFromCompletedList(toWatchList, token)
    queryClient.invalidateQueries(['completedListChecker'])
  }

  function onCompletedListChecker() {
    const result = completedList.filter((item) => item.content_id == details.id)
    if (result.length > 0) {
      return true
    } else return false
  }

  const [userInput, setUserInput] = useState<number>(0)
  const [showRuntimeInDays, setShowRuntimeInDays] = useState<boolean>(false)

  function handleShowRuntimeInDaysClick() {
    setShowRuntimeInDays(true)
  }

  const data = getRunTime(userInput, props, showRuntimeInDays)

  return (
    <section className="bg-black">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {details.name}
          </h1>
          <p className="text-white font-medium text-base my-4">
            Episodes: <strong>{details.number_of_episodes}</strong> Seasons:{' '}
            <strong>{details.number_of_seasons}</strong>
          </p>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {details.overview}
          </p>
          {!onWatchlistChecker() ? (
            <button
              onClick={handleWatchListClick}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Add to Watchlist
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleWatchListClickDelete}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Watchlisted
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="#008000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}
          {!onCompletedListChecker() ? (
            <button
              onClick={handleCompletedListClick}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Add to completed
            </button>
          ) : (
            <button
              onClick={handleCompletedListClickDelete}
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Already watched
            </button>
          )}

          <button
            onClick={handleShowRuntimeInDaysClick}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Total runtime: {data.totalShowRunTime} hours <br />
            {/* Runtime: {runtime.finalRuntime} minutes per episode <br /> */}
            {showRuntimeInDays && (
              <>
                Total runtime in days: {data.totalShowRunTimeDays} days <br />
              </>
            )}
            {/* Total Number of Episodes: {details.number_of_episodes} <br />
            Total Number of Seasons: {details.number_of_seasons} */}
          </button>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
            alt="mockup"
            className="rounded"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="inline-flex items-center justify-center px-0 py-1 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:focus:ring-gray-800">
            Average Episode runtime: {data.finalRuntime} minutes <br />
            {/* Total Number of Episodes: {details.number_of_episodes} <br />
            Total Number of Seasons: {details.number_of_seasons} <br /> */}
            {/* Total hours to watch the show: {runtime.totalShowRunTime}
            <br /> */}
            Days to watch:
            {data.userInput &&
            data.daysToWatchShow &&
            !isNaN(data.daysToWatchShow)
              ? data.daysToWatchShow
              : 'N/A'}
            <label
              htmlFor="userInput"
              className="block mt-4 text-gray-500 dark:text-gray-400"
            >
              Availability:
            </label>
            <input
              type="number"
              id="userInput"
              name="userInput"
              placeholder="Availability in minutes daily"
              value={userInput}
              onChange={(e) => {
                const value = e.target.value
                if (value.length === 1 && value === '0') {
                  return
                }
                setUserInput(() => Number(value))
              }}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default TvShowDetails

function getRunTime(
  userInput: number,
  props: Props,
  showRuntimeInDays: boolean
) {
  const episodeRunTime = props.details.episode_run_time
  const lastEpisodeRunTime = [props.details.last_episode_to_air.runtime]

  let finalRuntime = 0
  if (episodeRunTime.length > 0) {
    const sum = episodeRunTime.reduce((acc: any, value: any) => acc + value, 0)
    const averageEpisodeRunTime = sum / episodeRunTime.length
    finalRuntime = averageEpisodeRunTime
  } else if (lastEpisodeRunTime.length > 0) {
    const sum = lastEpisodeRunTime.reduce((acc, value) => acc + value, 0)
    const averageLastEpisodeRunTime = sum / lastEpisodeRunTime.length
    finalRuntime = averageLastEpisodeRunTime
  }

  const totalShowRunTime = Math.round(
    (finalRuntime * props.details.number_of_episodes) / 60
  )
  const totalShowRunTimeDays = Math.round(totalShowRunTime / 24)
  let daysToWatchShow = 0
  if (!isNaN(userInput)) {
    // Check if userInput is not blank and is a valid number
    daysToWatchShow = Math.round((totalShowRunTime * 60) / userInput)
  }
  console.log('user', userInput)
  console.log('time', daysToWatchShow)
  console.log('Runtime:', episodeRunTime)
  console.log('Runtime1:', lastEpisodeRunTime)
  console.log('Runtime2:', finalRuntime)

  return {
    episodeRunTime: episodeRunTime,
    lastEpisodeRunTime: lastEpisodeRunTime,
    finalRuntime:
      episodeRunTime.length > 0 && lastEpisodeRunTime.length > 0
        ? finalRuntime
        : 'Not Available',

    totalShowRunTime: totalShowRunTime,
    daysToWatchShow: daysToWatchShow,
    userInput: userInput,
    totalShowRunTimeDays: showRuntimeInDays ? totalShowRunTimeDays : undefined,
  }
}
