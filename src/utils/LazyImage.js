import React, { useState, useEffect } from "react";

/**
 * A reusable image component to enable lazyloadng over the images
 * @param src - actual image url
 * @param alt - alt data to be displayd
 * @param className - to add styles
 */
export default function LazyImage({ src, alt, className }) {
    const placeHolder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";
    const [imageSrc, setImageSrc] = useState(placeHolder);
    const [imageRef, setImageRef] = useState();

    // useEffect to keep watch on component if its in the view and set the actual src"
    useEffect(() => {
        let observer;
        let didCancel = false;

        if (imageRef && imageSrc === placeHolder) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    entries => {
                        entries.forEach(entry => {
                            // when image is visible in the viewport + rootMargin
                            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                                setImageSrc(src);
                            }
                        });
                    },
                    {
                        threshold: 0.01,
                        rootMargin: "75%",
                    },
                );

                observer.observe(imageRef);
            } else {
                // Old browsers fallback
                setImageSrc(src);
            }
        }

        return () => {
            didCancel = true;
            // on component unmount, we remove the listner
            if (observer && observer.unobserve) observer.unobserve(imageRef);
        };
    });

    return <img className={className} ref={setImageRef} src={imageSrc} alt={alt} />;
}
