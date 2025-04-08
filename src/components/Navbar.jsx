import React from 'react'

function Navbar() {
  return (
    <div>
      <nav className='bg-slate-900 text-white flex justify-between items-center p-5 text-lg font-medium'>

<div className="logo text-3xl"> <span  className='text-green-500'> &lt;</span>Pass<span className='text-green-500 '>OP/&gt;</span> </div>
<ul className=' gap-5 hidden md:flex'>
<li>Home</li>
<li>About</li>
<li>Contact Us</li>


</ul>

      </nav>
    </div>
  )
}

export default Navbar
