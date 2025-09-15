"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Appbar = () => {
    const session = useSession()
    return (
        <header className='flex justify-between w-full p-5'>
            <div className='text-amber-500'>
                Muser
            </div>
            <div >
                {session.data?.user ?
                    <button className='m-2 p-2 bg-amber-500 rounded font-semibold uppercase tracking-widest text-sm text-white cursor-pointer' onClick={() => signOut()}>Sign out</button> :
                    <button className='m-2 p-2 bg-amber-500 rounded font-semibold uppercase tracking-widest text-sm text-white cursor-pointer' onClick={() => signIn()}>Sign in</button>}
            </div>
        </header>
    )
}

export default Appbar
