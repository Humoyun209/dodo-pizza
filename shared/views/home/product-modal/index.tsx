'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/shared/components/ui/dialog'
import ContentModal from '@/shared/views/home/product-modal/ContentModal'
import { useRouter } from 'next/navigation'

type Props = {
    id: string
}

const ProductModal = ({ id }: Props) => {
    const router = useRouter()
    return (
        <Dialog open onOpenChange={() => router.back()}>
            <DialogContent className="p-0 max-w-[1000px] gap-0 bg-transparent rounded-none shadow-none border-none grid grid-cols-2">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <ContentModal id={id} />
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal
