import type { ErrorType } from "../types/userTypes"

const Error = ({error}: ErrorType) => {
  return (
    <div className='h-screen flex justify-center items-center border border-red-500 px-4 py-2 rounded relative' role="alert">
        <strong className='font-bold'>Something went wrong</strong>
        <span className='block sm:inline absolute top-1 right-1 text-red-500'>{error}</span>
    </div>
  )
}

export default Error