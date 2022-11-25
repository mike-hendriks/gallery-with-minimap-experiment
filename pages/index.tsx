import styles from '../styles/Home.module.scss';
import Minimap from '@/components/Minimap/Minimap';
import { useEffect, useRef } from 'react';

export default function Home() {
  const imagesRef = useRef(null);
  const minimapRef = useRef(null);

  const images = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
  ];

  const calculateMinimapPosition = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const { offsetTop, offsetHeight } = imagesRef.current;

    const halfWindowHeight = window.innerHeight / 2;
// console.log(clientHeight);

    const scrollPercentage = scrollTop / (scrollHeight - clientHeight / 4);
    const minimapPosition = scrollPercentage * (offsetHeight - clientHeight);

    const minimapHeight = minimapRef.current.offsetHeight;
    const minimapPositionPercentage = minimapPosition / (offsetHeight - minimapHeight);

    // set the minimap position
    minimapRef.current.style.transform = `translateY(-${minimapPositionPercentage * 100}%)`;

  };

  useEffect(() => {
    addEventListener('scroll', () => calculateMinimapPosition());

    return () => {
      removeEventListener('scroll', () => calculateMinimapPosition());
    }
  }, [])
  

  return (
    <div className={styles.container}>
      <Minimap images={images} childRef={minimapRef} />
      <h1 className={styles.title}>SCROLL</h1>
      <div className={styles.images} ref={imagesRef}>
        {images.map((image, index) => (
          <img id={`image-${index}`} key={index} src={image} alt='' />
        ))}
      </div>
    </div>
  )
}
