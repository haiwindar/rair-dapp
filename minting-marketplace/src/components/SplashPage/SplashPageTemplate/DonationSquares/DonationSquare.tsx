import { useEffect, useState } from 'react';

import AuthorCardButton from '../AuthorCard/AuthorCardButton';

import './DonationSquare.css';

const DonationSquare = ({ donationSquareData, mobileView }) => {
  const { title, image, buttonData, textBoxArray, imageClass } =
    donationSquareData;

  const [open, setOpen] = useState(mobileView);
  const clickHandler = () => {
    if (!mobileView) {
      setOpen(!open);
    }
  };

  useEffect(() => {
    setOpen(mobileView);
  }, [mobileView]);

  return (
    <div className="donation-square" onClick={() => clickHandler()}>
      <div className="donation-square-title">{title}</div>
      {open ? (
        <>
          <div
            className={['donation-square-image', imageClass].join(' ')}
            style={{ backgroundImage: 'url(' + image + ')' }}
          />
          <AuthorCardButton
            buttonData={buttonData}
            whatSplashPage={'donation-square-button'}
          />
          <div className={['donation-square-textbox', imageClass].join(' ')}>
            <div
              className={['donation-square-inner-textbox', imageClass].join(
                ' '
              )}>
              {textBoxArray.map((row) => (
                // eslint-disable-next-line react/jsx-key
                <div className="donation-square-textbox-row">{row}</div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DonationSquare;
