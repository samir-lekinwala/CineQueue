import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const search = form.get('search-box')?.valueOf() as string
    navigate(`/results?query=${search}`)
    e.currentTarget.reset()
  }

  return (
    <div className="w-1/2">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="voice-search"
            className="text-white bg-black shadow-[-1px_0px_10px_5px_rgba(255,255,255,0.2)] w-full ps-10 p-2.5 border-gray-300"
            // "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movies & TV Shows"
            required
            name="search-box"
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          ></button>
        </div>
      </form>
    </div>
  )
}

export default Search
