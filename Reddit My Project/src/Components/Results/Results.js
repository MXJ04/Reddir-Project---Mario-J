import "./Results.css";
import redditLogo from "./reddit-logo.png";
import blackBox from "./black-box.png";
import { Comments } from "../Comments/Comments";
import { useEffect, useState } from "react";
import Reddit from "../../Utilities/Reddit";
import Time from "../../Utilities/TimeFormatting";

export const Results = (props) => {
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [about, setAbout] = useState(null);

  const created = props.searchResults.data.created_utc;
  const now = new Date();
  const secondsSinceEpoch = Math.round(now.getTime() / 1000);
  let sincePosted = Math.floor((secondsSinceEpoch - created) / 60);

  let posted = Time.postFormatting(sincePosted);
  let units = Time.unitFormatting(sincePosted);

  let upVotes;
  if (props.searchResults.data.ups - props.searchResults.data.downs > 1000) {
    upVotes = (
      (props.searchResults.data.ups - props.searchResults.data.downs) /
      1000
    ).toFixed(1);
  } else {
    upVotes = props.searchResults.data.ups - props.searchResults.data.downs;
  }

  const toggleComments = () => {
    if (!showComments) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  const readMore = () => {
    if (!showReadMore) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
    }
  };

  useEffect(() => {
    Reddit.findComments(props.searchResults.data.permalink).then((data) =>
      setComments(data)
    );
  }, [props.searchResults]);

  useEffect(() => {
    fetch(
      `https://www.reddit.com/${props.searchResults.data.subreddit_name_prefixed}/about.json`
    )
      .then((data) => data.json())
      .then((jsonData) => setAbout(jsonData));
  }, [props.searchResults]);

  return (
    <div className='results'>
      <div>
        <div className='results-box'>
          <p className='votes'>{upVotes}k</p>

          <div className='post-heading'>
            {!about ? null : about.data.icon_img ? (
              <img className='sub-icon' src={about.data.icon_img} alt='' />
            ) : (
              <img className='sub-icon' src={blackBox} alt='' />
            )}
            <strong>
              <p
                className='sub-name'
                onClick={props.handleSubChange}
                data-sub={`${props.searchResults.data.subreddit_name_prefixed}/`}
              >
                {props.searchResults.data.subreddit_name_prefixed}
              </p>
            </strong>

            <p className='author'>
              posted by u/{props.searchResults.data.author} {posted} {units} ago
            </p>
          </div>

          <a
            href={props.searchResults.data.url}
            target='_blank'
            rel='noreferrer'
          >
            <p className='post-title'>{props.searchResults.data.title}</p>
          </a>
        </div>

        <div className='media-box'>
          {!props.searchResults.data.selftext ? null : (
            <p onClick={readMore} className='read-more'>
              Read More
            </p>
          )}
          {!props.searchResults.data.selftext ? null : (
            <p className={showReadMore ? "show-selftext" : "hide-selftext"}>
              {props.searchResults.data.selftext}
            </p>
          )}
          {!props.searchResults.data ? (
            <img className='loading' src={redditLogo} alt='' />
          ) : //VIDEO
          props.searchResults.data.is_video === true ? (
            <video controls>
              <source
                src={
                  props.searchResults.data.secure_media.reddit_video
                    .fallback_url
                }
                type='video/mp4'
              />
            </video>
          ) : props.searchResults.data.preview &&
            props.searchResults.data.preview.reddit_video_preview &&
            props.searchResults.data.preview.reddit_video_preview
              .fallback_url ? (
            <video controls>
              <source
                src={
                  props.searchResults.data.preview.reddit_video_preview
                    .fallback_url
                }
                type='video/mp4'
              />
            </video>
          ) : //GIFS
          props.searchResults.data.secure_media_embed.media_domain_url ? (
            <embed
              className='gifs'
              src={props.searchResults.data.secure_media_embed.media_domain_url}
              alt=''
            />
          ) : (
            //IMAGE
            <a href={props.searchResults.data.url}>
              <img src={props.searchResults.data.url} alt='' />
            </a>
          )}

          <div className='comments-and-percent'>
            <p className='mobile-votes'>{upVotes}k</p>
            <p
              className='comments'
              data-link={props.searchResults.data.permalink}
              onClick={toggleComments}
            >
              Comments {props.searchResults.data.num_comments}
            </p>
            <p className='percent-upvote'>
              {props.searchResults.data.upvote_ratio * 100}% Upvoted
            </p>
          </div>
          {!showComments
            ? ""
            : !comments
            ? ""
            : comments[1].data.children.map((child, index) => {
                return (
                  <Comments
                    comment={child}
                    key={index}
                    showComments={props.showComments}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};
