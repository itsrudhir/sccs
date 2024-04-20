import { Component } from '@/types/Component'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@shadcn/components/ui/dropdown-menu'
import { BsThreeDotsVertical } from 'react-icons/bs'

const ComponentCard = ({
  id,
  catalogId,
  name,
  type,
  description,
  data
}: Component): JSX.Element => {
  console.log(type, data, catalogId, description)
  return (
    <Link to={`/components/${id}`}>
      <article
        key={id}
        className="bg-red-900 text-white list-none p-4 min-h-24 flex flex-col justify-between hover:bg-red-700 active:bg-red-800 hover:cursor-pointer"
      >
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-3xl font-bold mb-8 line-clamp-2 text-ellipsis">{name}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none text-2xl">
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white bg-red-950 py-4 flex flex-col gap-4 min-w-32">
              <Link to={`/components/${id}/edit-component`}>
                <DropdownMenuItem className="px-4 hover:border-none focus:border-none hover:bg-red-100 hover:text-red-950 font-semibold py-2">
                  Edit Component
                </DropdownMenuItem>
              </Link>
              <Link to={`/components/${id}/delete-component`}>
                <DropdownMenuItem className="px-4 hover:border-none focus:border-none hover:bg-red-100 hover:text-red-950 font-semibold py-2">
                  Delete Component
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </article>
    </Link>
  )
}

export default ComponentCard
