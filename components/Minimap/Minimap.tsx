import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Minimap.module.scss';
import { MinimapType } from './Minimap.types';

const Minimap = ({ images, childRef }: MinimapType) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setAspectRatio(window.innerWidth / window.innerHeight);
  }, [])
  

	return (
		<div className={styles.wrapper}> 
      <div className={styles.indicator} style={ {aspectRatio: `${aspectRatio} / 1 `}} />
      {/* <div className={styles.indicator} /> */}
      <div className={styles.track} ref={childRef}>
      
      {images.map((image, index) => (
        <a
          href={`#image-${index}`}
          key={index}
          className={classNames(styles.image)}
        >
          <img src={image} alt={image} className={styles.image}  />
        </a>
      ))}
      </div>
		</div>
	);
};

export default Minimap;
