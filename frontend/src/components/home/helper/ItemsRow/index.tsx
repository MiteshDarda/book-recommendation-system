import { Download } from '@mui/icons-material';
import { FC } from 'react';
import Heart from './helper/heart';
import { Tooltip } from '@mui/material';

interface ItemsRowProps {
  items: any;
  heading: string;
}

const onDownloadHandler = (value: any) => {
  if (value?.pdf?.downloadLink) window.open(value?.pdf?.downloadLink, '_blank') && window.focus();
  else if (value?.epub?.downloadLink)
    window.open(value?.epub?.downloadLink, '_blank') && window.focus();
};

const ItemsRow: FC<ItemsRowProps> = ({ items, heading }) => {
  console.log('items>>>>>>>>', items);

  //* ------------------------------------------- JSX -------------------------------------------
  return (
    <div>
      {items?.items?.length ? <h1 className="text-white text-2xl">{heading}</h1> : <></>}
      <div className="flex flex-wrap">
        {/* 
        //$ --------------------------------- ITEMS ---------------------------------  
        */}
        {items?.items?.map((item: any, ind: number) => {
          return (
            <div
              key={ind}
              className=" m-2 p-2 bg-[#222222] shadow-md rounded-lg shadow-[#636363] drop-shadow-lg h-[400px] w-[250px] flex flex-col justify-center items-start">
              {/* 
              //$ --------------------------------- THUMBNAIL ---------------------------------  
              */}
              <img
                src={item?.volumeInfo?.imageLinks?.thumbnail}
                className="h-[50%] w-auto object-contain"
                alt="book"
              />
              {/* 
              //$ --------------------------------- DOWNLOAD ICON ---------------------------------  
              */}
              <Tooltip title="Download">
                <div
                  className="fixed top-0 right-0 m-2 text-yellow-400 hover:text-yellow-600 cursor-pointer"
                  onClick={() => onDownloadHandler(item?.accessInfo)}>
                  <Download />
                </div>
              </Tooltip>
              {/*
               //$ --------------------------------- HEART ICON ---------------------------------  
               */}
              <Heart item={item} />
              {/* 
              //$ --------------------------------- TITLE ---------------------------------  
              */}
              <div className=" text-lg grow">
                <p>{item?.volumeInfo?.title}</p>
              </div>
              {/* 
              //$ --------------------------------- AUTHORS ---------------------------------  
              */}
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
              {/* 
              //$ --------------------------------- CATEGORIES ---------------------------------  
              */}
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
