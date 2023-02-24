import './Comments.css'
import Time from '../../Utilities/TimeFormatting';

export const Comments =(props)=> {
    const created = props.comment.data.created_utc;
    const now = new Date();
    const secondsSinceEpoch = Math.round(now.getTime() / 1000);
    const sincePosted = Math.floor((secondsSinceEpoch - created) / 60);

    let posted = Time.postFormatting(sincePosted);
    let units = Time.unitFormatting(sincePosted);
    
    let upVotes;
    if((props.comment.data.ups - props.comment.data.downs) > 1000) {
         upVotes = ((props.comment.data.ups - props.comment.data.downs) / 1000).toFixed(1) + 'k';
    } else{
         upVotes = (props.comment.data.ups - props.comment.data.downs)
    }

    return(
        <div className="comments">
            <div className="comments-header">
            <p className="comment-author">{props.comment.data.author}</p>
            <p className="comment-posted">posted {posted} {units} ago</p>
            </div>
            <p className="comment-body">{props.comment.data.body}</p>
            <p className="comment-votes">{upVotes}</p>
        </div>
    )
}  