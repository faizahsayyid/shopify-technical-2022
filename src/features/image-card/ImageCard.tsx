import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import styles from "./ImageCard.module.css";
import { selectLikes, removeLike, addLike } from "../image-feed/imageFeedSlice";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";

export interface ImageCardProps {
  title: string;
  date: string;
  url: string;
  description: string;
  keywords: string[];
  nasaId: string;
  innerRef?(el: HTMLElement): any;
}

export const ImageCard = ({
  title,
  date,
  url,
  description,
  keywords,
  nasaId,
  innerRef,
}: ImageCardProps) => {
  const [more, setMore] = useState(true);
  const [overflow, setOverFlow] = useState(false);
  const dispatch = useAppDispatch();
  const likes = useSelector(selectLikes);
  const [hasLike, setHasLike] = useState(false);
  const [copied, setCopied] = useState(false);

  //checks if nasaId is in likes
  useEffect(() => {
    if (likes !== null) {
      setHasLike(likes.split(",").some((id) => id === nasaId));
    }
  }, [likes, nasaId]);

  // converts list of keywords to comma separated string
  const keywordsReduce = (keywords: string[]): string => {
    let result = "";
    if (keywords) {
      for (let word of keywords) {
        if (result === "") {
          result = word;
        } else {
          result += ", " + word;
        }
      }
    }
    return result;
  };

  const toggleLike = () => {
    if (hasLike) {
      dispatch(removeLike(nasaId));
    } else {
      dispatch(addLike(nasaId));
    }
  };

  // checks if description element has overflowed
  const overFlowRef = (el: HTMLParagraphElement) => {
    if (el && !overflow) {
      setOverFlow(el.clientHeight > 20);
      setMore(false);
    }
  };

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(
      `https://blooming-harbor-69464.herokuapp.com/shopify-technical-2022${nasaId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <figure className={styles.card} ref={innerRef}>
      <header className={styles.header}>
        <h3>{title}</h3>
        <p className="text-info">{date}</p>
      </header>
      <img src={url} alt="something" className={styles.image} />
      <main className={styles.body}>
        <h4 className={styles.copyright}>{keywordsReduce(keywords)}</h4>
        <div className={more ? "" : styles["explanation-container"]}>
          <p
            className={more ? "" : styles.explanation}
            //Since this element is not editable, and the data is coming from NASA, this should be safe.
            dangerouslySetInnerHTML={{ __html: description }}
            ref={overFlowRef}
          />
          {overflow && (
            <p
              className={styles.more + " text-secondary"}
              onClick={() => setMore(!more)}
            >
              {more ? "less" : "more"}
            </p>
          )}
        </div>
        <div className={styles["btn-container"]}>
          <button className={"btn " + styles["like-btn"]} onClick={toggleLike}>
            {hasLike ? (
              <BsSuitHeartFill size="1.25rem" />
            ) : (
              <BsSuitHeart size="1.25rem" />
            )}
            <h3 className={styles["like-txt"]}>
              {hasLike ? "Unlike" : "Like"}
            </h3>
          </button>
          <button
            className={"btn " + styles["like-btn"]}
            onClick={copyToClipBoard}
          >
            <FaShareSquare />
            <h3 className={styles["like-txt"]}>Share</h3>
          </button>
          {copied && <p className="text-info">Copied To Clipboard!</p>}
        </div>
      </main>
    </figure>
  );
};
