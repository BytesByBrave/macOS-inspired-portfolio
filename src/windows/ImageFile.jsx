import React from 'react'
import windowWrapper from '#hoc/windowWrapper'
import { WindowControls } from '#components'
import useWindowStore from '#store/window'

const ImageFile = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id='window-header'>
                <WindowControls target="imgfile" />
                <p>{name}</p>
            </div>
            <div className='p-5 bg-white flex-1 overflow-auto w-full h-full'>
                {imageUrl ? (
                    <div className='w-full'>
                        <img src={imageUrl} alt={name} className='w-full h-auto max-h-[70vh] object-contain rounded'/>
                    </div>
                ): null}
            </div>
        </>
    )
}

const ImageFileWindow = windowWrapper(ImageFile, "imgfile")

export default ImageFileWindow
