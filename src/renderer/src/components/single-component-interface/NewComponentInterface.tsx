import { useState } from 'react'
import { generateComponentId } from '@/utils/generateIDs'
import { Link, useNavigate } from 'react-router-dom'
import { Component } from '@/types/Component'

const NewComponentInterface = (): JSX.Element => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState('')
  const [nameError, setNameError] = useState('')
  const [dataError, setDataError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()
    if (!name) {
      setNameError('Name is required')
      return
    }

    if (!data) {
      setDataError('Code is required')
      return
    }

    const id = await generateComponentId()

    const lastAccessed = new Date()
    const createdAt = new Date()

    const newComponent: Component = {
      id,
      catalogId: 'CAT-000000000000',
      name,
      type: 'CODE',
      description,
      data,
      frequency: 0,
      lastAccessed,
      createdAt
    }

    try {
      await window.db.db.insertComponent(JSON.stringify(newComponent), lastAccessed, createdAt)
    } catch (error) {
      console.error('Error inserting component:', error)
    } finally {
      navigate(`/`)
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-12">
      <div className="bg-red-500 p-8 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">New Component</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-red-100 mb-2 text-lg font-semibold">
              Name {nameError && <i className="text-red-500 text-sm mt-1">*</i>}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-red-100 mb-2 text-lg font-semibold">
              Code {dataError && <i className="text-red-500 text-sm mt-1">*</i>}
            </label>
            <textarea
              id="code"
              value={data}
              placeholder="code"
              onChange={(e) => setData(e.target.value)}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-red-100 mb-2 text-lg font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
              className="bg-red-800 text-white mb-4 focus:outline-none w-full p-4 hover:bg-red-900 focus:bg-red-900"
            ></textarea>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="text-white bg-red-900 px-8 py-3 block text-center font-semibold-lg hover:bg-white hover:text-red-700 focus:outline-none active:text-white active:bg-red-800 w-full"
            >
              Create
            </button>
            <Link
              type="button"
              to={`/`}
              className="text-red-700 bg-red-200 px-8 py-3 block text-center font-semibold-lg hover:bg-red-900 hover:text-white focus:outline-none active:text-red-700 active:bg-red-200 w-full"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewComponentInterface
