import { Download } from '@mui/icons-material';
import { FC } from 'react';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

interface ItemsRowProps {
  items: any;
}

const onDownloadHandler = (value: any) => {
  if (value?.pdf?.downloadLink) window.open(value?.pdf?.downloadLink, '_blank') && window.focus();
  else if (value?.epub?.downloadLink)
    window.open(value?.epub?.downloadLink, '_blank') && window.focus();
};

const onHeartHandler = (value: any) => {};

const ItemsRow: FC<ItemsRowProps> = ({ items }) => {
  return (
    <div>
      <h1>value</h1>
      <div className="flex flex-wrap">
        {/* --------------------------------- ITEMS ---------------------------------  */}
        {items?.items?.map((item: any, ind: number) => {
          return (
            <div
              key={ind}
              className=" m-2 p-2 bg-[#040404] shadow-md rounded-lg shadow-white drop-shadow-lg h-[400px] w-[250px] flex flex-col justify-center items-start">
              {/* --------------------------------- image ---------------------------------  */}
              <img
                src={item?.volumeInfo?.imageLinks?.thumbnail}
                className="h-[50%] w-auto object-contain"
                alt="book"
              />
              {/* --------------------------------- download icon ---------------------------------  */}
              <div
                className="fixed top-0 right-0 m-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                onClick={() => onDownloadHandler(item?.accessInfo)}>
                <Download />
              </div>
              <div
                className="fixed top-10 right-0 m-2 text-red-100 hover:text-red-500 cursor-pointer"
                onClick={() => onHeartHandler(item?.accessInfo)}>
                <FavoriteTwoToneIcon />
              </div>
              {/* --------------------------------- title ---------------------------------  */}
              <div className=" text-lg grow">
                <p>{item?.volumeInfo?.title}</p>
              </div>
              {/* --------------------------------- authors ---------------------------------  */}
              {item?.volumeInfo?.authors?.length ? (
                <div className="text-sm text-gray-400 grow">
                  Author:
                  {item?.volumeInfo?.authors?.map((author: string, ind: number) => {
                    return <p key={ind}>{author}</p>;
                  })}
                </div>
              ) : (
                <></>
              )}
              {/* --------------------------------- categories ---------------------------------  */}
              {item?.volumeInfo?.categories?.length ? (
                <div className="text-xs text-gray-400">
                  Category:
                  {item?.volumeInfo?.categories?.map((author: string, ind: number) => {
                    return <p key={ind}>{author}</p>;
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsRow;
