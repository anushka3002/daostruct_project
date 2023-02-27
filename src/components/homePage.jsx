import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useMediaQuery,
  ModalCloseButton,
  CloseButton,
} from "@chakra-ui/react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [spotlight, setSpotlightData] = useState();
  const [overlay, setOverLay] = useState();
  const [mediaType, setMediaType] = useState("image");
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [current, setCurrent] = useState(1);
  const [scroller, initScroller] = useState(0);
  const [endMonth, setEndMonth] = useState(3);
  const [scrollLoad,setScrollLoad] = useState(false)

  useEffect(() => {
    if (scroller == "100" && endMonth <= 12) {
      setEndMonth((prev) => prev + 1);
      setScrollLoad(true)
    }
    else{
      setScrollLoad(false)
    }
  }, [scroller]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          endMonth > 9
            ? `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-02-08&end_date=2022-${endMonth}-04&thumbs=true`
            : `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-02-08&end_date=2022-0${endMonth}-04&thumbs=true`
        )
        .then((data) => {
          setData(data);
          setSpotlightData(data?.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [endMonth]);

  useEffect(() => {
    const array = [];
    const chunkSize = 7;
    for (let i = 0; i < data?.data?.length; i += chunkSize) {
      const chunk = data?.data?.slice(i, i + chunkSize);
      array.push(chunk);
      setCurrent(array);
    }
  }, [data]);

  const handleScroll = (event) => {
    const height = event.currentTarget.clientHeight;
    const barHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;
    initScroller(((scrollTop + height) / barHeight) * 100);
  };

  const { isOpen: isOpen, onClose: onClose, onOpen: onOpen } = useDisclosure();

  return (
    <>
      {/* header */}
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={true}>
        <ModalOverlay />
        <ModalContent
          backgroundColor={"transparent"}
          maxW={"full"}
          maxH={"full"}
          padding={"20px"}
        >
          <CloseButton
          margin={"auto"}
          onClick={()=>onClose()}
          color={"white"}
          />
          <ModalBody>
            {mediaType == "image" ? (
              <img className="w-full" src={overlay} />
            ) : (
              <iframe
                style={{ width: "100%", height: "700px" }}
                src={overlay}
                frameborder="0"
                allowFullScreen
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <div className='h-screen w-[100vw] max-w-full bg-no-repeat bg-cover object-fit bg-[url("https://history-computer.com/wp-content/uploads/2022/08/most-powerful-rockets-ever-built-header-scaled.jpg")]'>
        <div className="px-5">
          <div className="flex justify-between">
            <div className=" text-start pt-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png"
                width="120px"
                height="100px"
              />
              <p className="text-[white] font-semibold">Anushka Priya</p>
            </div>
            <div className="flex my-auto">
              {isMobile ? (
                <></>
              ) : (
                <p className="text-[30px] font-semibold pr-5 flex my-auto text-[white]">
                  Astronomy Picture Of The Day
                </p>
              )}
            </div>
          </div>
          {isMobile && (
            <p className="text-[40px] pt-20 mx-auto text-start font-semibold pr-5 flex my-auto text-[white]">
              Astronomy Picture Of The Day
            </p>
          )}
        </div>
      </div>

      {/* Spotlight picture */}
      {<div
        className={`${
          isMobile ? "flex flex-col flex-col-reverse" : "flex"
        } w-full mb-20 text-[white] justify-between mt-20`}
      >
        <div
          className={`${isMobile ? "w-[100%]" : "w-[47%]"}  px-5 py-2 my-auto`}
        >
          {data.length != 0 ?<p className="text-[20px] font-semibold pb-2 text-[white]">
             {spotlight?.title} </p>: <SkeletonTheme
              baseColor="#101010"
              highlightColor="#959498"
              height={'30px'}
            >
              <div>
                <Skeleton
                  className="w-[40%] h-[38px] rounded-[12px] mb-10 mt-4"
                  baseColor="#101010"
                  highlightColor="#959498"
                  count={1}
                />
              </div>
            </SkeletonTheme>
         }
          <p className="text-justify">{data.length != 0 ? spotlight?.explanation : <SkeletonTheme
              baseColor="#101010"
              highlightColor="#959498"
              height={'30px'}
            >
              <div>
                <Skeleton
                  className="w-full h-[38px] rounded-[12px] mb-6"
                  baseColor="#101010"
                  highlightColor="#959498"
                  count={4}
                />
              </div>
            </SkeletonTheme>}</p>
          <p className="text-[15px] pt-4">- {spotlight?.copyright}</p>
        </div>
        <div
          className={`${
            isMobile ? "w-[100%] mb-20" : "w-[47%]"
          } h-[10%] my-auto`}
        >
          {data.length != 0 ? <img
            onClick={() => {
              onOpen();
              setOverLay(spotlight?.url);
            }}
            className="h-[50%] rounded-[7px] cursor-pointer"
            src={
              spotlight?.media_type == "image"
                ? spotlight?.hdurl
                : spotlight?.thumbnail_url
            }
          />:<SkeletonTheme
          baseColor="#101010"
          highlightColor="#959498"
          height={'300px'}
        >
          <div>
            <Skeleton
              className="w-full h-[38px] rounded-[12px] mb-6"
              baseColor="#101010"
              highlightColor="#959498"
              count={1}
            />
          </div>
        </SkeletonTheme>}
        </div>
      </div>}

      {/* All data */}
      <div
        onScroll={handleScroll}
        className={`overflow-y-scroll ${data.length != 0 && "h-[100vh]"}`}
      >
        <div className="flex flex-col w-[100vw] gap-[40px] px-[24px] overflow-y-scroll">
            { Object.entries(current).map((data, i) => (
              <div
                onScroll={handleScroll}
                key={i}
                className="flex flex-row overflow-x-scroll gap-[20px]"
              >
                {data[1]?.map((e, i) => (
                  <div className="flex flex-row w-[300px] gap-[20px]" key={i}>
                    <div
                      key={e.title}
                      className=" rounded  shadow-lg bg-[#1d1d1d] w-[300px] h-[100%] rounded-[7px]"
                    >
                      <img
                        onClick={() => {
                          setOverLay(e.url);
                          onOpen();
                          setMediaType(e.media_type);
                        }}
                        className="w-[300px] h-[300px] mx-auto rounded-t-[7px]"
                        src={
                          e.media_type == "image" ? e.hdurl : e.thumbnail_url
                        }
                      />
                      <div className="px-6 py-4">
                        <div className="font-bold text-white text-xl mb-2">
                          {e.title}
                        </div>
                        <p className="text-white text-base">{e.date}</p>
                      </div>
                      {e.copyright ? (
                        <div className="px-6 pt-4 pb-2">
                          <span className="inline-block text-sm font-semibold text-white mr-2 mb-2">
                            - {e.copyright}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
      <div className="w-[100%]">
        {scrollLoad? <SkeletonTheme
              baseColor="#101010"
              highlightColor="#959498"
              height={'100px'}
            >
              <div>
                <Skeleton
                  className="w-[40%] h-[38px] rounded-[12px] mb-10 mt-4"
                  baseColor="#101010"
                  highlightColor="#959498"
                  count={2}
                />
              </div>
            </SkeletonTheme>:<></>}
      </div>
    </>
  );
};

export default HomePage;
