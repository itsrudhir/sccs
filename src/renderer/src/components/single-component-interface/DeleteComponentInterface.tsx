import { Link, useNavigate, useParams } from 'react-router-dom'

const DeleteComponentInterface = (): JSX.Element => {
  const { componentId } = useParams()
  const navigate = useNavigate()

  const handleDelete = async (): Promise<void> => {
    try {
      await window.db.db.deleteComponent(componentId)
    } catch (err) {
      console.error('Error deleting component:', err)
    } finally {
      navigate('/')
    }
  }

  return (
    <section className="flex justify-center items-center h-full">
      <section className="flex flex-col bg-red-500 p-8 gap-16">
        <h1 className="text-center text-white text-3xl font-semibold">
          Do you want to delete this component?
        </h1>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="text-white bg-red-800 px-8 py-3 block text-center font-semibold hover:bg-red-900 focus:outline-none active:bg-red-950 w-full text-lg"
          >
            Yes
          </button>
          <Link
            type="button"
            to={`/components/${componentId}`}
            className="text-white bg-red-800 px-8 py-3 block text-center font-semibold hover:bg-red-900 focus:outline-none active:bg-red-950 w-full text-lg"
          >
            No
          </Link>
        </div>
      </section>
    </section>
  )
}

export default DeleteComponentInterface
