type Props = {
  children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-11/12 md:w-3/5 lg:w-2/3 mx-auto min-h-screen mb-2 mt-24'>
      {children}
    </div>
  )
}

export default Layout