import React from 'react'

type Props = {
    children: React.ReactNode
    modal: React.ReactNode
}

const LayoutHome = ({ children, modal }: Props) => {
    return (
        <>
            {children}
            {modal}
        </>
    )
}

export default LayoutHome
