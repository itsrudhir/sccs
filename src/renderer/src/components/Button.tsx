import { Link } from 'react-router-dom'

interface ButtonProps {
  text: string
  link: string
  reactIcon: JSX.Element | null
}

const Button = ({ text, link, reactIcon }: ButtonProps): JSX.Element => {
  return (
    <Link
      to={link}
      className="text-white bg-red-500 px-8 py-3 block text-center font-semibold hover:bg-red-700 focus:outline-none active:bg-red-800"
    >
      {reactIcon} {text}
    </Link>
  )
}

export default Button
