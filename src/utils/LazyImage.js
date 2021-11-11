/*
    A reusable image component to enable lazyloadng over the images 

    Takes 3 arguments
        src - actual image url
        alt - alt data to be displayd
        className - to add styles 
*/

//#region "Imports"
import React, { useState, useEffect } from 'react'
//#endregion

export const LazyImage = ({ src, alt, className }) => {

    //#region "Definitions"
    const [imageSrc, setImageSrc] = useState(placeHolder);
    const [imageRef, setImageRef] = useState();
    const placeHolder ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
    //#endregion
    
    //#region "useEffect to keep watch on component if its in the view and set the actual src"
    useEffect(() => {
      let observer
      let didCancel = false
  
      if (imageRef && imageSrc === placeHolder) {
        if (IntersectionObserver) {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                // when image is visible in the viewport + rootMargin
                if (
                  !didCancel &&
                  (entry.intersectionRatio > 0 || entry.isIntersecting)
                ) {
                  setImageSrc(src)
                }
              })
            },
            {
              threshold: 0.01,
              rootMargin: '75%',
            }
          )
          observer.observe(imageRef)
        } 
        else {
          // Old browsers fallback
          setImageSrc(src)
        }
      }
      return () => {
        didCancel = true
        // on component unmount, we remove the listner
        if (observer && observer.unobserve) {
          observer.unobserve(imageRef)
        }
      };
    });
    //#endregion
  
    //#region "Render"
    return <img className={className} ref={setImageRef} src={imageSrc} alt={alt} />
    //#endregion
}