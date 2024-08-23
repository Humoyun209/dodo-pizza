import { LoaderCircle } from 'lucide-react'
import React from 'react'

type Props = {}

const LoadingUi = (props: Props) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/30 flex justify-center items-center">
            <LoaderCircle size={75} className="animate-spin text-primary" />
        </div>
    )
}

export default LoadingUi
